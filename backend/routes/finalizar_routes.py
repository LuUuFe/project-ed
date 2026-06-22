from flask import Blueprint, jsonify
from services.finalizar_service import FinalizarService
from utils.responses import resposta_erro

finalizar_bp = Blueprint('finalizar', __name__)

@finalizar_bp.route('/finalizar', methods=['POST'])
def finalizar_compra():
    try:
        recibo = FinalizarService.finalizar()
        return jsonify({"mensagem": "Compra finalizada com sucesso.", "recibo": recibo}), 200
    except ValueError as e:
        return resposta_erro(str(e), 400)