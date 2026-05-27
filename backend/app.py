"""
Módulo Servidor Backend — Projeto 02: Carrinho de Compras
=========================================================

Este módulo implementa uma API RESTful utilizando a framework Flask. 
O seu propósito central é gerir as operações de um carrinho de compras, 
aplicando os conceitos de Estruturas de Dados exigidos na disciplina.

Em estrita obediência aos requisitos, a lógica de armazenamento e 
manipulação dos dados foi implementada nativamente através de uma classe 
orientada a objetos que simula o comportamento de um Array.
"""

from flask import Flask, jsonify, request
from flask_cors import CORS

# Instanciação da aplicação web e configuração de partilha de recursos (CORS)
app = Flask(__name__)
CORS(app)


class ArrayCarrinho:
    """
    Estrutura de Dados: Array (Encapsulamento)
    
    Esta classe gere os produtos inseridos no carrinho de compras.
    Utiliza uma lista nativa do Python como estrutura de base, operando
    de forma sequencial para inserções, buscas e remoções.
    """

    def __init__(self):
        """
        Inicializa a estrutura do Array e o controlador de identificadores únicos.
        """
        self.itens = []        # Array principal para armazenamento dos produtos
        self.proximo_id = 1    # Variável de controlo para gerar IDs incrementais

    def inserir(self, nome: str, preco: float, quantidade: int, estoque: int) -> dict:
        """
        Insere um novo produto no final do Array.
        Complexidade: O(1) amortizado.

        Parâmetros:
            nome (str): A designação do produto.
            preco (float): O valor unitário do produto.
            quantidade (int): A quantidade desejada pelo utilizador.
            estoque (int): A quantidade disponível em armazém.

        Retorno:
            dict: O dicionário representativo do produto recém-inserido.
        """
        produto = {
            "id": self.proximo_id,
            "nome": nome,
            "preco": preco,
            "quantidade": quantidade,
            "estoque": estoque
        }
        self.itens.append(produto)
        self.proximo_id += 1
        
        return produto

    def buscar_indice(self, produto_id: int) -> int:
        """
        Executa uma busca linear no Array para localizar o índice de um produto.
        Complexidade: O(n).

        Parâmetros:
            produto_id (int): O identificador único do produto a procurar.

        Retorno:
            int: O índice do produto no Array, ou -1 caso não seja encontrado.
        """
        for i, produto in enumerate(self.itens):
            if produto["id"] == produto_id:
                return i
        return -1

    def remover_por_id(self, produto_id: int) -> dict:
        """
        Remove um produto do Array com base no seu identificador.
        Complexidade: O(n).

        Parâmetros:
            produto_id (int): O identificador do produto a ser removido.

        Retorno:
            dict ou None: O produto removido, ou None se o produto não existir.
        """
        idx = self.buscar_indice(produto_id)
        if idx != -1:
            return self.itens.pop(idx) # Remoção por índice
        return None

    def calcular_total(self) -> float:
        """
        Percorre o Array de forma sequencial para calcular o valor total do carrinho.
        Complexidade: O(n).

        Retorno:
            float: O somatório do preço pela quantidade de todos os produtos, 
                   arredondado a duas casas decimais.
        """
        return round(sum(p["preco"] * p["quantidade"] for p in self.itens), 2)

    def obter_todos(self) -> list:
        """
        Retorna a estrutura completa com todos os produtos armazenados.
        """
        return self.itens
    
    def tamanho(self) -> int:
        """
        Retorna o número de elementos atualmente alocados no Array.
        """
        return len(self.itens)


# ------------------------------------------------------------------
# INSTANCIAÇÃO DA ESTRUTURA DE DADOS
# ------------------------------------------------------------------
# Criação do objeto global que representará o carrinho em memória
meu_carrinho = ArrayCarrinho()


# ------------------------------------------------------------------
# CONTROLADORES DA API (ROTAS)
# ------------------------------------------------------------------

@app.route("/api/carrinho", methods=["GET"])
def listar_carrinho():
    """
    Rota (GET): Retorna a totalidade dos itens presentes no Array, bem como
    o valor financeiro total acumulado e a quantidade de itens.
    """
    return jsonify({
        "produtos": meu_carrinho.obter_todos(),
        "total": meu_carrinho.calcular_total(),
        "quantidade_itens": meu_carrinho.tamanho()
    }), 200


@app.route("/api/carrinho", methods=["POST"])
def adicionar_produto():
    """
    Rota (POST): Interceta a requisição do frontend, valida a tipologia
    dos dados e invoca a inserção do produto na estrutura de Array.
    """
    dados = request.get_json(silent=True)

    # Validação da presença do corpo da requisição
    if not dados:
        return jsonify({"erro": "O corpo da requisição afigura-se inválido ou inexistente."}), 400

    nome = str(dados.get("nome", "")).strip()
    
    # Tratamento rigoroso de tipologia de dados
    try:
        preco = float(dados["preco"])
        quantidade = int(dados["quantidade"])
        estoque = int(dados["estoque"])
    except (KeyError, ValueError, TypeError):
        return jsonify({"erro": "Os parâmetros 'nome', 'preco', 'quantidade' e 'estoque' são mandatórios e devem deter os tipos adequados."}), 400

    # Validação de coerência lógica dos valores inseridos
    if not nome:
        return jsonify({"erro": "A designação do produto não pode encontrar-se vazia."}), 400
    if preco < 0 or quantidade < 1 or estoque < 0:
        return jsonify({"erro": "Foram introduzidos valores numéricos desprovidos de lógica de negócio."}), 400

    # Invocação do método de inserção encapsulado na classe
    produto_inserido = meu_carrinho.inserir(nome, preco, quantidade, estoque)

    return jsonify(produto_inserido), 201


@app.route("/api/carrinho/<int:produto_id>", methods=["DELETE"])
def remover_produto(produto_id):
    """
    Rota (DELETE): Recebe o identificador (ID) via parâmetro de URL e
    remove o produto correspondente do Array.
    """
    removido = meu_carrinho.remover_por_id(produto_id)
    
    if removido is None:
        return jsonify({"erro": "O produto requisitado não foi localizado na estrutura."}), 404

    return jsonify(removido), 200


if __name__ == "__main__":
    # Inicialização do servidor em modo de depuração para ambiente de desenvolvimento local
    app.run(debug=True, port=5000)