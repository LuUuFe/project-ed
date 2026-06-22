from structures.no import No

class ListaEncadeada:
    def __init__(self):
        self.cabeca = None

    def inserir_no_inicio(self, dado):
        novo_no = No(dado)
        novo_no.proximo = self.cabeca
        self.cabeca = novo_no

    def obter_todos(self) -> list:
        elementos = []
        atual = self.cabeca
        while atual:
            elementos.append(atual.dado)
            atual = atual.proximo
        return elementos

    def tamanho(self) -> int:
        total = 0
        atual = self.cabeca
        while atual:
            total += 1
            atual = atual.proximo
        return total