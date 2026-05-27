import { useState } from 'react'

const initialForm = { nome: '', preco: '', quantidade: '1', estoque: '' }

export default function FormProduto({ onAdicionado }) {
  const [form, setForm] = useState(initialForm)
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErro('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setErro('')

    try {
      const res = await fetch('/api/carrinho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome:       form.nome.trim(),
          preco:      parseFloat(form.preco),
          quantidade: parseInt(form.quantidade),
          estoque:    parseInt(form.estoque),
        }),
      })

      const data = await res.json()
      if (!res.ok) { setErro(data.erro || 'Erro ao adicionar'); return }

      setForm(initialForm)
      onAdicionado()
    } catch {
      setErro('Não foi possível conectar ao servidor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-surface border border-border rounded-2xl p-6 animate-fadeUp">
      <p className="font-display text-[11px] font-bold tracking-[2px] uppercase text-zinc-500 mb-5">
        Cadastrar Produto
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome */}
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">Nome do Produto</label>
          <input
            name="nome" value={form.nome} onChange={handleChange}
            placeholder="Ex: Teclado Mecânico"
            required
            className="w-full bg-[#222228] border border-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        {/* Preço + Quantidade + Estoque */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Preço (R$)</label>
            <input
              name="preco" value={form.preco} onChange={handleChange}
              type="number" min="0" step="0.01" placeholder="0,00"
              required
              className="w-full bg-[#222228] border border-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Qtd. Desejada</label>
            <input
              name="quantidade" value={form.quantidade} onChange={handleChange}
              type="number" min="1" placeholder="1"
              required
              className="w-full bg-[#222228] border border-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Estoque</label>
            <input
              name="estoque" value={form.estoque} onChange={handleChange}
              type="number" min="0" placeholder="0"
              required
              className="w-full bg-[#222228] border border-border rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        {erro && (
          <p className="text-xs text-danger bg-danger/10 border border-danger/20 rounded-lg px-3 py-2">
            {erro}
          </p>
        )}

        <button
          type="submit" disabled={loading}
          className="w-full bg-accent hover:bg-yellow-300 text-black font-display font-bold text-sm rounded-lg py-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(240,192,64,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adicionando...' : '+ Adicionar ao Carrinho'}
        </button>
      </form>
    </section>
  )
}
