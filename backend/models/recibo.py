from dataclasses import dataclass, field
from typing import List

@dataclass
class Recibo:
    id_transacao: str
    data: str
    total: float
    quantidade_itens: int
    quantidade_unidades: int
    itens: List[dict]

    def to_dict(self) -> dict:
        return {
            "id_transacao": self.id_transacao,
            "data": self.data,
            "total": self.total,
            "quantidade_itens": self.quantidade_itens,
            "quantidade_unidades": self.quantidade_unidades,
            "itens": self.itens,
        }