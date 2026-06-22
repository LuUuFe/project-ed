from flask import jsonify

def resposta_erro(mensagem: str, status: int):
    return jsonify({"erro": True, "mensagem": mensagem}), status