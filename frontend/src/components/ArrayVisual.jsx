export default function ArrayVisual({ produtos }) {
  return (
    <section className="bg-bg border border-dashed border-border rounded-2xl p-6 animate-fadeUp">
      <p className="font-display text-[11px] font-bold tracking-[2px] uppercase text-zinc-500 mb-4">
        Estado do Array — Backend
      </p>

      {produtos.length === 0 ? (
        <p className="font-mono text-sm text-zinc-600">{'[ ]  // array vazio'}</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {produtos.map((p, i) => (
            <div
              key={p.id}
              className="bg-[#222228] border border-border rounded-xl px-4 py-3 min-w-[140px] animate-popIn"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <p className="font-mono text-[11px] text-accent mb-1">[{i}]</p>
              <p className="text-sm font-medium text-white leading-tight truncate max-w-[140px]">{p.nome}</p>
              <p className="text-xs text-zinc-500 mt-0.5">
                x{p.quantidade} · R$ {p.preco.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
