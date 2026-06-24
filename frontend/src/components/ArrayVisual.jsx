import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Badge } from './ui/Badge'
import { formatarMoeda, statusEstoque } from '../utils/formatters'

export default function ArrayVisual({ produtos, quantidadeResultados, filtrosAtivos }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Estado do Array</CardTitle>
        <span className="text-xs text-zinc-500">
          {filtrosAtivos
            ? `${quantidadeResultados} resultado(s) na visão filtrada`
            : 'Ordem real de cadastro'}
        </span>
      </CardHeader>
      <CardContent>
        {produtos.length === 0 ? (
          <div className="rounded-xl border border-border bg-bg/40 px-4 py-8 text-center">
            <p className="font-mono text-sm text-zinc-600">[ ]</p>
            <p className="mt-2 text-sm text-zinc-500">Carrinho vazio.</p>
          </div>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2">
            {produtos.map((p, i) => {
              const status = statusEstoque(p)
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-border bg-[#222228] px-4 py-3"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="font-mono text-[11px] text-accent">[{i}] id:{p.id}</p>
                    {status && (
                      <Badge variant={status.classe.includes('danger') ? 'danger' : 'warning'}>
                        {status.rotulo}
                      </Badge>
                    )}
                  </div>
                  <p className="truncate text-sm font-medium leading-tight text-white" title={p.nome}>
                    {p.nome}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    x{p.quantidade} · {formatarMoeda(p.preco)} · estoque {p.estoque}
                  </p>
                </motion.div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}