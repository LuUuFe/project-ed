function statusEstoque(produto) {
  if (produto.estoque <= produto.quantidade) return 'Crítico'
  if (produto.estoque <= Math.max(2, produto.quantidade + 1)) return 'Baixo'
  return ''
}

export default function ArrayVisual({ produtos, quantidadeResultados, filtrosAtivos }) {
  return (
    <section className="rounded-lg border border-dashed border-border bg-bg p-5 shadow-soft animate-fadeUp">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-[11px] font-bold uppercase tracking-[2px] text-zinc-500">
            Estado do Array
          </p>
          <p className="mt-1 text-xs text-zinc-600">
            {filtrosAtivos
              ? `${quantidadeResultados} resultado(s) na visão filtrada`
              : 'Ordem real de cadastro'}
          </p>
        </div>
        <span className="rounded-lg border border-border bg-surface px-2.5 py-1 text-xs text-zinc-400">
          {produtos.length} posição(ões)
        </span>
      </div>

      {produtos.length === 0 ? (
        <div className="rounded-lg border border-border bg-surface/50 px-4 py-8 text-center">
          <p className="font-mono text-sm text-zinc-600">{'[ ]'}</p>
          <p className="mt-2 text-sm text-zinc-500">Carrinho vazio.</p>
        </div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2">
          {produtos.map((p, i) => {
            const status = statusEstoque(p)

            return (
              <div
                key={p.id}
                className="min-w-0 rounded-lg border border-border bg-[#222228] px-4 py-3 animate-popIn"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="font-mono text-[11px] text-accent">[{i}] id:{p.id}</p>
                  {status && (
                    <span className="rounded-lg border border-danger/30 bg-danger/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-100">
                      {status}
                    </span>
                  )}
                </div>
                <p className="truncate text-sm font-medium leading-tight text-white" title={p.nome}>
                  {p.nome}
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  x{p.quantidade} · R$ {p.preco.toFixed(2)} · estoque {p.estoque}
                </p>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
