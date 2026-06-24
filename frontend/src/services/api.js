const API_BASE = '/api'

async function handleResponse(res, fallbackMsg) {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.erro || fallbackMsg)
  }
  return data
}

function buildQuery(params) {
  const urlParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      urlParams.set(key, value)
    }
  })
  const query = urlParams.toString()
  return query ? `?${query}` : ''
}

export const api = {
  async getCarrinho(filtros = {}) {
    const query = buildQuery(filtros)
    const res = await fetch(`${API_BASE}/carrinho${query}`)
    return handleResponse(res, 'Falha ao carregar carrinho.')
  },

  async adicionarProduto(dados) {
    const res = await fetch(`${API_BASE}/carrinho`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    })
    return handleResponse(res, 'Erro ao adicionar produto.')
  },

  async removerProduto(id) {
    const res = await fetch(`${API_BASE}/carrinho/${id}`, {
      method: 'DELETE',
    })
    return handleResponse(res, 'Erro ao remover produto.')
  },

  async desfazer() {
    const res = await fetch(`${API_BASE}/desfazer`, {
      method: 'POST',
    })
    return handleResponse(res, 'Erro ao desfazer ação.')
  },

  async finalizar() {
    const res = await fetch(`${API_BASE}/finalizar`, {
      method: 'POST',
    })
    return handleResponse(res, 'Erro ao finalizar compra.')
  },

  async getHistorico() {
    const res = await fetch(`${API_BASE}/historico`)
    return handleResponse(res, 'Erro ao carregar histórico.')
  },
}