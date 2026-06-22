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
import math
import unicodedata

app = Flask(__name__)
CORS(app)

OPCOES_ORDENACAO = {
    "cadastro": "Ordem de cadastro",
    "nome_az": "Nome A-Z",
    "nome_za": "Nome Z-A",
    "preco_asc": "Preço crescente",
    "preco_desc": "Preço decrescente",
}

ALIASES_ORDENACAO = {
    "": "cadastro",
    "nome": "nome_az",
    "preco": "preco_asc",
    "az": "nome_az",
    "za": "nome_za",
}


def normalizar_texto(valor) -> str:
    """Normaliza texto para busca case-insensitive e tolerante a acentos."""
    texto = str(valor or "").strip().casefold()
    return "".join(
        caractere
        for caractere in unicodedata.normalize("NFD", texto)
        if unicodedata.category(caractere) != "Mn"
    )


def calcular_total_produtos(produtos: list) -> float:
    return round(sum(p["preco"] * p["quantidade"] for p in produtos), 2)


def normalizar_ordenacao(valor) -> str:
    chave = str(valor or "").strip().lower()
    return ALIASES_ORDENACAO.get(chave, chave or "cadastro")


def resposta_erro(mensagem: str, status: int):
    return jsonify({"erro": mensagem}), status


def converter_preco(valor) -> float:
    if isinstance(valor, bool):
        raise ValueError
    preco = float(valor)
    if not math.isfinite(preco):
        raise ValueError
    return preco


def converter_inteiro(valor) -> int:
    if isinstance(valor, bool):
        raise ValueError
    numero = float(valor)
    if not math.isfinite(numero) or not numero.is_integer():
        raise ValueError
    return int(numero)

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
        else:
            self.proximo_id = max(self.proximo_id, id_existente + 1)
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

    def obter_copia(self) -> list:
        return [produto.copy() for produto in self.itens]

    def buscar_por_nome(self, termo: str = "", modo: str = "parcial") -> list:
        if modo not in {"parcial", "exato"}:
            raise ValueError("Modo de busca inválido. Use 'parcial' ou 'exato'.")

        termo_normalizado = normalizar_texto(termo)
        produtos = self.obter_copia()

        if not termo_normalizado:
            return produtos

        if modo == "exato":
            return [
                produto
                for produto in produtos
                if normalizar_texto(produto["nome"]) == termo_normalizado
            ]

        return [
            produto
            for produto in produtos
            if termo_normalizado in normalizar_texto(produto["nome"])
        ]

    def ordenar_produtos(self, produtos: list, ordenacao: str = "cadastro") -> list:
        ordenacao_normalizada = normalizar_ordenacao(ordenacao)

        if ordenacao_normalizada not in OPCOES_ORDENACAO:
            opcoes = ", ".join(OPCOES_ORDENACAO.keys())
            raise ValueError(f"Ordenação inválida. Use uma destas opções: {opcoes}.")

        if ordenacao_normalizada == "nome_az":
            return sorted(produtos, key=lambda p: normalizar_texto(p["nome"]))
        if ordenacao_normalizada == "nome_za":
            return sorted(produtos, key=lambda p: normalizar_texto(p["nome"]), reverse=True)
        if ordenacao_normalizada == "preco_asc":
            return sorted(produtos, key=lambda p: (p["preco"], normalizar_texto(p["nome"])))
        if ordenacao_normalizada == "preco_desc":
            return sorted(produtos, key=lambda p: (p["preco"], normalizar_texto(p["nome"])), reverse=True)

        return sorted(produtos, key=lambda p: p["id"])

    def consultar(self, busca: str = "", ordenacao: str = "cadastro", modo_busca: str = "parcial") -> list:
        encontrados = self.buscar_por_nome(busca, modo_busca)
        return self.ordenar_produtos(encontrados, ordenacao)

    def contar_baixo_estoque(self) -> int:
        return sum(1 for produto in self.itens if produto["estoque"] <= max(2, produto["quantidade"]))
    
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

    def tamanho(self) -> int:
        total = 0
        atual = self.cabeca
        while atual:
            total += 1
            atual = atual.proximo
        return total


# Instanciação Global das Estruturas
meu_carrinho = ArrayCarrinho()
historico_acoes = PilhaAcoes()
historico_compras = ListaEncadeada()

# ------------------------------------------------------------------
# CONTROLADORES DA API (ROTAS)
# ------------------------------------------------------------------

