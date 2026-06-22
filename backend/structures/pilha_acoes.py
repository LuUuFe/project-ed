class PilhaAcoes:
    def __init__(self):
        self.acoes = []

    def empilhar(self, acao: dict):
        self.acoes.append(acao)

    def desempilhar(self) -> dict:
        if not self.esta_vazia():
            return self.acoes.pop()
        return None

    def esta_vazia(self) -> bool:
        return len(self.acoes) == 0

    def esvaziar(self):
        self.acoes = []