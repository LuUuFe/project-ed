from dataclasses import dataclass

@dataclass
class Produto:
    id: int
    nome: str
    preco: float
    quantidade: int
    estoque: int

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "nome": self.nome,
            "preco": self.preco,
            "quantidade": self.quantidade,
            "estoque": self.estoque,
        }