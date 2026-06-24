# 🛒 CarrinhoShop - Sistema de Carrinho de Compras

## 📚 Projeto Acadêmico - Estrutura de Dados

## 👥 Equipe

| Nomes |
|------|
| Gabriel da Sila Marques |
| Luis Felipe Andrade Dias |

---

## 📋 Sobre o Projeto

O **CarrinhoShop** é um sistema completo de carrinho de compras desenvolvido como projeto acadêmico para a disciplina de **Estrutura de Dados**. O sistema demonstra a aplicação prática de quatro estruturas de dados fundamentais:

- **Array Dinâmico** - Manutenção da ordem de cadastro dos produtos
- **Pilha (Stack)** - Recurso de desfazer ações (undo)
- **Lista Encadeada** - Histórico de compras realizadas
- **Tabela Hash** - Busca rápida de produtos por ID (O(1))

---

## 🎯 Funcionalidades

### Gerenciamento de Produtos
- ✅ Adicionar produtos ao carrinho com nome, preço, quantidade e estoque
- ✅ Remover produtos do carrinho
- ✅ Visualização em tempo real do array e tabela hash
- ✅ Busca de produtos por nome (parcial ou exata)
- ✅ Ordenação por nome (A-Z / Z-A) ou preço (crescente / decrescente)

### Controle de Ações
- ✅ Desfazer última ação (adição ou remoção) utilizando pilha
- ✅ Indicador visual da quantidade de ações na pilha

### Finalização de Compra
- ✅ Validação automática de estoque
- ✅ Atualização do estoque após compra
- ✅ Geração de recibo com ID único e detalhamento
- ✅ Histórico de compras com lista encadeada (inserção na cabeça)

### Visualização Didática
- ✅ Representação visual do **Array** com índices e IDs
- ✅ Representação visual da **Tabela Hash** com buckets e colisões
- ✅ Representação visual da **Pilha** com contador de ações
- ✅ Representação visual da **Lista Encadeada** com nós conectados
- ✅ Animações suaves em todas as operações

---

## 🏗️ Tecnologias Utilizadas

### Backend
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| Python | 3.8+ | Linguagem principal |
| Flask | 2.3.3 | Framework web |
| Flask-CORS | 4.0.1 | Compartilhamento de recursos entre domínios |

### Frontend
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| React | 18.2.0 | Biblioteca para interfaces |
| Vite | 5.0.8 | Build tool e servidor de desenvolvimento |
| TailwindCSS | 3.3.6 | Framework CSS utilitário |
| Framer Motion | 10.16.4 | Biblioteca de animações |
| Lucide React | 0.294.0 | Ícones modernos |
| Radix UI Slot | 1.0.2 | Utilitário para composição de componentes |

---

## 📁 Estrutura do Projeto

