OPCOES_ORDENACAO = {
    "cadastro": "Ordem de cadastro",
    "nome_az": "Nome A-Z",
    "nome_za": "Nome Z-A",
    "preco_asc": "Preço crescente",
    "preco_desc": "Preço decrescente",
}

ALIASES_ORDENACAO = {
    "": "cadastro",
    "nome": "nome_az",
    "preco": "preco_asc",
    "az": "nome_az",
    "za": "nome_za",
}

def normalizar_ordenacao(valor) -> str:
    chave = str(valor or "").strip().lower()
    return ALIASES_ORDENACAO.get(chave, chave or "cadastro")