@app.route("/api/carrinho", methods=["GET"])
@app.route("/api/carrinho/buscar", methods=["GET"])
def listar_carrinho():
    busca = str(request.args.get("busca", request.args.get("q", ""))).strip()
    ordenacao = normalizar_ordenacao(request.args.get("ordenar", request.args.get("sort", "cadastro")))
    modo_busca = str(request.args.get("modo", "parcial")).strip().lower()

    try:
        produtos_resultado = meu_carrinho.consultar(busca, ordenacao, modo_busca)
    except ValueError as erro:
        return resposta_erro(str(erro), 400)

    mensagem = ""
    if busca and len(produtos_resultado) == 0:
        mensagem = "Nenhum produto foi encontrado para a busca informada."

    return jsonify({
        "produtos": produtos_resultado,
        "produtos_carrinho": meu_carrinho.obter_copia(),
        "total": meu_carrinho.calcular_total(),
        "total_resultado": calcular_total_produtos(produtos_resultado),
        "quantidade_itens": meu_carrinho.tamanho(),
        "quantidade_resultados": len(produtos_resultado),
        "baixo_estoque": meu_carrinho.contar_baixo_estoque(),
        "quantidade_compras": historico_compras.tamanho(),
        "filtros": {
            "busca": busca,
            "modo_busca": modo_busca,
            "ordenacao": ordenacao,
            "ordenacao_descricao": OPCOES_ORDENACAO[ordenacao]
        },
        "mensagem": mensagem
    }), 200

@app.route("/api/carrinho", methods=["POST"])
def adicionar_produto():
    dados = request.get_json(silent=True)
    if not isinstance(dados, dict):
        return resposta_erro("Envie os dados do produto em formato JSON válido.", 400)

    nome = str(dados.get("nome", "")).strip()
    try:
        preco = converter_preco(dados["preco"])
        quantidade = converter_inteiro(dados["quantidade"])
        estoque = converter_inteiro(dados["estoque"])
    except (KeyError, ValueError, TypeError):
        return resposta_erro("Informe preço, quantidade e estoque com valores numéricos válidos.", 400)

    if not nome:
        return resposta_erro("Informe um nome válido para o produto.", 400)
    if len(nome) > 80:
        return resposta_erro("O nome do produto deve ter no máximo 80 caracteres.", 400)
    if not math.isfinite(preco) or preco <= 0:
        return resposta_erro("Informe um preço maior que zero.", 400)
    if quantidade < 1:
        return resposta_erro("A quantidade deve ser pelo menos 1.", 400)
    if estoque < 0:
        return resposta_erro("O estoque não pode ser negativo.", 400)
    if quantidade > estoque:
        return resposta_erro("A quantidade desejada não pode ser maior que o estoque disponível.", 400)

    preco = round(preco, 2)
    produto_inserido = meu_carrinho.inserir(nome, preco, quantidade, estoque)
    
    # Empilhar a ação para permitir a sua posterior reversão
    historico_acoes.empilhar({"tipo": "adicionar", "produto": produto_inserido})

    return jsonify(produto_inserido), 201

@app.route("/api/carrinho/<int:produto_id>", methods=["DELETE"])
def remover_produto(produto_id):
    removido = meu_carrinho.remover_por_id(produto_id)
    if removido is None:
        return resposta_erro("Produto não localizado no carrinho.", 404)

    # Empilhar a ação de remoção
    historico_acoes.empilhar({"tipo": "remover", "produto": removido})
    return jsonify(removido), 200

@app.route("/api/desfazer", methods=["POST"])
def desfazer_acao():
    """Rota para reverter a última ação processada (Desempilhar)."""
    acao = historico_acoes.desempilhar()
    if not acao:
        return resposta_erro("Não existem ações anteriores para desfazer.", 400)

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
        return resposta_erro("A compra não pode ser finalizada com o carrinho vazio.", 400)

    sem_estoque = [
        produto
        for produto in meu_carrinho.obter_todos()
        if produto["quantidade"] > produto["estoque"]
    ]
    if sem_estoque:
        nomes = ", ".join(produto["nome"] for produto in sem_estoque)
        return resposta_erro(f"Estoque insuficiente para: {nomes}.", 409)

    total = meu_carrinho.calcular_total()
    itens_comprados = [item.copy() for item in meu_carrinho.obter_todos()]

    # Simulação da dedução de estoque registrada apenas no recibo.
    for item in itens_comprados:
        item["subtotal"] = round(item["preco"] * item["quantidade"], 2)
        item["estoque_inicial"] = item["estoque"]
        item["estoque"] = max(0, item["estoque"] - item["quantidade"])

    agora = datetime.datetime.now()
    recibo_compra = {
        "id_transacao": agora.strftime("%Y%m%d%H%M%S%f"),
        "data": agora.strftime("%d/%m/%Y %H:%M:%S"),
        "total": total,
        "quantidade_itens": len(itens_comprados),
        "quantidade_unidades": sum(item["quantidade"] for item in itens_comprados),
        "itens": itens_comprados
    }

    # Inserção no início da Lista Encadeada (ordem cronológica decrescente)
    historico_compras.inserir_no_inicio(recibo_compra)
    
    meu_carrinho.esvaziar()
    historico_acoes.esvaziar() # Purga a pilha, visto que a sessão de compras foi finalizada

    return jsonify({"mensagem": "Compra finalizada com sucesso.", "recibo": recibo_compra}), 200

@app.route("/api/historico", methods=["GET"])
def listar_historico():
    """Rota para consultar os registros presentes na Lista Encadeada."""
    return jsonify(historico_compras.obter_todos()), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)
