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

# Projeto 02 — Carrinho de Compras

## Sobre o Projeto
Implementação do **Projeto 02 — Carrinho de Compras**, desenvolvido como requisito de avaliação para a disciplina de Estrutura de Dados. O sistema consiste na simulação de um carrinho de compras de uma loja virtual

## Requisitos funcionais
- Cadastrar produto com nome, preço e quantidade em estoque
- Adicionar produto ao carrinho com quantidade desejada
- Remover produto do carrinho
- Desfazer a última ação no carrinho (usando pilha)
- Exibir resumo do carrinho com total atualizado
- Finalizar compra e atualizar estoque
- Exibir histórico de compras realizadas (usando lista encadeada)

## Integrantes da Equipe
* Luis Felipe Andrade Dias
* Gabriel da Silva Marques

## Stack de Tecnologias
Para o desenvolvimento deste projeto, foram selecionadas as seguintes ferramentas e tecnologias:

* **Back-end:** Python 3 (Versão 3.8 ou superior) - *Obrigatório para a lógica e estruturas de dados.*
* **Front-end:** React e Tailwind CSS
* **Conteinerização e Ambiente:** Docker
* **Gestão de Atividades:** ClickUp

## Instruções para Execução do Projeto
*(Observação: As instruções abaixo são preliminares e devem ser atualizadas conforme a infraestrutura via Docker for inteiramente configurada nas próximas semanas de desenvolvimento).*

1. **Clonagem do Repositório:**
   Primeiramente, realize o clone do repositório em sua máquina local:
   ```bash
   git clone <inserir-o-link-do-seu-repositorio-aqui>