```
carrinho-shop/
├── backend/
│   ├── app.py                          # Entry point do backend
│   ├── config/
│   │   └── extensions.py               # Instâncias globais
│   ├── models/
│   │   ├── produto.py                  # Modelo Produto (dataclass)
│   │   └── recibo.py                   # Modelo Recibo (dataclass)
│   ├── structures/
│   │   ├── array_carrinho.py           # Array + Tabela Hash integrados
│   │   ├── pilha_acoes.py              # Pilha para desfazer
│   │   ├── lista_encadeada.py          # Lista para histórico
│   │   ├── no.py                       # Nó da lista encadeada
│   │   └── tabela_hash.py              # Tabela Hash com encadeamento
│   ├── services/
│   │   ├── carrinho_service.py         # Lógica do carrinho
│   │   ├── historico_service.py        # Lógica do histórico
│   │   ├── desfazer_service.py         # Lógica do desfazer
│   │   └── finalizar_service.py        # Lógica da finalização
│   ├── routes/
│   │   ├── carrinho_routes.py          # Rotas /api/carrinho
│   │   ├── historico_routes.py         # Rotas /api/historico
│   │   ├── desfazer_routes.py          # Rotas /api/desfazer
│   │   └── finalizar_routes.py         # Rotas /api/finalizar
│   └── utils/
│       ├── logger.py                   # Configuração de logs
│       ├── responses.py                # Padrão de respostas
│       ├── validators.py               # Validações de dados
│       ├── busca_service.py            # Normalização de texto
│       └── ordenacao_service.py        # Configurações de ordenação
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── src/
        ├── main.jsx                    # Entry point do frontend
        ├── App.jsx                     # Componente principal
        ├── index.css                   # Estilos globais
        ├── pages/
        │   └── HomePage.jsx            # Página principal
        ├── components/
        │   ├── FormProduto.jsx         # Formulário de cadastro
        │   ├── ListaCarrinho.jsx       # Lista de produtos
        │   ├── ResumoCarrinho.jsx      # Cards de resumo
        │   ├── FiltrosCarrinho.jsx     # Busca e ordenação
        │   ├── ArrayVisual.jsx         # Visualização do Array
        │   ├── HashVisual.jsx          # Visualização da Tabela Hash
        │   ├── PilhaVisual.jsx         # Visualização da Pilha
        │   ├── HistoricoCompras.jsx    # Histórico com lista encadeada
        │   ├── ReciboCompra.jsx        # Recibo de compra
        │   └── ui/                     # Componentes UI reutilizáveis
        │       ├── Card.jsx
        │       ├── Button.jsx
        │       ├── Input.jsx
        │       └── Badge.jsx
        ├── context/
        │   └── AppContext.jsx          # Estado global da aplicação
        ├── services/
        │   └── api.js                  # Cliente de API
        ├── hooks/                      # (Reservado para futuros hooks)
        ├── animations/
        │   └── index.js                # Variantes de animação
        └── utils/
            └── formatters.js           # Funções de formatação
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Python 3.8+** instalado
- **Node.js 16+** instalado
- **Git** (para clonar o repositório)

### 1. Clonar o Repositório

```bash
git clone https://github.com/LuUuFe/project-ed.git
cd project-ed
```

### 2. Configurar o Backend

```bash
# Entrar na pasta do backend
cd backend

# Criar ambiente virtual (opcional, mas recomendado)
python -m venv venv

# Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Instalar dependências
pip install Flask==2.3.3 flask-cors==4.0.1

# OU instalar com requirements.txt
pip install -r requirements.txt

# Iniciar o servidor
python app.py
```

O backend estará rodando em `http://localhost:5000`

### 3. Configurar o Frontend

```bash
# Em um novo terminal, entrar na pasta do frontend
cd frontend

# Instalar dependências
npm install

# OU instalar manualmente (se necessário)
npm install react react-dom framer-motion lucide-react @radix-ui/react-slot
npm install -D @types/react @types/react-dom @vitejs/plugin-react autoprefixer postcss tailwindcss vite

# Iniciar o servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

### 4. Acessar o Sistema

Abra o navegador e acesse: `http://localhost:5173`

---

## 🧪 Como Testar

### Fluxo Básico
1. **Adicionar produtos** - Preencha o formulário e clique em "Adicionar ao Carrinho"
2. **Verificar estruturas** - Observe o Array e a Tabela Hash sendo atualizados
3. **Buscar e ordenar** - Use os filtros para encontrar produtos
4. **Remover produto** - Clique no "×" ao lado do produto
5. **Desfazer ação** - Clique em "Desfazer" para reverter a última operação
6. **Finalizar compra** - Clique em "Finalizar Compra" e confirme
7. **Ver histórico** - As compras aparecem no histórico com estrutura de lista encadeada

### Teste da Tabela Hash
- Adicione **10 produtos** para ver o Bucket 0 sendo utilizado
- Adicione **11 produtos** para ver uma **colisão** no Bucket 1
- Observe como a tabela hash usa **encadeamento** para resolver colisões

### Teste da Pilha
- Adicione e remova produtos para ver a pilha crescer
- Clique em "Desfazer" para desempilhar ações
- Observe o indicador visual da pilha

---

## 📊 Estruturas de Dados em Detalhe

