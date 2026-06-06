export default function ListaCarrinho({ produtos, total, onRemover, onDesfazer, onFinalizar }) {
  if (produtos.length === 0) {
    return (
      <section className="bg-surface border border-border rounded-2xl p-6 animate-fadeUp">
        <div className="flex items-center justify-between mb-5">
          <p className="font-display text-[11px] font-bold tracking-[2px] uppercase text-zinc-500">
            Produtos no Carrinho
          </p>
          <button 
            onClick={onDesfazer}
            className="text-xs text-zinc-400 hover:text-white border border-border hover:border-zinc-500 px-3 py-1 rounded-lg transition-colors"
          >
            ↩ Desfazer Ação (Pilha)
          </button>
        </div>
        <div className="text-center py-10">
          <p className="text-4xl mb-3">🛍️</p>
          <p className="text-zinc-400 text-sm">O carrinho encontra-se desprovido de produtos.</p>
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
        <div className="flex gap-2 items-center">
          <span className="text-xs text-zinc-500 bg-[#222228] px-2.5 py-1 rounded-full border border-border">
            {produtos.length} ite{produtos.length === 1 ? 'm' : 'ns'}
          </span>
          <button 
            onClick={onDesfazer}
            className="text-xs text-zinc-400 hover:text-white border border-border hover:border-zinc-500 px-3 py-1 rounded-lg transition-colors"
          >
            ↩ Desfazer Ação
          </button>
        </div>
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

      <div className="flex items-center justify-between pt-6 mt-4 border-t border-border">
        <div>
          <span className="text-sm text-zinc-400 block mb-1">Total da Compra</span>
          <span className="font-display font-extrabold text-accent text-2xl">
            R$ {total.toFixed(2)}
          </span>
        </div>
        <button 
          onClick={onFinalizar}
          className="bg-success text-black font-display font-bold px-6 py-3 rounded-lg hover:bg-green-400 transition-all hover:-translate-y-0.5"
        >
          ✓ Finalizar Compra
        </button>
      </div>
    </section>
  )
}