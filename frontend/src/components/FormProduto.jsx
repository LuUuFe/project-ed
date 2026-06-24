import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Input } from './ui/Input'
import { Button } from './ui/Button'

const initialForm = { nome: '', preco: '', quantidade: '1', estoque: '' }

export default function FormProduto({ onAdicionado, loading: parentLoading }) {
  const [form, setForm] = useState(initialForm)
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErro('')
  }

  const validarForm = () => {
    const nome = form.nome.trim()
    const preco = Number(form.preco)
    const quantidade = Number.parseInt(form.quantidade, 10)
    const estoque = Number.parseInt(form.estoque, 10)

    if (!nome) return 'Informe o nome do produto.'
    if (nome.length > 80) return 'O nome deve ter no máximo 80 caracteres.'
    if (!Number.isFinite(preco) || preco <= 0) return 'Informe um preço maior que zero.'
    if (!Number.isInteger(quantidade) || quantidade < 1) return 'A quantidade deve ser pelo menos 1.'
    if (!Number.isInteger(estoque) || estoque < 0) return 'O estoque não pode ser negativo.'
    if (quantidade > estoque) return 'A quantidade desejada não pode ser maior que o estoque.'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const erroValidacao = validarForm()
    if (erroValidacao) {
      setErro(erroValidacao)
      return
    }
    setLoading(true)
    setErro('')
    const sucesso = await onAdicionado({
      nome: form.nome.trim(),
      preco: Number(form.preco),
      quantidade: Number.parseInt(form.quantidade, 10),
      estoque: Number.parseInt(form.estoque, 10),
    })
    setLoading(false)
    if (sucesso) {
      setForm(initialForm)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastrar Produto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="nome"
            name="nome"
            label="Nome do produto"
            value={form.nome}
            onChange={handleChange}
            placeholder="Ex: Teclado Mecânico"
            maxLength={80}
            required
          />
          <div className="grid grid-cols-3 gap-3">
            <Input
              id="preco"
              name="preco"
              label="Preço (R$)"
              type="number"
              min="0.01"
              step="0.01"
              value={form.preco}
              onChange={handleChange}
              placeholder="0,00"
              required
            />
            <Input
              id="quantidade"
              name="quantidade"
              label="Quantidade"
              type="number"
              min="1"
              step="1"
              value={form.quantidade}
              onChange={handleChange}
              required
            />
            <Input
              id="estoque"
              name="estoque"
              label="Estoque"
              type="number"
              min="0"
              step="1"
              value={form.estoque}
              onChange={handleChange}
              placeholder="0"
              required
            />
          </div>
          {erro && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-danger"
            >
              {erro}
            </motion.p>
          )}
          <Button type="submit" disabled={loading || parentLoading} className="w-full">
            {loading || parentLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adicionando...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar ao Carrinho
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}