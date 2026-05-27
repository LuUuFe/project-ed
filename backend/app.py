from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite comunicação com o React no localhost:5173

# ============================================================
# ESTRUTURA DE DADOS: ARRAY
#
# O carrinho é implementado como um array (lista Python).
# Cada elemento é um dicionário representando um produto.
#
# Operações implementadas:
#   - Inserção no final: O(1) amortizado  → append()
#   - Busca por ID:      O(n)             → iteração linear
#   - Remoção por índice: O(n)            → pop(i)
# ============================================================

carrinho = []       # <-- Array principal (estrutura de dados)
_proximo_id = 1     # Controle de IDs únicos


def _novo_id():
    global _proximo_id
    id_atual = _proximo_id
    _proximo_id += 1
    return id_atual


def _buscar_indice(produto_id: int):
    """Busca linear no array — O(n)"""
    for i, produto in enumerate(carrinho):
        if produto["id"] == produto_id:
            return i
    return -1


def _calcular_total():
    """Percorre o array somando subtotais — O(n)"""
    return round(sum(p["preco"] * p["quantidade"] for p in carrinho), 2)


# ------------------------------------------------------------------
# ROTAS
# ------------------------------------------------------------------

@app.get("/api/carrinho")
def listar_carrinho():
    """Retorna o array completo + total"""
    return jsonify({
        "produtos": carrinho,
        "total": _calcular_total(),
        "quantidade_itens": len(carrinho)
    })


@app.post("/api/carrinho")
def adicionar_produto():
    """Insere um novo produto no array (append)"""
    dados = request.get_json(silent=True)

    if not dados:
        return jsonify({"erro": "Corpo da requisição inválido"}), 400

    nome = str(dados.get("nome", "")).strip()
    try:
        preco = float(dados["preco"])
        quantidade = int(dados["quantidade"])
        estoque = int(dados["estoque"])
    except (KeyError, ValueError, TypeError):
        return jsonify({"erro": "Campos obrigatórios: nome, preco, quantidade, estoque"}), 400

    if not nome:
        return jsonify({"erro": "Nome não pode ser vazio"}), 400
    if preco < 0 or quantidade < 1 or estoque < 0:
        return jsonify({"erro": "Valores inválidos"}), 400

    # INSERÇÃO no array — O(1) amortizado
    produto = {
        "id": _novo_id(),
        "nome": nome,
        "preco": preco,
        "quantidade": quantidade,
        "estoque": estoque,
    }
    carrinho.append(produto)

    return jsonify(produto), 201


@app.delete("/api/carrinho/<int:produto_id>")
def remover_produto(produto_id):
    """Remove produto do array pelo ID — O(n)"""
    idx = _buscar_indice(produto_id)
    if idx == -1:
        return jsonify({"erro": "Produto não encontrado"}), 404

    removido = carrinho.pop(idx)   # Remoção por índice
    return jsonify(removido)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
