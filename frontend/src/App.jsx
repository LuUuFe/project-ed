import { useState, useEffect, useCallback } from 'react'
import FormProduto from './components/FormProduto'
import ArrayVisual from './components/ArrayVisual'
import ListaCarrinho from './components/ListaCarrinho'
import HistoricoCompras from './components/HistoricoCompras'

export default function App() {
  const [produtos, setProdutos] = useState([])
  const [total, setTotal]       = useState(0)
  const [erro, setErro]         = useState('')
  const [historico, setHistorico] = useState([])

  const fetchCarrinho = useCallback(async () => {
    try {
      const res  = await fetch('/api/carrinho')
      const data = await res.json()
      setProdutos(data.produtos)
      setTotal(data.total)
    } catch {
      setErro('Falha na comunicação com o servidor de retaguarda.')
    }
  }, [])

  const fetchHistorico = useCallback(async () => {
    try {
      const res = await fetch('/api/historico')
      const data = await res.json()
      setHistorico(data)
    } catch {
      console.error('Impossível resgatar a lista de histórico.')
    }
  }, [])

  useEffect(() => { 
    fetchCarrinho()
    fetchHistorico()
  }, [fetchCarrinho, fetchHistorico])

  async function handleRemover(id) {
    await fetch(`/api/carrinho/${id}`, { method: 'DELETE' })
    fetchCarrinho()
  }

  async function handleDesfazer() {
    setErro('')
    const res = await fetch('/api/desfazer', { method: 'POST' })
    if (res.ok) {
      fetchCarrinho()
    } else {
      const data = await res.json()
      setErro(data.erro || 'Não foi possível desfazer a ação.')
    }
  }

  async function handleFinalizar() {
    setErro('')
    const res = await fetch('/api/finalizar', { method: 'POST' })
    if (res.ok) {
      fetchCarrinho()
      fetchHistorico()
    } else {
      const data = await res.json()
      setErro(data.erro || 'Erro ao processar a finalização da compra.')
    }
  }

  return (
    <div className="min-h-screen bg-bg font-body">
      <header className="border-b border-border px-6 sticky top-0 bg-bg/90 backdrop-blur-md z-10">
        <div className="max-w-3xl mx-auto h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🛒</span>
            <span className="font-display font-extrabold text-lg tracking-tight">
              Carrinho<em className="not-italic text-accent">Shop</em>
            </span>
          </div>
          <span className="text-[11px] border border-border rounded-full px-3 py-1 text-zinc-500">
            Estruturas: <strong className="text-accent">Array, Pilha & Lista Encadeada</strong>
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-5">
        {erro && (
          <div className="bg-danger/10 border border-danger/30 text-danger text-sm rounded-xl px-4 py-3">
            ⚠️ {erro}
          </div>
        )}

        <FormProduto onAdicionado={fetchCarrinho} />
        <ArrayVisual produtos={produtos} />
        <ListaCarrinho 
          produtos={produtos} 
          total={total} 
          onRemover={handleRemover}
          onDesfazer={handleDesfazer}
          onFinalizar={handleFinalizar}
        />
        
        {historico.length > 0 && <HistoricoCompras historico={historico} />}
      </main>

      <footer className="text-center py-8 text-xs text-zinc-600 border-t border-border mt-4">
        Projeto 02 – Etapa 03 &nbsp;·&nbsp; Estruturas Aplicadas: <strong className="text-accent">Array, Pilha, Lista Encadeada</strong>
      </footer>
    </div>
  )
}