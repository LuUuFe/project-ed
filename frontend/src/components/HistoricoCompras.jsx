export default function HistoricoCompras({ historico }) {
  return (
    <section className="bg-[#0e0e10] border border-dashed border-border rounded-2xl p-6 animate-fadeUp mt-6">
      <div className="flex items-center justify-between mb-5">
        <p className="font-display text-[11px] font-bold tracking-[2px] uppercase text-zinc-500">
          Histórico de Transações (Lista Encadeada)
        </p>
      </div>

      <div className="space-y-3">
        {historico.map((compra, index) => (
          <div key={compra.id_transacao} className="bg-[#18181c] border border-border rounded-xl p-4 animate-popIn" style={{ animationDelay: `${index * 50}ms` }}>
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-border/50">
              <div>
                <span className="text-xs font-mono text-accent">ID: {compra.id_transacao}</span>
                <span className="text-xs text-zinc-500 ml-3">Data: {compra.data}</span>
              </div>
              <span className="font-display font-bold text-success">R$ {compra.total.toFixed(2)}</span>
            </div>
            
            <div className="space-y-1">
              {compra.itens.map(item => (
                <div key={item.id} className="flex justify-between text-xs text-zinc-400">
                  <span>- {item.nome} (x{item.quantidade})</span>
                  <span>Estoque remanescente: {item.estoque}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}