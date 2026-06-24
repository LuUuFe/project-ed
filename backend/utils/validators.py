import math

def converter_preco(valor) -> float:
    if isinstance(valor, bool):
        raise ValueError
    preco = float(valor)
    if not math.isfinite(preco):
        raise ValueError
    return preco

def converter_inteiro(valor) -> int:
    if isinstance(valor, bool):
        raise ValueError
    numero = float(valor)
    if not math.isfinite(numero) or not numero.is_integer():
        raise ValueError
    return int(numero)

def validar_produto(nome, preco, quantidade, estoque):
    if not nome:
        return "Informe um nome válido para o produto."
    if len(nome) > 80:
        return "O nome do produto deve ter no máximo 80 caracteres."
    try:
        preco = converter_preco(preco)
        quantidade = converter_inteiro(quantidade)
        estoque = converter_inteiro(estoque)
    except (ValueError, TypeError):
        return "Informe preço, quantidade e estoque com valores numéricos válidos."

    if not math.isfinite(preco) or preco <= 0:
        return "Informe um preço maior que zero."
    if quantidade < 1:
        return "A quantidade deve ser pelo menos 1."
    if estoque < 0:
        return "O estoque não pode ser negativo."
    if quantidade > estoque:
        return "A quantidade desejada não pode ser maior que o estoque disponível."

    return None