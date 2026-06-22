const opcoesOrdenacao = [
  { valor: 'cadastro', rotulo: 'Cadastro' },
  { valor: 'nome_az', rotulo: 'Nome A-Z' },
  { valor: 'nome_za', rotulo: 'Nome Z-A' },
  { valor: 'preco_asc', rotulo: 'Preço ↑' },
  { valor: 'preco_desc', rotulo: 'Preço ↓' },
]

export default function FiltrosCarrinho({
  filtros,
  onFiltroChange,
  onLimpar,
  quantidadeResultados,
  quantidadeItens,
  carregando,
}) {
  const buscaAtiva = filtros.busca.trim() !== ''
  const ordenacaoAtiva = filtros.ordenacao !== 'cadastro'
  const filtrosAtivos = buscaAtiva || ordenacaoAtiva
  const ordenacaoAtual = opcoesOrdenacao.find(opcao => opcao.valor === filtros.ordenacao)

  return (
    <section className="rounded-lg border border-border bg-surface p-5 shadow-soft animate-fadeUp">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-[11px] font-bold uppercase tracking-[2px] text-zinc-500">
            Buscar e Ordenar
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            {carregando
              ? 'Atualizando resultados...'
              : `${quantidadeResultados} de ${quantidadeItens} produto(s) exibido(s)`}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {ordenacaoAtiva && (
            <span className="rounded-lg border border-accent/40 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
              {ordenacaoAtual?.rotulo}
            </span>
          )}
          {buscaAtiva && (
            <span className="rounded-lg border border-border bg-[#222228] px-2.5 py-1 text-xs text-zinc-300">
              Busca ativa
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_170px_auto]">
        <div>
          <label htmlFor="busca-produto" className="mb-1 block text-xs font-medium text-zinc-400">
            Produto
          </label>
          <input
            id="busca-produto"
            type="search"
            value={filtros.busca}
            onChange={e => onFiltroChange('busca', e.target.value)}
            placeholder="Buscar por nome"
            className="w-full rounded-lg border border-border bg-[#222228] px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div>
          <label htmlFor="ordenacao-produto" className="mb-1 block text-xs font-medium text-zinc-400">
            Ordenação
          </label>
          <select
            id="ordenacao-produto"
            value={filtros.ordenacao}
            onChange={e => onFiltroChange('ordenacao', e.target.value)}
            className="w-full rounded-lg border border-border bg-[#222228] px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
          >
            {opcoesOrdenacao.map(opcao => (
              <option key={opcao.valor} value={opcao.valor}>
                {opcao.rotulo}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={onLimpar}
            disabled={!filtrosAtivos}
            className="h-[42px] w-full rounded-lg border border-border px-3 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            Limpar
          </button>
        </div>
      </div>
    </section>
  )
}
