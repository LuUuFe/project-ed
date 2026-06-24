from models.produto import Produto
from structures.tabela_hash import TabelaHash
from services.busca_service import normalizar_texto
from services.ordenacao_service import normalizar_ordenacao, OPCOES_ORDENACAO

class ArrayCarrinho:
    def __init__(self):
        self.itens = []
        self.proximo_id = 1
        self.hash_indice = TabelaHash()

    def inserir(self, nome: str, preco: float, quantidade: int, estoque: int, id_existente: int = None) -> Produto:
        if id_existente:
            produto = Produto(id=id_existente, nome=nome, preco=preco,
                              quantidade=quantidade, estoque=estoque)
            self.itens.append(produto)
            self.proximo_id = max(self.proximo_id, id_existente + 1)
        else:
            produto = Produto(id=self.proximo_id, nome=nome, preco=preco,
                              quantidade=quantidade, estoque=estoque)
            self.itens.append(produto)
            self.proximo_id += 1
        self.itens.sort(key=lambda p: p.id)
        self.hash_indice.inserir(produto.id, produto)
        return produto

    def buscar_por_id(self, produto_id: int) -> Produto | None:
        return self.hash_indice.buscar(produto_id)

    def remover_por_id(self, produto_id: int) -> Produto | None:
        produto = self.buscar_por_id(produto_id)
        if produto is None:
            return None
        for i, p in enumerate(self.itens):
            if p.id == produto_id:
                del self.itens[i]
                break
        self.hash_indice.remover(produto_id)
        return produto

    def calcular_total(self) -> float:
        return round(sum(p.preco * p.quantidade for p in self.itens), 2)

    def obter_todos(self) -> list[Produto]:
        return self.itens

    def obter_copia(self) -> list[dict]:
        return [p.to_dict() for p in self.itens]

    def buscar_por_nome(self, termo: str = "", modo: str = "parcial") -> list[Produto]:
        if modo not in {"parcial", "exato"}:
            raise ValueError("Modo de busca inválido. Use 'parcial' ou 'exato'.")
        termo_normalizado = normalizar_texto(termo)
        if not termo_normalizado:
            return self.itens[:]
        if modo == "exato":
            return [p for p in self.itens if normalizar_texto(p.nome) == termo_normalizado]
        return [p for p in self.itens if termo_normalizado in normalizar_texto(p.nome)]

    def ordenar_produtos(self, produtos: list[Produto], ordenacao: str = "cadastro") -> list[Produto]:
        ordenacao_normalizada = normalizar_ordenacao(ordenacao)
        if ordenacao_normalizada not in OPCOES_ORDENACAO:
            raise ValueError(f"Ordenação inválida. Opções: {', '.join(OPCOES_ORDENACAO.keys())}")
        if ordenacao_normalizada == "nome_az":
            return sorted(produtos, key=lambda p: normalizar_texto(p.nome))
        if ordenacao_normalizada == "nome_za":
            return sorted(produtos, key=lambda p: normalizar_texto(p.nome), reverse=True)
        if ordenacao_normalizada == "preco_asc":
            return sorted(produtos, key=lambda p: (p.preco, normalizar_texto(p.nome)))
        if ordenacao_normalizada == "preco_desc":
            return sorted(produtos, key=lambda p: (p.preco, normalizar_texto(p.nome)), reverse=True)
        return sorted(produtos, key=lambda p: p.id)

    def consultar(self, busca: str = "", ordenacao: str = "cadastro", modo_busca: str = "parcial") -> list[dict]:
        encontrados = self.buscar_por_nome(busca, modo_busca)
        ordenados = self.ordenar_produtos(encontrados, ordenacao)
        return [p.to_dict() for p in ordenados]

    def contar_baixo_estoque(self) -> int:
        return sum(1 for p in self.itens if p.estoque <= max(2, p.quantidade))

    def tamanho(self) -> int:
        return len(self.itens)

    def esvaziar(self):
        self.itens = []
        self.hash_indice = TabelaHash()

    def obter_hash_buckets(self) -> list[list[dict]]:
        """Retorna os buckets da hash com produtos serializados."""
        buckets = self.hash_indice.obter_buckets()
        return [[p.to_dict() for p in bucket] for bucket in buckets]