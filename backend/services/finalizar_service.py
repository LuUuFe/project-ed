import datetime
from config.extensions import meu_carrinho, historico_acoes, historico_compras

class FinalizarService:
    @staticmethod
    def finalizar():
        if meu_carrinho.tamanho() == 0:
            raise ValueError("A compra não pode ser finalizada com o carrinho vazio.")

        # verifica estoque
        sem_estoque = [
            p for p in meu_carrinho.obter_todos()
            if p.quantidade > p.estoque
        ]
        if sem_estoque:
            nomes = ", ".join(p.nome for p in sem_estoque)
            raise ValueError(f"Estoque insuficiente para: {nomes}.")

        total = meu_carrinho.calcular_total()
        itens_comprados = [p.to_dict() for p in meu_carrinho.obter_todos()]
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

        historico_compras.inserir_no_inicio(recibo_compra)
        meu_carrinho.esvaziar()
        historico_acoes.esvaziar()
        return recibo_compra