from flask import Blueprint, jsonify
from services.desfazer_service import DesfazerService
from utils.responses import resposta_erro

desfazer_bp = Blueprint('desfazer', __name__)

@desfazer_bp.route('/desfazer', methods=['POST'])
def desfazer_acao():
    try:
        DesfazerService.desfazer()
        return jsonify({"mensagem": "Ação devidamente desfeita."}), 200
    except ValueError as e:
        return resposta_erro(str(e), 400)