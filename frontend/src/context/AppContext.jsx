import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { api } from '../services/api'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [produtos, setProdutos] = useState([])
  const [produtosArray, setProdutosArray] = useState([])
  const [hashBuckets, setHashBuckets] = useState([])
  const [pilhaTamanho, setPilhaTamanho] = useState(0)
  const [total, setTotal] = useState(0)
  const [totalResultado, setTotalResultado] = useState(0)
  const [quantidadeItens, setQuantidadeItens] = useState(0)
  const [quantidadeResultados, setQuantidadeResultados] = useState(0)
  const [baixoEstoque, setBaixoEstoque] = useState(0)
  const [historico, setHistorico] = useState([])
  const [recibo, setRecibo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [filtros, setFiltros] = useState({ busca: '', ordenacao: 'cadastro' })

  const fetchCarrinho = useCallback(async (filtrosConsulta = filtros) => {
    setLoading(true)
    try {
      const data = await api.getCarrinho(filtrosConsulta)
      setProdutos(data.produtos || [])
      setProdutosArray(data.produtos_carrinho || data.produtos || [])
      setHashBuckets(data.hash_buckets || [])
      setPilhaTamanho(data.pilha_tamanho || 0)
      setTotal(Number(data.total || 0))
      setTotalResultado(Number(data.total_resultado ?? data.total ?? 0))
      setQuantidadeItens(Number(data.quantidade_itens ?? data.produtos?.length ?? 0))
      setQuantidadeResultados(Number(data.quantidade_resultados ?? data.produtos?.length ?? 0))
      setBaixoEstoque(Number(data.baixo_estoque || 0))
      setError('')
    } catch (err) {
      setError(err.message || 'Falha ao carregar o carrinho.')
    } finally {
      setLoading(false)
    }
  }, [filtros])

  const fetchHistorico = useCallback(async () => {
    try {
      const data = await api.getHistorico()
      setHistorico(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Falha ao carregar histórico.')
    }
  }, [])

  useEffect(() => {
    fetchCarrinho()
  }, [fetchCarrinho])

  useEffect(() => {
    fetchHistorico()
  }, [fetchHistorico])

  const adicionarProduto = async (dados) => {
    setError('')
    setSuccess('')
    setRecibo(null)
    try {
      await api.adicionarProduto(dados)
      setSuccess('Produto adicionado ao carrinho.')
      await fetchCarrinho()
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  const removerProduto = async (id) => {
    setError('')
    setSuccess('')
    setRecibo(null)
    try {
      await api.removerProduto(id)
      setSuccess('Produto removido do carrinho.')
      await fetchCarrinho()
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  const desfazerAcao = async () => {
    setError('')
    setSuccess('')
    setRecibo(null)
    try {
      await api.desfazer()
      setSuccess('Última ação desfeita.')
      await fetchCarrinho()
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  const finalizarCompra = async () => {
    setError('')
    setSuccess('')
    try {
      const data = await api.finalizar()
      setRecibo(data.recibo)
      setSuccess(data.mensagem || 'Compra finalizada com sucesso.')
      setFiltros({ busca: '', ordenacao: 'cadastro' })
      await fetchCarrinho({ busca: '', ordenacao: 'cadastro' })
      await fetchHistorico()
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  const atualizarFiltro = (nome, valor) => {
    setFiltros(prev => ({ ...prev, [nome]: valor }))
    setSuccess('')
  }

  const limparFiltros = () => {
    setFiltros({ busca: '', ordenacao: 'cadastro' })
    setSuccess('')
  }

  const value = {
    produtos,
    produtosArray,
    hashBuckets,
    pilhaTamanho,
    total,
    totalResultado,
    quantidadeItens,
    quantidadeResultados,
    baixoEstoque,
    historico,
    recibo,
    loading,
    error,
    success,
    filtros,
    filtrosAtivos: filtros.busca.trim() !== '' || filtros.ordenacao !== 'cadastro',
    adicionarProduto,
    removerProduto,
    desfazerAcao,
    finalizarCompra,
    atualizarFiltro,
    limparFiltros,
    setRecibo,
    setError,
    setSuccess,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  return useContext(AppContext)
}