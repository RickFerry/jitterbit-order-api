# 🛍️ Jitterbit Order API

API RESTful desenvolvida em Node.js com Express e MongoDB para gerenciamento completo de pedidos (CRUD).

## 📋 Características

- ✅ **CRUD Completo**: Create, Read, Update, Delete
- 🔄 **Transformação de Dados**: Recebe dados em português e armazena em inglês
- 🏗️ **Arquitetura MVC**: Código organizado e escalável
- ✨ **Testes Unitários**: Cobertura com Jest e Supertest
- 📦 **MongoDB**: Banco de dados NoSQL
- 🚀 **Status HTTP Corretos**: 201, 200, 404, 400, 500

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados
- **Mongoose** - ODM para MongoDB
- **Jest** - Framework de testes
- **Supertest** - Testes de API HTTP
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📁 Estrutura do Projeto

```
jitterbit-order-api/
├── src/
│   ├── config/
│   │   └── database.js       # Configuração do MongoDB
│   ├── controllers/
│   │   └── orderController.js # Lógica de negócio e transformação
│   ├── models/
│   │   └── Order.js          # Schema do MongoDB
│   ├── routes/
│   │   └── orderRoutes.js    # Definição das rotas
│   └── app.js                # Configuração do Express
├── tests/
│   └── order.test.js         # Testes unitários
├── .env                       # Variáveis de ambiente
├── .gitignore                 # Arquivos ignorados pelo Git
├── server.js                  # Ponto de entrada da aplicação
├── package.json               # Dependências e scripts
└── README.md                  # Documentação
```

## 🚀 Como Executar

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd jitterbit-order-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Edite o arquivo `.env` com sua string de conexão do MongoDB:

```env
MONGODB_URI=mongodb://localhost:27017/jitterbit-orders
# ou MongoDB Atlas:
# MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/jitterbit-orders

PORT=3000
```

### 4. Execute o servidor

**Modo desenvolvimento (com auto-reload):**
```bash
npm run dev
```

**Modo produção:**
```bash
npm start
```

O servidor estará rodando em: `http://localhost:3000`

## 🧪 Executar Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch
```

## 📡 Endpoints da API

### Base URL: `http://localhost:3000`

### 1. **Criar Pedido**
```http
POST /order
Content-Type: application/json

{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

**Resposta (201 Created):**
```json
{
  "mensagem": "Pedido criado com sucesso",
  "pedido": {
    "numeroPedido": "v10089015vdb-01",
    "valorTotal": 10000,
    "dataCriacao": "2023-07-19T12:24:11.529Z",
    "items": [
      {
        "idItem": "2434",
        "quantidadeItem": 1,
        "valorItem": 1000
      }
    ]
  }
}
```

### 2. **Buscar Pedido por ID**
```http
GET /order/:id
```

**Exemplo:** `GET /order/v10089015vdb-01`

**Resposta (200 OK):**
```json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

### 3. **Listar Todos os Pedidos**
```http
GET /order/list
```

**Resposta (200 OK):**
```json
{
  "total": 2,
  "pedidos": [
    {
      "numeroPedido": "v10089015vdb-01",
      "valorTotal": 10000,
      "dataCriacao": "2023-07-19T12:24:11.529Z",
      "items": [...]
    }
  ]
}
```

### 4. **Atualizar Pedido**
```http
PUT /order/:id
Content-Type: application/json

{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 20000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 2,
      "valorItem": 2000
    }
  ]
}
```

**Resposta (200 OK):**
```json
{
  "mensagem": "Pedido atualizado com sucesso",
  "pedido": {
    "numeroPedido": "v10089015vdb-01",
    "valorTotal": 20000,
    "items": [...]
  }
}
```

### 5. **Deletar Pedido**
```http
DELETE /order/:id
```

**Exemplo:** `DELETE /order/v10089015vdb-01`

**Resposta (200 OK):**
```json
{
  "mensagem": "Pedido deletado com sucesso",
  "numeroPedido": "v10089015vdb-01"
}
```

## 🔄 Transformação de Dados

A API recebe dados em **português** e armazena no banco de dados em **inglês**:

| Português (Input/Output) | Inglês (Database) |
|--------------------------|-------------------|
| numeroPedido             | orderId           |
| valorTotal               | value             |
| dataCriacao              | creationDate      |
| itens                    | items             |
| codigoProduto            | productId         |
| quantidade               | quantity          |
| preco                    | price             |

## 🧰 Testando com Postman

1. Importe a collection ou crie requests manualmente
2. Configure a URL base: `http://localhost:3000/api`
3. Use os exemplos de JSON acima para testar cada endpoint

### Exemplo de teste com cURL:

```bash
# Criar pedido
curl -X POST http://localhost:3000/api/order \
  -H "Content-Type: application/json" \
  -d '{
    "numeroPedido": "ORD-001",
    "valorTotal": 150.50,
    "dataCriacao": "2024-01-15",
    "itens": [
      {
        "codigoProduto": "PROD-123",
        "quantidade": 2,
        "preco": 50.25
      }
    ]
  }'

# Listar pedidos
curl http://localhost:3000/api/order/list

# Buscar pedido específico
curl http://localhost:3000/api/order/ORD-001
```

## 🗄️ MongoDB Setup

### Opção 1: MongoDB Local

```bash
# Instalar MongoDB
# Ubuntu/Debian
sudo apt-get install mongodb

# Iniciar serviço
sudo systemctl start mongodb
```

### Opção 2: MongoDB Atlas (Recomendado)

1. Acesse [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie uma conta gratuita
3. Crie um cluster
4. Obtenha a string de conexão
5. Adicione ao arquivo `.env`

## 📝 Status HTTP

- `200 OK` - Sucesso em GET, PUT, DELETE
- `201 Created` - Sucesso ao criar recurso (POST)
- `400 Bad Request` - Dados inválidos ou duplicados
- `404 Not Found` - Recurso não encontrado
- `500 Internal Server Error` - Erro no servidor

## 🔐 Segurança

- Variáveis de ambiente para dados sensíveis
- Validação de dados com Mongoose
- IDs únicos para prevenir duplicação

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Commit suas mudanças: `git commit -m 'feat: adiciona nova feature'`
4. Push para a branch: `git push origin feature/nova-feature`
5. Abra um Pull Request

## 📄 Licença

ISC

## 👨‍💻 Autor

Desenvolvido como parte do teste técnico para Jitterbit

---

⭐ Se este projeto foi útil, deixe uma estrela!

