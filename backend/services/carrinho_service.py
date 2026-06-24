import math
from config.extensions import meu_carrinho, historico_acoes
from utils.validators import validar_produto, converter_preco, converter_inteiro
from services.ordenacao_service import normalizar_ordenacao, OPCOES_ORDENACAO

class CarrinhoService:
    @staticmethod
    def listar(busca='', ordenacao='cadastro', modo_busca='parcial'):
        busca = str(busca or "").strip()
        ordenacao = normalizar_ordenacao(ordenacao)
        modo_busca = str(modo_busca or "parcial").strip().lower()

        produtos_resultado = meu_carrinho.consultar(busca, ordenacao, modo_busca)
        total = meu_carrinho.calcular_total()
        total_resultado = round(sum(p["preco"] * p["quantidade"] for p in produtos_resultado), 2)

        mensagem = ""
        if busca and len(produtos_resultado) == 0:
            mensagem = "Nenhum produto foi encontrado para a busca informada."

        return {
            "produtos": produtos_resultado,
            "produtos_carrinho": meu_carrinho.obter_copia(),
            "hash_buckets": meu_carrinho.obter_hash_buckets(),
            "pilha_tamanho": historico_acoes.tamanho(),
            "total": total,
            "total_resultado": total_resultado,
            "quantidade_itens": meu_carrinho.tamanho(),
            "quantidade_resultados": len(produtos_resultado),
            "baixo_estoque": meu_carrinho.contar_baixo_estoque(),
            "quantidade_compras": 0,
            "filtros": {
                "busca": busca,
                "modo_busca": modo_busca,
                "ordenacao": ordenacao,
                "ordenacao_descricao": OPCOES_ORDENACAO.get(ordenacao, "")
            },
            "mensagem": mensagem
        }

    @staticmethod
    def adicionar(dados):
        if not isinstance(dados, dict):
            raise ValueError("Envie os dados do produto em formato JSON válido.")
        nome = str(dados.get("nome", "")).strip()
        try:
            preco = converter_preco(dados["preco"])
            quantidade = converter_inteiro(dados["quantidade"])
            estoque = converter_inteiro(dados["estoque"])
        except (KeyError, ValueError, TypeError):
            raise ValueError("Informe preço, quantidade e estoque com valores numéricos válidos.")
        erro = validar_produto(nome, preco, quantidade, estoque)
        if erro:
            raise ValueError(erro)
        preco = round(preco, 2)
        produto_inserido = meu_carrinho.inserir(nome, preco, quantidade, estoque)
        historico_acoes.empilhar({"tipo": "adicionar", "produto": produto_inserido.to_dict()})
        return produto_inserido.to_dict()

    @staticmethod
    def remover(produto_id):
        removido = meu_carrinho.remover_por_id(produto_id)
        if removido is not None:
            historico_acoes.empilhar({"tipo": "remover", "produto": removido.to_dict()})
        return removido.to_dict() if removido else None