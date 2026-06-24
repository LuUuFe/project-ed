import { ShoppingCart, DollarSign, Search, History } from 'lucide-react'
import { Card, CardContent } from './ui/Card'
import { formatarMoeda } from '../utils/formatters'

function Indicador({ icone: Icon, rotulo, valor, detalhe, destaque }) {
  return (
    <Card className="border-border">
      <CardContent className="flex items-center gap-4 p-4">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#222228]">
          <Icon className="h-6 w-6 text-accent" />
        </div>
        <div>
          <p className="text-xs font-medium text-zinc-500">{rotulo}</p>
          <p className={`font-display text-2xl font-extrabold ${destaque ? 'text-accent' : 'text-white'}`}>
            {valor}
          </p>
          {detalhe && <p className="text-xs text-zinc-500">{detalhe}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

export default function ResumoCarrinho({
  quantidadeItens,
  total,
  quantidadeResultados,
  quantidadeHistorico,
  baixoEstoque,
  filtrosAtivos,
}) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <Indicador
        icone={ShoppingCart}
        rotulo="Produtos"
        valor={quantidadeItens}
        detalhe={baixoEstoque > 0 ? `${baixoEstoque} com estoque baixo` : 'Estoque em ordem'}
      />
      <Indicador
        icone={DollarSign}
        rotulo="Total"
        valor={formatarMoeda(total)}
        detalhe="Pronto para finalizar"
        destaque
      />
      <Indicador
        icone={Search}
        rotulo="Resultados"
        valor={quantidadeResultados}
        detalhe={filtrosAtivos ? 'Filtro ativo' : 'Sem filtros'}
      />
      <Indicador
        icone={History}
        rotulo="Histórico"
        valor={quantidadeHistorico}
        detalhe="Lista encadeada"
      />
    </div>
  )
}