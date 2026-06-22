function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}

function Indicador({ rotulo, valor, detalhe, destaque }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-soft">
      <p className="text-xs font-medium text-zinc-500">{rotulo}</p>
      <p className={`mt-2 font-display text-2xl font-extrabold ${destaque ? 'text-accent' : 'text-white'}`}>
        {valor}
      </p>
      {detalhe && <p className="mt-1 text-xs text-zinc-500">{detalhe}</p>}
    </div>
  )
}

export default function ResumoCarrinho({
  quantidadeItens,
  total,
  quantidadeResultados,
  quantidadeHistorico,
  baixoEstoque,
  filtrosAtivos,
}) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 animate-fadeUp">
      <Indicador
        rotulo="Produtos no carrinho"
        valor={quantidadeItens}
        detalhe={baixoEstoque > 0 ? `${baixoEstoque} com estoque baixo` : 'Estoque em ordem'}
      />
      <Indicador
        rotulo="Total da compra"
        valor={formatarMoeda(total)}
        detalhe="Pronto para finalizar"
        destaque
      />
      <Indicador
        rotulo="Resultados exibidos"
        valor={quantidadeResultados}
        detalhe={filtrosAtivos ? 'Filtro aplicado' : 'Sem filtros ativos'}
      />
      <Indicador
        rotulo="Compras no histórico"
        valor={quantidadeHistorico}
        detalhe="Lista encadeada"
      />
    </section>
  )
}
