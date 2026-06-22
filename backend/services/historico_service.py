from config.extensions import historico_compras

class HistoricoService:
    @staticmethod
    def listar():
        return historico_compras.obter_todos()