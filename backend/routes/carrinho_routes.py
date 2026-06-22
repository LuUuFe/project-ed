from flask import Blueprint, request, jsonify
from services.carrinho_service import CarrinhoService
from utils.responses import resposta_erro

carrinho_bp = Blueprint('carrinho', __name__)

@carrinho_bp.route('/carrinho', methods=['GET'])
@carrinho_bp.route('/carrinho/buscar', methods=['GET'])
def listar_carrinho():
    busca = request.args.get('busca', request.args.get('q', ''))
    ordenacao = request.args.get('ordenar', request.args.get('sort', 'cadastro'))
    modo_busca = request.args.get('modo', 'parcial')
    try:
        data = CarrinhoService.listar(busca, ordenacao, modo_busca)
        return jsonify(data), 200
    except ValueError as e:
        return resposta_erro(str(e), 400)

@carrinho_bp.route('/carrinho', methods=['POST'])
def adicionar_produto():
    dados = request.get_json(silent=True)
    try:
        produto = CarrinhoService.adicionar(dados)
        return jsonify(produto), 201
    except ValueError as e:
        return resposta_erro(str(e), 400)

@carrinho_bp.route('/carrinho/<int:produto_id>', methods=['DELETE'])
def remover_produto(produto_id):
    try:
        removido = CarrinhoService.remover(produto_id)
        if removido is None:
            return resposta_erro('Produto não localizado no carrinho.', 404)
        return jsonify(removido), 200
    except ValueError as e:
        return resposta_erro(str(e), 400)