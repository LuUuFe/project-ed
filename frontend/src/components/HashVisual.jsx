import { motion } from 'framer-motion'
import { Hash } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Badge } from './ui/Badge'

export default function HashVisual({ buckets }) {
  const totalProdutos = buckets?.reduce((acc, b) => acc + b.length, 0) || 0
  const numBuckets = buckets?.length || 0

  if (!buckets || numBuckets === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tabela Hash</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-500">Nenhum produto para exibir na hash.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="h-5 w-5 text-accent" />
          Tabela Hash
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{totalProdutos} produtos</Badge>
          <Badge variant="outline">{numBuckets} buckets</Badge>
          <span className="text-xs text-zinc-500">Colisões encadeadas</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {buckets.map((bucket, idx) => (
            <div
              key={idx}
              className="min-h-[80px] rounded-xl border border-border bg-bg/60 p-2"
            >
              <p className="mb-2 text-center font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                Bucket {idx}
              </p>
              <div className="space-y-1.5">
                {bucket.length === 0 ? (
                  <p className="text-center text-[10px] text-zinc-600">∅ vazio</p>
                ) : (
                  bucket.map((produto, i) => (
                    <motion.div
                      key={produto.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="truncate rounded border border-accent/30 bg-accent/5 px-2 py-1 text-xs text-zinc-200"
                      title={`ID: ${produto.id} - ${produto.nome}`}
                    >
                      <span className="font-mono text-[9px] text-accent">#{produto.id}</span>{' '}
                      {produto.nome}
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          Busca O(1) por ID usando função hash com encadeamento para colisões.
        </p>
      </CardContent>
    </Card>
  )
}