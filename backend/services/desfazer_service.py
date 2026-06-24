from config.extensions import historico_acoes, meu_carrinho

class DesfazerService:
    @staticmethod
    def desfazer():
        acao = historico_acoes.desempilhar()
        if not acao:
            raise ValueError("Não existem ações anteriores para desfazer.")
        if acao["tipo"] == "adicionar":
            # remove do carrinho
            produto_id = acao["produto"]["id"]
            meu_carrinho.remover_por_id(produto_id)
        elif acao["tipo"] == "remover":
            p = acao["produto"]
            meu_carrinho.inserir(p["nome"], p["preco"], p["quantidade"],
                                 p["estoque"], id_existente=p["id"])
        return True