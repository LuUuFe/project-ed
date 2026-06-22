function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}

function statusEstoque(produto) {
  if (produto.estoque <= produto.quantidade) {
    return { rotulo: 'Estoque crítico', classe: 'border-danger/30 bg-danger/10 text-orange-100' }
  }
  if (produto.estoque <= Math.max(2, produto.quantidade + 1)) {
    return { rotulo: 'Pouco estoque', classe: 'border-accent/30 bg-accent/10 text-accent' }
  }
  return null
}

function EstadoVazio({ titulo, descricao, acao, onLimparFiltros, onDesfazer }) {
  return (
    <div className="rounded-lg border border-border bg-bg/45 px-4 py-10 text-center">
      <p className="font-display text-lg font-bold text-white">{titulo}</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500">{descricao}</p>
      <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
        {acao === 'limpar' && (
          <button
            type="button"
            onClick={onLimparFiltros}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            Limpar filtros
          </button>
        )}
        <button
          type="button"
          onClick={onDesfazer}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
        >
          Desfazer ação
        </button>
      </div>
    </div>
  )
}

export default function ListaCarrinho({
  produtos,
  total,
  totalResultado,
  quantidadeItens,
  filtrosAtivos,
  busca,
  carregando,
  onLimparFiltros,
  onRemover,
  onDesfazer,
  onFinalizar,
}) {
  const carrinhoVazio = quantidadeItens === 0
  const semResultados = !carrinhoVazio && filtrosAtivos && produtos.length === 0
  const totalExibido = filtrosAtivos ? totalResultado : total

  return (
    <section className="rounded-lg border border-border bg-surface p-5 shadow-soft animate-fadeUp">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-[11px] font-bold uppercase tracking-[2px] text-zinc-500">
            Produtos no Carrinho
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            {carregando ? 'Carregando...' : `${produtos.length} produto(s) nesta visualização`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-lg border border-border bg-[#222228] px-2.5 py-1 text-xs text-zinc-400">
            Pilha ativa
          </span>
          <button
            type="button"
            onClick={onDesfazer}
            className="rounded-lg border border-border px-3 py-1 text-xs text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            Desfazer
          </button>
        </div>
      </div>

      {carrinhoVazio && (
        <EstadoVazio
          titulo="Carrinho vazio"
          descricao="Nenhum item cadastrado nesta compra ainda."
          onDesfazer={onDesfazer}
        />
      )}

      {semResultados && (
        <EstadoVazio
          titulo="Nenhum produto encontrado"
          descricao={busca.trim() ? `Não há produtos com “${busca.trim()}” nesta compra.` : 'Nenhum item combina com os filtros atuais.'}
          acao="limpar"
          onLimparFiltros={onLimparFiltros}
          onDesfazer={onDesfazer}
        />
      )}

      {!carrinhoVazio && !semResultados && (
        <>
          <div className="divide-y divide-border">
            {produtos.map((p, i) => {
              const status = statusEstoque(p)

              return (
                <div
                  key={p.id}
                  className="grid gap-3 py-4 animate-fadeUp sm:grid-cols-[1fr_auto] sm:items-center"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-semibold text-white" title={p.nome}>
                        {p.nome}
                      </p>
                      {status && (
                        <span className={`rounded-lg border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${status.classe}`}>
                          {status.rotulo}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-zinc-500">
                      {formatarMoeda(p.preco)} / un. · estoque: {p.estoque}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:justify-end">
                    <span className="rounded-lg border border-border bg-[#222228] px-2.5 py-1 text-xs text-zinc-300">
                      x{p.quantidade}
                    </span>
                    <span className="min-w-[92px] text-right font-display text-sm font-bold text-success">
                      {formatarMoeda(p.preco * p.quantidade)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemover(p.id)}
                      className="grid h-8 w-8 place-items-center rounded-lg border border-border text-zinc-500 transition-all hover:border-danger hover:bg-danger/10 hover:text-danger focus:outline-none focus:ring-2 focus:ring-danger/40"
                      title="Remover produto"
                      aria-label={`Remover ${p.nome}`}
                    >
                      ×
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-4 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="block text-sm text-zinc-400">
                {filtrosAtivos ? 'Subtotal exibido' : 'Total da compra'}
              </span>
              <span className="font-display text-2xl font-extrabold text-accent">
                {formatarMoeda(totalExibido)}
              </span>
              {filtrosAtivos && (
                <span className="mt-1 block text-xs text-zinc-500">
                  Carrinho completo: {formatarMoeda(total)}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={onFinalizar}
              disabled={quantidadeItens === 0}
              className="rounded-lg bg-success px-6 py-3 text-sm font-bold text-black transition-all hover:-translate-y-0.5 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-success/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </section>
  )
}
