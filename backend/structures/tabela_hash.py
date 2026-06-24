from typing import Optional, Any
from structures.no import No

class TabelaHash:
    def __init__(self, tamanho: int = 10):
        self.tamanho = tamanho
        self.buckets = [None] * tamanho

    def _hash(self, chave: int) -> int:
        return hash(chave) % self.tamanho

    def inserir(self, chave: int, valor: Any) -> None:
        indice = self._hash(chave)
        novo_no = No((chave, valor))
        if self.buckets[indice] is None:
            self.buckets[indice] = novo_no
        else:
            atual = self.buckets[indice]
            while atual.proximo:
                if atual.dado[0] == chave:
                    atual.dado = (chave, valor)  # atualiza
                    return
                atual = atual.proximo
            if atual.dado[0] == chave:
                atual.dado = (chave, valor)
            else:
                atual.proximo = novo_no

    def buscar(self, chave: int) -> Optional[Any]:
        indice = self._hash(chave)
        atual = self.buckets[indice]
        while atual:
            if atual.dado[0] == chave:
                return atual.dado[1]
            atual = atual.proximo
        return None

    def remover(self, chave: int) -> bool:
        indice = self._hash(chave)
        atual = self.buckets[indice]
        anterior = None
        while atual:
            if atual.dado[0] == chave:
                if anterior:
                    anterior.proximo = atual.proximo
                else:
                    self.buckets[indice] = atual.proximo
                return True
            anterior = atual
            atual = atual.proximo
        return False

    def listar_todos(self) -> list:
        resultados = []
        for bucket in self.buckets:
            atual = bucket
            while atual:
                resultados.append(atual.dado[1])
                atual = atual.proximo
        return resultados