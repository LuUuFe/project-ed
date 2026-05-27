# 🛒 Carrinho de Compras — Projeto 02

Sistema de carrinho de compras desenvolvido para a disciplina de **Estrutura de Dados**.

**Integrantes:** Luis Felipe Andrade Dias · Gabriel da Silva Marques

## Stack

| Camada   | Tecnologia              |
|----------|-------------------------|
| Backend  | Python 3 + Flask        |
| Frontend | React + Tailwind CSS    |
| Bundler  | Vite                    |

## Estrutura de Dados — Array

O carrinho é implementado como um **array** (lista Python) no backend.

```python
carrinho = []  # Array principal

carrinho.append(produto)       # Inserção — O(1) amortizado
carrinho.pop(indice)           # Remoção  — O(n)
for p in carrinho: ...         # Busca    — O(n)
```

## 📁 Estrutura do Projeto

```
carrinho-compras/
├── backend/
│   ├── app.py               # API Flask com Array
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── FormProduto.jsx    # Formulário de cadastro
    │   │   ├── ArrayVisual.jsx    # Visualizador do array
    │   │   └── ListaCarrinho.jsx  # Lista de produtos
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

## ▶️ Como executar

### Backend (terminal 1)

```bash
cd backend
pip install -r requirements.txt
python app.py
# Rodando em http://localhost:5000
```

### Frontend (terminal 2)

```bash
cd frontend
npm install
npm run dev
# Rodando em http://localhost:5173
```

Acesse **http://localhost:5173** no navegador.

## ✅ Funcionalidades (Etapa 02)

- [x] Cadastrar produto (nome, preço, quantidade desejada, estoque)
- [x] Exibir produtos no carrinho com subtotal
- [x] Visualizar estado do array em tempo real na interface
- [x] Remover produto do carrinho
- [x] Calcular total automaticamente
- [x] API REST: `GET /api/carrinho` · `POST /api/carrinho` · `DELETE /api/carrinho/:id`
