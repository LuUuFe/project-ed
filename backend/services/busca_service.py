import unicodedata

def normalizar_texto(valor) -> str:
    texto = str(valor or "").strip().casefold()
    return "".join(
        caractere
        for caractere in unicodedata.normalize("NFD", texto)
        if unicodedata.category(caractere) != "Mn"
    )