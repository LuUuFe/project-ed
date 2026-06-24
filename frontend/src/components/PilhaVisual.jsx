import { motion } from 'framer-motion'
import { Layers } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Badge } from './ui/Badge'

export default function PilhaVisual({ tamanho }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-accent" />
          Pilha de Ações
        </CardTitle>
        <Badge variant="outline">{tamanho} ação(ões)</Badge>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {tamanho === 0 ? (
            <p className="text-sm text-zinc-500">Nenhuma ação para desfazer.</p>
          ) : (
            <div className="flex flex-col-reverse items-center gap-1">
              {Array.from({ length: Math.min(tamanho, 5) }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="w-full max-w-xs rounded-lg border border-border bg-[#222228] px-4 py-2 text-center text-xs text-zinc-300"
                >
                  Ação #{tamanho - i}
                </motion.div>
              ))}
              {tamanho > 5 && (
                <p className="text-xs text-zinc-500">+ {tamanho - 5} mais</p>
              )}
              <div className="mt-2 h-2 w-2 rounded-full bg-accent" />
              <p className="text-[10px] text-zinc-600">TOPO</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}