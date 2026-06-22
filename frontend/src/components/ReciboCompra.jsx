function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}

export default function ReciboCompra({ recibo, onFechar }) {
  if (!recibo) return null

  return (
    <section className="rounded-lg border border-success/30 bg-success/10 p-5 shadow-soft animate-fadeUp" aria-live="polite">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-[11px] font-bold uppercase tracking-[2px] text-green-200">
            Recibo da Compra
          </p>
          <p className="mt-1 text-xs text-green-100/80">#{recibo.id_transacao} · {recibo.data}</p>
        </div>
        <button
          type="button"
          onClick={onFechar}
          className="grid h-8 w-8 place-items-center rounded-lg border border-success/30 text-green-100 transition-colors hover:bg-success/10 focus:outline-none focus:ring-2 focus:ring-success/50"
          aria-label="Fechar recibo"
        >
          ×
        </button>
      </div>

      <div className="space-y-2 rounded-lg border border-success/20 bg-bg/35 p-3">
        {recibo.itens.map(item => (
          <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
            <div>
              <p className="font-medium text-white">{item.nome}</p>
              <p className="text-xs text-green-100/70">
                x{item.quantidade} · estoque restante: {item.estoque}
              </p>
            </div>
            <span className="font-display font-bold text-green-100">
              {formatarMoeda(item.subtotal ?? item.preco * item.quantidade)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-success/20 pt-4">
        <span className="text-sm text-green-100/80">
          {recibo.quantidade_unidades} unidade(s)
        </span>
        <span className="font-display text-2xl font-extrabold text-success">
          {formatarMoeda(recibo.total)}
        </span>
      </div>
    </section>
  )
}
