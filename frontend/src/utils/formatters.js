export function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}

export function statusEstoque(produto) {
  if (produto.estoque <= produto.quantidade) {
    return { rotulo: 'Estoque crítico', classe: 'danger' }
  }
  if (produto.estoque <= Math.max(2, produto.quantidade + 1)) {
    return { rotulo: 'Pouco estoque', classe: 'warning' }
  }
  return null
}