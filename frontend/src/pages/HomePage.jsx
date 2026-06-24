import { useApp } from '../context/AppContext'
import FormProduto from '../components/FormProduto'
import ArrayVisual from '../components/ArrayVisual'
import HashVisual from '../components/HashVisual'
import PilhaVisual from '../components/PilhaVisual'
import ListaCarrinho from '../components/ListaCarrinho'
import HistoricoCompras from '../components/HistoricoCompras'
import FiltrosCarrinho from '../components/FiltrosCarrinho'
import ResumoCarrinho from '../components/ResumoCarrinho'
import ReciboCompra from '../components/ReciboCompra'
import { motion, AnimatePresence } from 'framer-motion'

export default function HomePage() {
  const {
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
    filtrosAtivos,
    adicionarProduto,
    removerProduto,
    desfazerAcao,
    finalizarCompra,
    atualizarFiltro,
    limparFiltros,
    setRecibo,
  } = useApp()

  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface text-xl text-accent">
              🛒
            </span>
            <div>
              <h1 className="font-display text-2xl font-extrabold tracking-tight">
                Carrinho<em className="not-italic text-accent">Shop</em>
              </h1>
              <p className="text-xs text-zinc-500">Projeto 02 · Estruturas de Dados</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-lg border border-border px-3 py-1 text-xs text-zinc-400">
              Array · Pilha · Lista · Hash
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        <AnimatePresence>
          {(error || success) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`rounded-xl border px-4 py-3 text-sm shadow-soft ${
                error
                  ? 'border-danger/30 bg-danger/10 text-orange-100'
                  : 'border-success/30 bg-success/10 text-green-100'
              }`}
            >
              {error || success}
            </motion.div>
          )}
        </AnimatePresence>

        <ResumoCarrinho
          quantidadeItens={quantidadeItens}
          total={total}
          quantidadeResultados={quantidadeResultados}
          quantidadeHistorico={historico.length}
          baixoEstoque={baixoEstoque}
          filtrosAtivos={filtrosAtivos}
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            <FormProduto onAdicionado={adicionarProduto} loading={loading} />
            <ArrayVisual
              produtos={produtosArray}
              quantidadeResultados={quantidadeResultados}
              filtrosAtivos={filtrosAtivos}
            />
            <HashVisual buckets={hashBuckets} />
            <PilhaVisual tamanho={pilhaTamanho} />
          </div>

          <div className="space-y-6">
            <FiltrosCarrinho
              filtros={filtros}
              onFiltroChange={atualizarFiltro}
              onLimpar={limparFiltros}
              quantidadeResultados={quantidadeResultados}
              quantidadeItens={quantidadeItens}
              carregando={loading}
            />
            <ListaCarrinho
              produtos={produtos}
              total={total}
              totalResultado={totalResultado}
              quantidadeItens={quantidadeItens}
              filtrosAtivos={filtrosAtivos}
              busca={filtros.busca}
              carregando={loading}
              onLimparFiltros={limparFiltros}
              onRemover={removerProduto}
              onDesfazer={desfazerAcao}
              onFinalizar={finalizarCompra}
            />
            <ReciboCompra recibo={recibo} onFechar={() => setRecibo(null)} />
          </div>
        </div>

        <HistoricoCompras historico={historico} />
      </main>

      <footer className="mt-8 border-t border-border px-4 py-6 text-center text-xs text-zinc-600">
        Construído com <span className="text-accent">Array</span>,{' '}
        <span className="text-accent">Pilha</span>,{' '}
        <span className="text-accent">Lista Encadeada</span> e{' '}
        <span className="text-accent">Tabela Hash</span>
      </footer>
    </div>
  )
}