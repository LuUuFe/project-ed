from flask import Flask, jsonify
from flask_cors import CORS
from routes.carrinho_routes import carrinho_bp
from routes.historico_routes import historico_bp
from routes.desfazer_routes import desfazer_bp
from routes.finalizar_routes import finalizar_bp
from utils.logger import setup_logger

def create_app():
    app = Flask(__name__)
    CORS(app)
    setup_logger(app)

    app.register_blueprint(carrinho_bp, url_prefix='/api')
    app.register_blueprint(historico_bp, url_prefix='/api')
    app.register_blueprint(desfazer_bp, url_prefix='/api')
    app.register_blueprint(finalizar_bp, url_prefix='/api')

    @app.errorhandler(Exception)
    def handle_exception(e):
        app.logger.error(str(e))
        return jsonify({"erro": True, "mensagem": "Ocorreu um erro interno no servidor."}), 500

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)