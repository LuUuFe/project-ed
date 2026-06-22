function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}

export default function HistoricoCompras({ historico }) {
  return (
    <section className="rounded-lg border border-dashed border-border bg-bg p-5 shadow-soft animate-fadeUp">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="font-display text-[11px] font-bold uppercase tracking-[2px] text-zinc-500">
            Histórico de Compras
          </p>
          <p className="mt-1 text-xs text-zinc-600">Lista encadeada · inserção no início</p>
        </div>
        <span className="rounded-lg border border-border bg-surface px-2.5 py-1 text-xs text-zinc-400">
          {historico.length} registro(s)
        </span>
      </div>

      {historico.length === 0 ? (
        <div className="rounded-lg border border-border bg-surface/40 px-4 py-8 text-center">
          <p className="font-display text-lg font-bold text-white">Histórico vazio</p>
          <p className="mt-2 text-sm text-zinc-500">As compras finalizadas aparecerão aqui.</p>
        </div>
      ) : (
        <div className="relative space-y-4 border-l border-border pl-5">
          {historico.map((compra, index) => (
            <article
              key={compra.id_transacao}
              className="relative rounded-lg border border-border bg-surface p-4 animate-popIn"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="absolute -left-[27px] top-5 h-3 w-3 rounded-full border-2 border-bg bg-accent" />
              <div className="mb-3 flex flex-col gap-2 border-b border-border/70 pb-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-xs text-accent">#{compra.id_transacao}</p>
                  <p className="mt-1 text-xs text-zinc-500">{compra.data}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-display text-lg font-bold text-success">
                    {formatarMoeda(compra.total)}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {compra.quantidade_unidades || compra.quantidade_itens} unidade(s)
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {compra.itens.map(item => (
                  <div key={`${compra.id_transacao}-${item.id}`} className="flex flex-col gap-1 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
                    <span>{item.nome} · x{item.quantidade}</span>
                    <span>Estoque restante: {item.estoque}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
