import { useState, useEffect, useCallback } from 'react'
import FormProduto from './components/FormProduto'
import ArrayVisual from './components/ArrayVisual'
import ListaCarrinho from './components/ListaCarrinho'
import HistoricoCompras from './components/HistoricoCompras'
import FiltrosCarrinho from './components/FiltrosCarrinho'
import ResumoCarrinho from './components/ResumoCarrinho'
import ReciboCompra from './components/ReciboCompra'

const filtrosIniciais = { busca: '', ordenacao: 'cadastro' }

async function lerResposta(res, mensagemPadrao) {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.erro || mensagemPadrao)
  }
  return data
}

function montarQuery(filtros) {
  const params = new URLSearchParams()
  const busca = filtros.busca.trim()

  if (busca) params.set('busca', busca)
  if (filtros.ordenacao !== 'cadastro') params.set('ordenar', filtros.ordenacao)

  const query = params.toString()
  return query ? `?${query}` : ''
}

export default function App() {
  const [produtos, setProdutos] = useState([])
  const [produtosArray, setProdutosArray] = useState([])
  const [total, setTotal] = useState(0)
  const [totalResultado, setTotalResultado] = useState(0)
  const [quantidadeItens, setQuantidadeItens] = useState(0)
  const [quantidadeResultados, setQuantidadeResultados] = useState(0)
  const [baixoEstoque, setBaixoEstoque] = useState(0)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [historico, setHistorico] = useState([])
  const [filtros, setFiltros] = useState(filtrosIniciais)
  const [carregandoCarrinho, setCarregandoCarrinho] = useState(false)
  const [recibo, setRecibo] = useState(null)

  const filtrosAtivos = filtros.busca.trim() !== '' || filtros.ordenacao !== 'cadastro'

  const fetchCarrinho = useCallback(async (filtrosConsulta = filtros) => {
    setCarregandoCarrinho(true)
    try {
      const res = await fetch(`/api/carrinho${montarQuery(filtrosConsulta)}`)
      const data = await lerResposta(res, 'Falha ao carregar o carrinho.')

      setProdutos(data.produtos || [])
      setProdutosArray(data.produtos_carrinho || data.produtos || [])
      setTotal(Number(data.total || 0))
      setTotalResultado(Number(data.total_resultado ?? data.total ?? 0))
      setQuantidadeItens(Number(data.quantidade_itens ?? data.produtos?.length ?? 0))
      setQuantidadeResultados(Number(data.quantidade_resultados ?? data.produtos?.length ?? 0))
      setBaixoEstoque(Number(data.baixo_estoque || 0))
      setErro('')
    } catch (err) {
      setErro(err.message || 'Falha na comunicação com o servidor.')
    } finally {
      setCarregandoCarrinho(false)
    }
  }, [filtros])

  const fetchHistorico = useCallback(async () => {
    try {
      const res = await fetch('/api/historico')
      const data = await lerResposta(res, 'Falha ao carregar o histórico.')
      setHistorico(Array.isArray(data) ? data : [])
    } catch (err) {
      setErro(err.message || 'Não foi possível carregar o histórico.')
    }
  }, [])

  useEffect(() => {
    fetchCarrinho()
  }, [fetchCarrinho])

  useEffect(() => {
    fetchHistorico()
  }, [fetchHistorico])

  function atualizarFiltro(nome, valor) {
    setFiltros(prev => ({ ...prev, [nome]: valor }))
    setSucesso('')
  }

  function limparFiltros() {
    setFiltros(filtrosIniciais)
    setSucesso('')
  }

  async function handleProdutoAdicionado() {
    setSucesso('Produto adicionado ao carrinho.')
    setRecibo(null)
    await fetchCarrinho()
  }

  async function handleRemover(id) {
    setErro('')
    setSucesso('')
    setRecibo(null)

    try {
      const res = await fetch(`/api/carrinho/${id}`, { method: 'DELETE' })
      await lerResposta(res, 'Não foi possível remover o produto.')
      setSucesso('Produto removido do carrinho.')
      await fetchCarrinho()
    } catch (err) {
      setErro(err.message || 'Não foi possível remover o produto.')
    }
  }

  async function handleDesfazer() {
    setErro('')
    setSucesso('')
    setRecibo(null)

    try {
      const res = await fetch('/api/desfazer', { method: 'POST' })
      await lerResposta(res, 'Não foi possível desfazer a ação.')
      setSucesso('Última ação desfeita pela pilha.')
      await fetchCarrinho()
    } catch (err) {
      setErro(err.message || 'Não foi possível desfazer a ação.')
    }
  }

  async function handleFinalizar() {
    setErro('')
    setSucesso('')

    const confirmado = window.confirm(
      `Finalizar a compra com ${quantidadeItens} produto(s) no carrinho e total de R$ ${total.toFixed(2)}?`
    )
    if (!confirmado) return

    try {
      const res = await fetch('/api/finalizar', { method: 'POST' })
      const data = await lerResposta(res, 'Erro ao finalizar a compra.')
      setRecibo(data.recibo)
      setSucesso(data.mensagem || 'Compra finalizada com sucesso.')
      setFiltros(filtrosIniciais)
      await fetchCarrinho(filtrosIniciais)
      await fetchHistorico()
    } catch (err) {
      setErro(err.message || 'Erro ao finalizar a compra.')
    }
  }

  return (
    <div className="min-h-screen bg-bg font-body text-zinc-100">
      <header className="sticky top-0 z-10 border-b border-border bg-bg/90 px-4 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex min-h-16 max-w-6xl flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-0">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-lg" aria-hidden="true">
              🛒
            </span>
            <div>
              <h1 className="font-display text-xl font-extrabold tracking-tight">
                Carrinho<em className="not-italic text-accent">Shop</em>
              </h1>
              <p className="text-xs text-zinc-500">Projeto 02 · Etapa 04</p>
            </div>
          </div>
          <span className="w-fit rounded-lg border border-border px-3 py-1 text-[11px] text-zinc-400">
            Array · Pilha · Lista Encadeada
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:px-6 lg:py-8">
        {(erro || sucesso) && (
          <div
            role="status"
            className={`rounded-lg border px-4 py-3 text-sm shadow-soft ${
              erro
                ? 'border-danger/30 bg-danger/10 text-orange-100'
                : 'border-success/30 bg-success/10 text-green-100'
            }`}
          >
            {erro || sucesso}
          </div>
        )}

        <ResumoCarrinho
          quantidadeItens={quantidadeItens}
          total={total}
          quantidadeResultados={quantidadeResultados}
          quantidadeHistorico={historico.length}
          baixoEstoque={baixoEstoque}
          filtrosAtivos={filtrosAtivos}
        />

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.4fr]">
          <div className="space-y-5">
            <FormProduto onAdicionado={handleProdutoAdicionado} />
            <ArrayVisual
              produtos={produtosArray}
              quantidadeResultados={quantidadeResultados}
              filtrosAtivos={filtrosAtivos}
            />
          </div>

          <div className="space-y-5">
            <FiltrosCarrinho
              filtros={filtros}
              onFiltroChange={atualizarFiltro}
              onLimpar={limparFiltros}
              quantidadeResultados={quantidadeResultados}
              quantidadeItens={quantidadeItens}
              carregando={carregandoCarrinho}
            />

            <ListaCarrinho
              produtos={produtos}
              total={total}
              totalResultado={totalResultado}
              quantidadeItens={quantidadeItens}
              filtrosAtivos={filtrosAtivos}
              busca={filtros.busca}
              carregando={carregandoCarrinho}
              onLimparFiltros={limparFiltros}
              onRemover={handleRemover}
              onDesfazer={handleDesfazer}
              onFinalizar={handleFinalizar}
            />

            <ReciboCompra recibo={recibo} onFechar={() => setRecibo(null)} />
          </div>
        </div>

        <HistoricoCompras historico={historico} />
      </main>

      <footer className="mt-4 border-t border-border px-4 py-7 text-center text-xs text-zinc-600">
        Estruturas aplicadas no backend: <strong className="text-accent">Array, Pilha e Lista Encadeada</strong>
      </footer>
    </div>
  )
}
