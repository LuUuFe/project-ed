from flask import Blueprint, jsonify
from services.historico_service import HistoricoService

historico_bp = Blueprint('historico', __name__)

@historico_bp.route('/historico', methods=['GET'])
def listar_historico():
    return jsonify(HistoricoService.listar()), 200