### 1. Array Dinâmico (`ArrayCarrinho`)
- **Propósito:** Manter ordem de cadastro dos produtos
- **Operações:** Inserção, remoção, busca, ordenação
- **Complexidade:** O(1) inserção no final, O(n) remoção

### 2. Tabela Hash (`TabelaHash`)
- **Propósito:** Busca rápida de produtos por ID
- **Função Hash:** `hash(ID) % tamanho` (tamanho = 10)
- **Colisões:** Tratadas com encadeamento (lista ligada)
- **Complexidade:** O(1) em média, O(n) no pior caso

### 3. Pilha (`PilhaAcoes`)
- **Propósito:** Armazenar ações para desfazer
- **Operações:** Empilhar (push), Desempilhar (pop)
- **Complexidade:** O(1) para ambas operações

### 4. Lista Encadeada (`ListaEncadeada`)
- **Propósito:** Armazenar histórico de compras
- **Inserção:** Na cabeça (mais recente primeiro)
- **Complexidade:** O(1) para inserção, O(n) para percorrer

---

## 🎨 Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Fundo principal | `#0d0d12` | Background da aplicação |
| Superfície | `#181820` | Cards e componentes |
| Bordas | `#2a2a35` | Divisórias e contornos |
| Destaque (Accent) | `#f0c040` | Botões principais, títulos |
| Sucesso | `#4cd964` | Finalizar compra, status OK |
| Perigo | `#ff6b6b` | Remover produtos, erros |
| Texto principal | `#ffffff` | Títulos e textos importantes |
| Texto secundário | `#a1a1aa` | Descrições e labels |

---

## 📝 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/carrinho` | Listar produtos do carrinho |
| GET | `/api/carrinho/buscar` | Listar com filtros (busca/ordenação) |
| POST | `/api/carrinho` | Adicionar produto |
| DELETE | `/api/carrinho/<id>` | Remover produto |
| POST | `/api/desfazer` | Desfazer última ação |
| POST | `/api/finalizar` | Finalizar compra |
| GET | `/api/historico` | Listar histórico de compras |

### Exemplo de Requisição - Adicionar Produto

```json
POST /api/carrinho
{
    "nome": "Teclado Mecânico",
    "preco": 250.00,
    "quantidade": 2,
    "estoque": 10
}
```

### Exemplo de Resposta - Listar Carrinho

```json
{
    "produtos": [
        {"id": 1, "nome": "Teclado", "preco": 250.00, "quantidade": 2, "estoque": 10}
    ],
    "total": 500.00,
    "quantidade_itens": 1,
    "hash_buckets": [[], [{"id": 1, "nome": "Teclado"}], ...],
    "pilha_tamanho": 5
}
```

---

## 🔧 Troubleshooting

### Problema: "ModuleNotFoundError: No module named 'flask'"
```bash
# Certifique-se de que o Flask está instalado
pip install Flask==2.3.3 flask-cors==4.0.1
```

### Problema: "Error: Cannot find module 'react'"
```bash
# Instale as dependências do frontend
cd frontend
npm install
```

### Problema: CORS Error no navegador
- O backend já está configurado com `CORS(app)`, então deve funcionar
- Verifique se o backend está rodando em `http://localhost:5000`

### Problema: Porta 5000 já em uso
```bash
# Altere a porta no arquivo app.py
app.run(debug=True, port=5001)
```

---

## 📚 Referências Acadêmicas

- **Cormen, T. H.** et al. *Algoritmos: Teoria e Prática*. 3ª ed. Elsevier, 2012.
- **Sedgewick, R.** *Algorithms*. 4ª ed. Addison-Wesley, 2011.
- Material didático da disciplina de Estrutura de Dados.

---

## 🏆 Créditos

- **Professor:** Carlos Roberto dos Santos Junior
- **Disciplina:** Estrutura de Dados
- **Instituição:** IFMS
- **Semestre:** 2026/01

---

## 📄 Licença

Este projeto é de uso acadêmico e educacional. Não deve ser utilizado para fins comerciais.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie sua branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

---

**Desenvolvido com ❤️ para a disciplina de Estrutura de Dados**