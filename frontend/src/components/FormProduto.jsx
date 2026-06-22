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

  function validarForm() {
    const nome = form.nome.trim()
    const preco = Number(form.preco)
    const quantidade = Number.parseInt(form.quantidade, 10)
    const estoque = Number.parseInt(form.estoque, 10)

    if (!nome) return 'Informe o nome do produto.'
    if (nome.length > 80) return 'O nome deve ter no máximo 80 caracteres.'
    if (!Number.isFinite(preco) || preco <= 0) return 'Informe um preço maior que zero.'
    if (!Number.isInteger(quantidade) || quantidade < 1) return 'A quantidade deve ser pelo menos 1.'
    if (!Number.isInteger(estoque) || estoque < 0) return 'O estoque não pode ser negativo.'
    if (quantidade > estoque) return 'A quantidade desejada não pode ser maior que o estoque.'

    return ''
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const erroValidacao = validarForm()

    if (erroValidacao) {
      setErro(erroValidacao)
      return
    }

    setLoading(true)
    setErro('')

    try {
      const res = await fetch('/api/carrinho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome.trim(),
          preco: Number(form.preco),
          quantidade: Number.parseInt(form.quantidade, 10),
          estoque: Number.parseInt(form.estoque, 10),
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setErro(data.erro || 'Não foi possível adicionar o produto.')
        return
      }

      setForm(initialForm)
      onAdicionado(data)
    } catch {
      setErro('Não foi possível conectar ao servidor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="rounded-lg border border-border bg-surface p-5 shadow-soft animate-fadeUp">
      <div className="mb-5">
        <p className="font-display text-[11px] font-bold uppercase tracking-[2px] text-zinc-500">
          Cadastrar Produto
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nome" className="mb-1 block text-xs font-medium text-zinc-400">
            Nome do produto
          </label>
          <input
            id="nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Ex: Teclado Mecânico"
            maxLength={80}
            required
            className="w-full rounded-lg border border-border bg-[#222228] px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label htmlFor="preco" className="mb-1 block text-xs font-medium text-zinc-400">
              Preço (R$)
            </label>
            <input
              id="preco"
              name="preco"
              value={form.preco}
              onChange={handleChange}
              type="number"
              min="0.01"
              step="0.01"
              inputMode="decimal"
              placeholder="0,00"
              required
              className="w-full rounded-lg border border-border bg-[#222228] px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <div>
            <label htmlFor="quantidade" className="mb-1 block text-xs font-medium text-zinc-400">
              Quantidade
            </label>
            <input
              id="quantidade"
              name="quantidade"
              value={form.quantidade}
              onChange={handleChange}
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              required
              className="w-full rounded-lg border border-border bg-[#222228] px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <div>
            <label htmlFor="estoque" className="mb-1 block text-xs font-medium text-zinc-400">
              Estoque
            </label>
            <input
              id="estoque"
              name="estoque"
              value={form.estoque}
              onChange={handleChange}
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              placeholder="0"
              required
              className="w-full rounded-lg border border-border bg-[#222228] px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </div>

        {erro && (
          <p className="rounded-lg border border-danger/20 bg-danger/10 px-3 py-2 text-xs text-orange-100" role="alert">
            {erro}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-accent py-3 text-sm font-bold text-black transition-all hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-[0_4px_20px_rgba(240,192,64,0.25)] focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Adicionando...' : 'Adicionar ao Carrinho'}
        </button>
      </form>
    </section>
  )
}
