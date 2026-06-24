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
  
  // Mapeia os nomes dos parâmetros para o que o backend espera
  const paramMap = {
    'busca': 'busca',
    'ordenacao': 'ordenar',    // ← Frontend usa 'ordenacao', backend espera 'ordenar'
    'modo_busca': 'modo',
    'q': 'q',
    'sort': 'sort'
  }
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      // Usa o nome mapeado ou o original
      const mappedKey = paramMap[key] || key
      urlParams.set(mappedKey, value)
    }
  })
  
  const query = urlParams.toString()
  return query ? `?${query}` : ''
}

export const api = {
  async getCarrinho(filtros = {}) {
    // Garante que os parâmetros padrão estão corretos
    const params = {
      busca: filtros.busca || '',
      ordenacao: filtros.ordenacao || 'cadastro',
      ...filtros
    }
    const query = buildQuery(params)
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