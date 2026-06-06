"""
Módulo Servidor Backend — Projeto 02: Carrinho de Compras
=========================================================

Este módulo implementa uma API RESTful utilizando a framework Flask. 
O seu propósito central é gerir as operações de um carrinho de compras, 
aplicando os conceitos de Estruturas de Dados exigidos na disciplina.
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

# ------------------------------------------------------------------
# ESTRUTURA 1: ARRAY (CARRINHO)
# ------------------------------------------------------------------
class ArrayCarrinho:
    def __init__(self):
        self.itens = []
        self.proximo_id = 1

    def inserir(self, nome: str, preco: float, quantidade: int, estoque: int, id_existente: int = None) -> dict:
        produto = {
            "id": id_existente if id_existente else self.proximo_id,
            "nome": nome,
            "preco": preco,
            "quantidade": quantidade,
            "estoque": estoque
        }
        self.itens.append(produto)
        if not id_existente:
            self.proximo_id += 1
        # Ordenação básica para manter consistência ao desfazer remoções
        self.itens.sort(key=lambda x: x["id"])
        return produto

    def buscar_indice(self, produto_id: int) -> int:
        for i, produto in enumerate(self.itens):
            if produto["id"] == produto_id:
                return i
        return -1

    def remover_por_id(self, produto_id: int) -> dict:
        idx = self.buscar_indice(produto_id)
        if idx != -1:
            return self.itens.pop(idx)
        return None

    def calcular_total(self) -> float:
        return round(sum(p["preco"] * p["quantidade"] for p in self.itens), 2)

    def obter_todos(self) -> list:
        return self.itens
    
    def tamanho(self) -> int:
        return len(self.itens)

    def esvaziar(self):
        self.itens = []

# ------------------------------------------------------------------
# ESTRUTURA 2: PILHA (DESFAZER AÇÕES)
# ------------------------------------------------------------------
class PilhaAcoes:
    def __init__(self):
        self.acoes = []

    def empilhar(self, acao: dict):
        self.acoes.append(acao)

    def desempilhar(self) -> dict:
        if not self.esta_vazia():
            return self.acoes.pop()
        return None

    def esta_vazia(self) -> bool:
        return len(self.acoes) == 0

    def esvaziar(self):
        self.acoes = []

# ------------------------------------------------------------------
# ESTRUTURA 3: LISTA ENCADEADA (HISTÓRICO DE COMPRAS)
# ------------------------------------------------------------------
class No:
    def __init__(self, dado):
        self.dado = dado
        self.proximo = None

class ListaEncadeada:
    def __init__(self):
        self.cabeca = None

    def inserir_no_inicio(self, dado):
        novo_no = No(dado)
        novo_no.proximo = self.cabeca
        self.cabeca = novo_no

    def obter_todos(self) -> list:
        elementos = []
        atual = self.cabeca
        while atual:
            elementos.append(atual.dado)
            atual = atual.proximo
        return elementos


# Instanciação Global das Estruturas
meu_carrinho = ArrayCarrinho()
historico_acoes = PilhaAcoes()
historico_compras = ListaEncadeada()

# ------------------------------------------------------------------
# CONTROLADORES DA API (ROTAS)
# ------------------------------------------------------------------

@app.route("/api/carrinho", methods=["GET"])
def listar_carrinho():
    return jsonify({
        "produtos": meu_carrinho.obter_todos(),
        "total": meu_carrinho.calcular_total(),
        "quantidade_itens": meu_carrinho.tamanho()
    }), 200

@app.route("/api/carrinho", methods=["POST"])
def adicionar_produto():
    dados = request.get_json(silent=True)
    if not dados:
        return jsonify({"erro": "Corpo da requisição inválido."}), 400

    nome = str(dados.get("nome", "")).strip()
    try:
        preco = float(dados["preco"])
        quantidade = int(dados["quantidade"])
        estoque = int(dados["estoque"])
    except (KeyError, ValueError, TypeError):
        return jsonify({"erro": "Parâmetros numéricos com tipologia inadequada."}), 400

    if not nome or preco < 0 or quantidade < 1 or estoque < 0:
        return jsonify({"erro": "Dados inseridos carecem de coerência mercadológica."}), 400

    produto_inserido = meu_carrinho.inserir(nome, preco, quantidade, estoque)
    
    # Empilhar a ação para permitir a sua posterior reversão
    historico_acoes.empilhar({"tipo": "adicionar", "produto": produto_inserido})

    return jsonify(produto_inserido), 201

@app.route("/api/carrinho/<int:produto_id>", methods=["DELETE"])
def remover_produto(produto_id):
    removido = meu_carrinho.remover_por_id(produto_id)
    if removido is None:
        return jsonify({"erro": "Produto não localizado."}), 404

    # Empilhar a ação de remoção
    historico_acoes.empilhar({"tipo": "remover", "produto": removido})
    return jsonify(removido), 200

@app.route("/api/desfazer", methods=["POST"])
def desfazer_acao():
    """Rota para reverter a última ação processada (Desempilhar)."""
    acao = historico_acoes.desempilhar()
    if not acao:
        return jsonify({"erro": "Não existem ações precedentes a serem desfeitas."}), 400

    if acao["tipo"] == "adicionar":
        # Desfazer adição significa remover o item
        meu_carrinho.remover_por_id(acao["produto"]["id"])
    elif acao["tipo"] == "remover":
        # Desfazer remoção significa inserir o item novamente
        p = acao["produto"]
        meu_carrinho.inserir(p["nome"], p["preco"], p["quantidade"], p["estoque"], id_existente=p["id"])

    return jsonify({"mensagem": "Ação devidamente desfeita."}), 200

@app.route("/api/finalizar", methods=["POST"])
def finalizar_compra():
    """Rota para efetivar a transação, atualizar estoque e registrar no histórico."""
    if meu_carrinho.tamanho() == 0:
        return jsonify({"erro": "A transação não pode ser concluída com o carrinho vazio."}), 400

    total = meu_carrinho.calcular_total()
    itens_comprados = meu_carrinho.obter_todos().copy()

    # Simulação da dedução de estoque para o histórico
    for item in itens_comprados:
        item["estoque"] = max(0, item["estoque"] - item["quantidade"])

    recibo_compra = {
        "id_transacao": datetime.datetime.now().strftime("%Y%m%d%H%M%S"),
        "data": datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
        "total": total,
        "quantidade_itens": len(itens_comprados),
        "itens": itens_comprados
    }

    # Inserção no início da Lista Encadeada (ordem cronológica decrescente)
    historico_compras.inserir_no_inicio(recibo_compra)
    
    meu_carrinho.esvaziar()
    historico_acoes.esvaziar() # Purga a pilha, visto que a sessão de compras foi finalizada

    return jsonify({"mensagem": "Transação finalizada com êxito.", "recibo": recibo_compra}), 200

@app.route("/api/historico", methods=["GET"])
def listar_historico():
    """Rota para consultar os registros presentes na Lista Encadeada."""
    return jsonify(historico_compras.obter_todos()), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)