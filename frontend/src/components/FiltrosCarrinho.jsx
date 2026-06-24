import { Search, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Input } from './ui/Input'
import { Button } from './ui/Button'

const opcoesOrdenacao = [
  { valor: 'cadastro', rotulo: 'Cadastro' },
  { valor: 'nome_az', rotulo: 'Nome A-Z' },
  { valor: 'nome_za', rotulo: 'Nome Z-A' },
  { valor: 'preco_asc', rotulo: 'Preço ↑' },
  { valor: 'preco_desc', rotulo: 'Preço ↓' },
]

export default function FiltrosCarrinho({
  filtros,
  onFiltroChange,
  onLimpar,
  quantidadeResultados,
  quantidadeItens,
  carregando,
}) {
  const buscaAtiva = filtros.busca.trim() !== ''
  const ordenacaoAtiva = filtros.ordenacao !== 'cadastro'
  const filtrosAtivos = buscaAtiva || ordenacaoAtiva

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buscar e Ordenar</CardTitle>
        <div className="flex items-center gap-2">
          {ordenacaoAtiva && (
            <span className="rounded-lg border border-accent/40 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
              {opcoesOrdenacao.find(o => o.valor === filtros.ordenacao)?.rotulo}
            </span>
          )}
          {buscaAtiva && (
            <span className="rounded-lg border border-border bg-[#222228] px-2.5 py-1 text-xs text-zinc-300">
              Busca ativa
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-[1fr_170px_auto]">
          <div>
            <label htmlFor="busca-produto" className="mb-1 block text-xs font-medium text-zinc-400">
              Produto
            </label>
            <Input
              id="busca-produto"
              type="search"
              value={filtros.busca}
              onChange={(e) => onFiltroChange('busca', e.target.value)}
              placeholder="Buscar por nome"
              icon={<Search className="h-4 w-4" />}
            />
          </div>

          <div>
            <label htmlFor="ordenacao-produto" className="mb-1 block text-xs font-medium text-zinc-400">
              Ordenação
            </label>
            <select
              id="ordenacao-produto"
              value={filtros.ordenacao}
              onChange={(e) => onFiltroChange('ordenacao', e.target.value)}
              className="w-full rounded-lg border border-border bg-[#222228] px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
            >
              {opcoesOrdenacao.map(opcao => (
                <option key={opcao.valor} value={opcao.valor}>
                  {opcao.rotulo}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={onLimpar}
              disabled={!filtrosAtivos}
              className="w-full sm:w-auto"
            >
              <X className="mr-2 h-4 w-4" />
              Limpar
            </Button>
          </div>
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          {carregando ? 'Carregando...' : `${quantidadeResultados} de ${quantidadeItens} produto(s) exibido(s)`}
        </p>
      </CardContent>
    </Card>
  )
}