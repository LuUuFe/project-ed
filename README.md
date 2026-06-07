# 🛒 Carrinho de Compras — Projeto 02

Sistema computacional desenvolvido como requisito de avaliação para a disciplina de **Estrutura de Dados**. O projeto consiste na simulação das operações de um carrinho de compras de uma loja virtual, aplicando na prática os conceitos fundamentais de estruturas de dados.

**Integrantes da Equipa:**
* Luis Felipe Andrade Dias
* Gabriel da Silva Marques

## 🛠️ Stack Tecnológica

| Camada   | Tecnologia              |
|----------|-------------------------|
| Backend  | Python 3 + Flask        |
| Frontend | React + Tailwind CSS    |
| Bundler  | Vite                    |

## 📚 Estruturas de Dados Aplicadas

### 1. Estrutura de Dados — Array
O carrinho é implementado e gerido como um **array** (lista Python) no backend, permitindo a manipulação sequencial dos itens.


```

```text
File generated successfully.

```python
carrinho = []  # Array principal

carrinho.append(produto)       # Inserção — O(1) amortizado
carrinho.pop(indice)           # Remoção  — O(n)
for p in carrinho: ...         # Busca    — O(n)

```

### 2. Estrutura de Dados — Pilha (Stack)

Implementada nativamente na Etapa 03 para assegurar a funcionalidade de "Desfazer Ação". As operações de adição e remoção são armazenadas sequencialmente, permitindo a sua reversão em estrita obediência ao princípio LIFO (*Last In, First Out*).

### 3. Estrutura de Dados — Lista Encadeada (Linked List)

Construída através do encadeamento de nós (*Nodes*) na Etapa 03 para salvaguardar o histórico de compras. A estrutura regista cada transação finalizada, preservando a ordem cronológica dos recibos.

## 📁 Estrutura do Projeto

```text
carrinho-compras/
├── backend/
│   ├── app.py               # API Flask (Array, Pilha e Lista Encadeada)
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── FormProduto.jsx       # Formulário de cadastro
    │   │   ├── ArrayVisual.jsx       # Visualizador do array
    │   │   ├── ListaCarrinho.jsx     # Lista de produtos e interações
    │   │   └── HistoricoCompras.jsx  # Exibição visual da Lista Encadeada
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js

```

## ▶️ Instruções para Execução Local

**1. Clonagem do Repositório:**
Primeiramente, realize o clone do repositório na sua máquina local:

```bash
git clone <inserir-o-link-do-seu-repositorio-aqui>

```

**2. Inicialização do Backend (Terminal 1):**

```bash
cd backend
pip install -r requirements.txt
python app.py
# O servidor iniciará em http://localhost:5000

```

**3. Inicialização do Frontend (Terminal 2):**

```bash
cd frontend
npm install
npm run dev
# A aplicação estará disponível em http://localhost:5173

```

Aceda a **http://localhost:5173** no seu navegador web para operar o sistema.

## ✅ Funcionalidades Implementadas

**Etapa 02 (Estrutura Base - Array):**

* [x] Cadastrar produto (nome, preço, quantidade desejada, estoque)
* [x] Exibir produtos no carrinho com subtotal e cálculo automático do total
* [x] Visualizar estado do array em tempo real na interface
* [x] Remover produto do carrinho
* [x] API REST base: `GET /api/carrinho` · `POST /api/carrinho` · `DELETE /api/carrinho/:id`

**Etapa 03 (Estruturas Avançadas - Pilha e Lista Encadeada):**

* [x] Desfazer a última ação efetuada no carrinho (utilizando uma **Pilha**)
* [x] Finalizar a compra, esvaziar o carrinho e atualizar/deduzir o estoque
* [x] Exibir o histórico de compras realizadas (utilizando uma **Lista Encadeada**)
* [x] Expansão da API REST: `POST /api/desfazer` · `POST /api/finalizar` · `GET /api/historico`