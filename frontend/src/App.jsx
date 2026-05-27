import { useState, useEffect, useCallback } from 'react'
import FormProduto from './components/FormProduto'
import ArrayVisual from './components/ArrayVisual'
import ListaCarrinho from './components/ListaCarrinho'

export default function App() {
  const [produtos, setProdutos] = useState([])
  const [total, setTotal]       = useState(0)
  const [erro, setErro]         = useState('')

  const fetchCarrinho = useCallback(async () => {
    try {
      const res  = await fetch('/api/carrinho')
      const data = await res.json()
      setProdutos(data.produtos)
      setTotal(data.total)
    } catch {
      setErro('Não foi possível carregar o carrinho. O backend está rodando?')
    }
  }, [])

  useEffect(() => { fetchCarrinho() }, [fetchCarrinho])

  async function handleRemover(id) {
    await fetch(`/api/carrinho/${id}`, { method: 'DELETE' })
    fetchCarrinho()
  }

  return (
    <div className="min-h-screen bg-bg font-body">

      {/* Header */}
      <header className="border-b border-border px-6 sticky top-0 bg-bg/90 backdrop-blur-md z-10">
        <div className="max-w-3xl mx-auto h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🛒</span>
            <span className="font-display font-extrabold text-lg tracking-tight">
              Carrinho<em className="not-italic text-accent">Shop</em>
            </span>
          </div>
          <span className="text-[11px] border border-border rounded-full px-3 py-1 text-zinc-500">
            Estrutura: <strong className="text-accent">Array</strong>
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-8 space-y-5">

        {erro && (
          <div className="bg-danger/10 border border-danger/30 text-danger text-sm rounded-xl px-4 py-3">
            ⚠️ {erro}
          </div>
        )}

        <FormProduto onAdicionado={fetchCarrinho} />
        <ArrayVisual produtos={produtos} />
        <ListaCarrinho produtos={produtos} total={total} onRemover={handleRemover} />

      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-zinc-600 border-t border-border mt-4">
        Projeto 02 – Carrinho de Compras &nbsp;·&nbsp; Estrutura de Dados: <strong className="text-accent">Array</strong> &nbsp;·&nbsp; Flask + React + Tailwind
      </footer>

    </div>
  )
}
