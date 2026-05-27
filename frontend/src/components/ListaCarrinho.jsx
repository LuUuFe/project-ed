export default function ListaCarrinho({ produtos, total, onRemover }) {
  if (produtos.length === 0) {
    return (
      <section className="bg-surface border border-border rounded-2xl p-6 animate-fadeUp">
        <p className="font-display text-[11px] font-bold tracking-[2px] uppercase text-zinc-500 mb-5">
          Produtos no Carrinho
        </p>
        <div className="text-center py-10">
          <p className="text-4xl mb-3">🛍️</p>
          <p className="text-zinc-400 text-sm">Nenhum produto adicionado ainda.</p>
          <p className="text-zinc-600 text-xs mt-1">Use o formulário acima para cadastrar.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-surface border border-border rounded-2xl p-6 animate-fadeUp">
      <div className="flex items-center justify-between mb-5">
        <p className="font-display text-[11px] font-bold tracking-[2px] uppercase text-zinc-500">
          Produtos no Carrinho
        </p>
        <span className="text-xs text-zinc-500 bg-[#222228] px-2.5 py-1 rounded-full border border-border">
          {produtos.length} ite{produtos.length === 1 ? 'm' : 'ns'} no array
        </span>
      </div>

      <div className="space-y-0.5">
        {produtos.map((p, i) => (
          <div
            key={p.id}
            className="flex items-center justify-between py-3.5 border-b border-border last:border-none animate-fadeUp"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div>
              <p className="text-sm font-medium text-white">{p.nome}</p>
              <p className="text-xs text-zinc-500 mt-0.5">
                R$ {p.preco.toFixed(2)} / un. · estoque: {p.estoque}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-zinc-400 bg-[#222228] border border-border px-2.5 py-1 rounded-lg">
                x{p.quantidade}
              </span>
              <span className="font-display font-bold text-success text-sm min-w-[80px] text-right">
                R$ {(p.preco * p.quantidade).toFixed(2)}
              </span>
              <button
                onClick={() => onRemover(p.id)}
                className="w-7 h-7 rounded-lg border border-border text-zinc-500 hover:border-danger hover:text-danger hover:bg-danger/10 transition-all text-xs flex items-center justify-center"
                title="Remover"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between pt-4 mt-2 border-t border-border">
        <span className="text-sm text-zinc-400">Total</span>
        <span className="font-display font-extrabold text-accent text-xl">
          R$ {total.toFixed(2)}
        </span>
      </div>
    </section>
  )
}
