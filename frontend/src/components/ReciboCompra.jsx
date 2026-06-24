import { motion } from 'framer-motion'
import { Receipt, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { formatarMoeda } from '../utils/formatters'

export default function ReciboCompra({ recibo, onFechar }) {
  if (!recibo) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-success/30 bg-success/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-success">
            <Receipt className="h-5 w-5" />
            Recibo da Compra
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-success">#{recibo.id_transacao}</span>
            <span className="text-xs text-zinc-500">{recibo.data}</span>
            <Button variant="ghost" size="sm" onClick={onFechar} className="ml-auto">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 rounded-xl border border-success/20 bg-bg/35 p-3">
            {recibo.itens.map(item => (
              <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                <div>
                  <p className="font-medium text-white">{item.nome}</p>
                  <p className="text-xs text-green-100/70">
                    x{item.quantidade} · estoque restante: {item.estoque}
                  </p>
                </div>
                <span className="font-display font-bold text-green-100">
                  {formatarMoeda(item.subtotal ?? item.preco * item.quantidade)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-success/20 pt-4">
            <span className="text-sm text-green-100/80">
              {recibo.quantidade_unidades} unidade(s)
            </span>
            <span className="font-display text-2xl font-extrabold text-success">
              {formatarMoeda(recibo.total)}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}