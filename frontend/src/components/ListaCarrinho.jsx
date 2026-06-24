import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, RotateCcw, ShoppingBag } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { formatarMoeda, statusEstoque } from '../utils/formatters'

function EstadoVazio({ titulo, descricao, onLimparFiltros, onDesfazer }) {
  return (
    <div className="rounded-xl border border-border bg-bg/40 px-4 py-10 text-center">
      <p className="font-display text-lg font-bold text-white">{titulo}</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500">{descricao}</p>
      <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
        {onLimparFiltros && (
          <Button variant="accent" onClick={onLimparFiltros}>
            Limpar filtros
          </Button>
        )}
        <Button variant="outline" onClick={onDesfazer}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Desfazer
        </Button>
      </div>
    </div>
  )
}

export default function ListaCarrinho({
  produtos,
  total,
  totalResultado,
  quantidadeItens,
  filtrosAtivos,
  busca,
  carregando,
  onLimparFiltros,
  onRemover,
  onDesfazer,
  onFinalizar,
}) {
  const carrinhoVazio = quantidadeItens === 0
  const semResultados = !carrinhoVazio && filtrosAtivos && produtos.length === 0
  const totalExibido = filtrosAtivos ? totalResultado : total

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produtos no Carrinho</CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{produtos.length} produto(s)</Badge>
          <Button variant="ghost" size="sm" onClick={onDesfazer}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {carrinhoVazio && (
          <EstadoVazio
            titulo="Carrinho vazio"
            descricao="Nenhum item cadastrado nesta compra ainda."
            onDesfazer={onDesfazer}
          />
        )}

        {semResultados && (
          <EstadoVazio
            titulo="Nenhum produto encontrado"
            descricao={busca.trim() ? `Não há produtos com “${busca.trim()}” nesta compra.` : 'Nenhum item combina com os filtros atuais.'}
            onLimparFiltros={onLimparFiltros}
            onDesfazer={onDesfazer}
          />
        )}

        {!carrinhoVazio && !semResultados && (
          <>
            <div className="divide-y divide-border">
              <AnimatePresence initial={false}>
                {produtos.map((p, i) => {
                  const status = statusEstoque(p)
                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="grid gap-3 py-4 sm:grid-cols-[1fr_auto] sm:items-center"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="truncate text-sm font-semibold text-white" title={p.nome}>
                            {p.nome}
                          </p>
                          {status && (
                            <Badge variant={status.classe === 'border-danger/30 bg-danger/10 text-orange-100' ? 'danger' : 'warning'}>
                              {status.rotulo}
                            </Badge>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-zinc-500">
                          {formatarMoeda(p.preco)} / un. · estoque: {p.estoque}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-3 sm:justify-end">
                        <Badge variant="outline" className="font-mono">
                          x{p.quantidade}
                        </Badge>
                        <span className="min-w-[92px] text-right font-display text-sm font-bold text-success">
                          {formatarMoeda(p.preco * p.quantidade)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemover(p.id)}
                          className="text-zinc-500 hover:text-danger"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

            <div className="mt-4 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="block text-sm text-zinc-400">
                  {filtrosAtivos ? 'Subtotal exibido' : 'Total da compra'}
                </span>
                <span className="font-display text-3xl font-extrabold text-accent">
                  {formatarMoeda(totalExibido)}
                </span>
                {filtrosAtivos && (
                  <span className="mt-1 block text-xs text-zinc-500">
                    Carrinho completo: {formatarMoeda(total)}
                  </span>
                )}
              </div>
              <Button
                variant="success"
                size="lg"
                onClick={onFinalizar}
                disabled={quantidadeItens === 0}
                className="gap-2"
              >
                <ShoppingBag className="h-5 w-5" />
                Finalizar Compra
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}