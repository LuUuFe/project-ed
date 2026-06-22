import math
from services.busca_service import normalizar_texto
from services.ordenacao_service import normalizar_ordenacao, OPCOES_ORDENACAO, ALIASES_ORDENACAO

class ArrayCarrinho:
    def __init__(self):
        self.itens = []
        self.proximo_id = 1

    def inserir(self, nome: str, preco: float, quantidade: int, estoque: int, id_existente: int = None) -> dict:
        produto = {
            "id": id_existente if id_existente else self.proximo_id,
            "nome": nome,
            "preco": preco,
            "quantidade": quantidade,
            "estoque": estoque
        }
        self.itens.append(produto)
        if not id_existente:
            self.proximo_id += 1
        else:
            self.proximo_id = max(self.proximo_id, id_existente + 1)
        self.itens.sort(key=lambda x: x["id"])
        return produto

    def buscar_indice(self, produto_id: int) -> int:
        for i, produto in enumerate(self.itens):
            if produto["id"] == produto_id:
                return i
        return -1

    def remover_por_id(self, produto_id: int) -> dict:
        idx = self.buscar_indice(produto_id)
        if idx != -1:
            return self.itens.pop(idx)
        return None

    def calcular_total(self) -> float:
        return round(sum(p["preco"] * p["quantidade"] for p in self.itens), 2)

    def obter_todos(self) -> list:
        return self.itens

    def obter_copia(self) -> list:
        return [produto.copy() for produto in self.itens]

    def buscar_por_nome(self, termo: str = "", modo: str = "parcial") -> list:
        if modo not in {"parcial", "exato"}:
            raise ValueError("Modo de busca inválido. Use 'parcial' ou 'exato'.")

        termo_normalizado = normalizar_texto(termo)
        produtos = self.obter_copia()

        if not termo_normalizado:
            return produtos

        if modo == "exato":
            return [
                produto
                for produto in produtos
                if normalizar_texto(produto["nome"]) == termo_normalizado
            ]

        return [
            produto
            for produto in produtos
            if termo_normalizado in normalizar_texto(produto["nome"])
        ]

    def ordenar_produtos(self, produtos: list, ordenacao: str = "cadastro") -> list:
        ordenacao_normalizada = normalizar_ordenacao(ordenacao)

        if ordenacao_normalizada not in OPCOES_ORDENACAO:
            opcoes = ", ".join(OPCOES_ORDENACAO.keys())
            raise ValueError(f"Ordenação inválida. Use uma destas opções: {opcoes}.")

        if ordenacao_normalizada == "nome_az":
            return sorted(produtos, key=lambda p: normalizar_texto(p["nome"]))
        if ordenacao_normalizada == "nome_za":
            return sorted(produtos, key=lambda p: normalizar_texto(p["nome"]), reverse=True)
        if ordenacao_normalizada == "preco_asc":
            return sorted(produtos, key=lambda p: (p["preco"], normalizar_texto(p["nome"])))
        if ordenacao_normalizada == "preco_desc":
            return sorted(produtos, key=lambda p: (p["preco"], normalizar_texto(p["nome"])), reverse=True)

        return sorted(produtos, key=lambda p: p["id"])

    def consultar(self, busca: str = "", ordenacao: str = "cadastro", modo_busca: str = "parcial") -> list:
        encontrados = self.buscar_por_nome(busca, modo_busca)
        return self.ordenar_produtos(encontrados, ordenacao)

    def contar_baixo_estoque(self) -> int:
        return sum(1 for produto in self.itens if produto["estoque"] <= max(2, produto["quantidade"]))

    def tamanho(self) -> int:
        return len(self.itens)

    def esvaziar(self):
        self.itens = []