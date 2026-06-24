import { motion } from 'framer-motion'
import { History, Link } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Badge } from './ui/Badge'
import { formatarMoeda } from '../utils/formatters'

export default function HistoricoCompras({ historico }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-accent" />
          Histórico de Compras
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{historico.length} registro(s)</Badge>
          <span className="text-xs text-zinc-500">Lista encadeada</span>
        </div>
      </CardHeader>
      <CardContent>
        {historico.length === 0 ? (
          <div className="rounded-xl border border-border bg-bg/40 px-4 py-8 text-center">
            <p className="font-display text-lg font-bold text-white">Histórico vazio</p>
            <p className="mt-2 text-sm text-zinc-500">As compras finalizadas aparecerão aqui.</p>
          </div>
        ) : (
          <div className="relative space-y-4 border-l-2 border-accent/30 pl-5">
            {historico.map((compra, index) => (
              <motion.article
                key={compra.id_transacao}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative rounded-xl border border-border bg-surface p-4"
              >
                <span className="absolute -left-[27px] top-5 h-3 w-3 rounded-full border-2 border-bg bg-accent" />
                <div className="mb-3 flex flex-col gap-2 border-b border-border/70 pb-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-mono text-xs text-accent">#{compra.id_transacao}</p>
                    <p className="mt-1 text-xs text-zinc-500">{compra.data}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-display text-lg font-bold text-success">
                      {formatarMoeda(compra.total)}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {compra.quantidade_unidades || compra.quantidade_itens} unidade(s)
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {compra.itens.map(item => (
                    <div key={`${compra.id_transacao}-${item.id}`} className="flex flex-col gap-1 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
                      <span>{item.nome} · x{item.quantidade}</span>
                      <span>Estoque restante: {item.estoque}</span>
                    </div>
                  ))}
                </div>

                {index < historico.length - 1 && (
                  <div className="absolute -bottom-4 left-0 flex items-center gap-1 text-[10px] text-zinc-600">
                    <Link className="h-3 w-3" />
                    <span>próximo nó</span>
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}