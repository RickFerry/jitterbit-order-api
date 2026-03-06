# 📚 Documentação da API

## Base URL
```
http://localhost:3000/api
```

## Autenticação
Atualmente a API não requer autenticação. Em produção, considerar adicionar JWT ou API Keys.

---

## Endpoints

### 1. Health Check

**Descrição:** Verifica se a API está rodando

**Endpoint:** `GET /`

**Resposta de Sucesso (200):**
```json
{
  "mensagem": "API Jitterbit - Gerenciamento de Pedidos",
  "versao": "1.0.0"
}
```

---

### 2. Criar Pedido

**Descrição:** Cria um novo pedido no sistema

**Endpoint:** `POST /api/order`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON em Português):**
```json
{
  "numeroPedido": "ORD-2024-001",
  "valorTotal": 350.75,
  "dataCriacao": "2024-01-15T10:30:00Z",
  "itens": [
    {
      "codigoProduto": "LAPTOP-HP-001",
      "quantidade": 1,
      "preco": 250.00
    },
    {
      "codigoProduto": "MOUSE-LOG-002",
      "quantidade": 2,
      "preco": 50.25
    }
  ]
}
```

**Campos Obrigatórios:**
- `numeroPedido` (String): Identificador único do pedido
- `valorTotal` (Number): Valor total do pedido
- `itens` (Array): Lista de itens do pedido
  - `codigoProduto` (String): Código do produto
  - `quantidade` (Number): Quantidade do produto
  - `preco` (Number): Preço unitário do produto

**Campos Opcionais:**
- `dataCriacao` (Date): Data de criação (padrão: data/hora atual)

**Resposta de Sucesso (201 Created):**
```json
{
  "mensagem": "Pedido criado com sucesso",
  "pedido": {
    "numeroPedido": "ORD-2024-001",
    "valorTotal": 350.75,
    "dataCriacao": "2024-01-15T10:30:00.000Z",
    "itens": [
      {
        "codigoProduto": "LAPTOP-HP-001",
        "quantidade": 1,
        "preco": 250.00
      },
      {
        "codigoProduto": "MOUSE-LOG-002",
        "quantidade": 2,
        "preco": 50.25
      }
    ]
  }
}
```

**Resposta de Erro (400 Bad Request):**
```json
{
  "erro": "Número de pedido já existe"
}
```

---

### 3. Buscar Pedido por ID

**Descrição:** Retorna um pedido específico pelo número do pedido

**Endpoint:** `GET /api/order/:id`

**Parâmetros de URL:**
- `id` (String): Número do pedido (ex: ORD-2024-001)

**Exemplo de Requisição:**
```
GET /api/order/ORD-2024-001
```

**Resposta de Sucesso (200 OK):**
```json
{
  "numeroPedido": "ORD-2024-001",
  "valorTotal": 350.75,
  "dataCriacao": "2024-01-15T10:30:00.000Z",
  "itens": [
    {
      "codigoProduto": "LAPTOP-HP-001",
      "quantidade": 1,
      "preco": 250.00
    }
  ]
}
```

**Resposta de Erro (404 Not Found):**
```json
{
  "erro": "Pedido não encontrado"
}
```

---

### 4. Listar Todos os Pedidos

**Descrição:** Retorna todos os pedidos cadastrados, ordenados por data de criação (mais recentes primeiro)

**Endpoint:** `GET /api/order/list`

**Resposta de Sucesso (200 OK):**
```json
{
  "total": 2,
  "pedidos": [
    {
      "numeroPedido": "ORD-2024-002",
      "valorTotal": 1250.00,
      "dataCriacao": "2024-01-16T14:45:00.000Z",
      "itens": ["..."]
    },
    {
      "numeroPedido": "ORD-2024-001",
      "valorTotal": 350.75,
      "dataCriacao": "2024-01-15T10:30:00.000Z",
      "itens": ["..."]
    }
  ]
}
```

**Resposta quando não há pedidos:**
```json
{
  "total": 0,
  "pedidos": []
}
```

---

### 5. Atualizar Pedido

**Descrição:** Atualiza um pedido existente

**Endpoint:** `PUT /api/order/:id`

**Parâmetros de URL:**
- `id` (String): Número do pedido a ser atualizado

**Headers:**
```
Content-Type: application/json
```

**Body (JSON em Português):**
```json
{
  "numeroPedido": "ORD-2024-001",
  "valorTotal": 400.00,
  "dataCriacao": "2024-01-15T10:30:00Z",
  "itens": [
    {
      "codigoProduto": "LAPTOP-HP-001",
      "quantidade": 1,
      "preco": 250.00
    },
    {
      "codigoProduto": "MOUSE-LOG-002",
      "quantidade": 3,
      "preco": 50.00
    }
  ]
}
```

**Resposta de Sucesso (200 OK):**
```json
{
  "mensagem": "Pedido atualizado com sucesso",
  "pedido": {
    "numeroPedido": "ORD-2024-001",
    "valorTotal": 400.00,
    "dataCriacao": "2024-01-15T10:30:00.000Z",
    "itens": ["..."]
  }
}
```

**Resposta de Erro (404 Not Found):**
```json
{
  "erro": "Pedido não encontrado"
}
```

**Resposta de Erro (400 Bad Request):**
```json
{
  "erro": "Mensagem de erro específica"
}
```

---

### 6. Deletar Pedido

**Descrição:** Remove um pedido do sistema

**Endpoint:** `DELETE /api/order/:id`

**Parâmetros de URL:**
- `id` (String): Número do pedido a ser deletado

**Exemplo de Requisição:**
```
DELETE /api/order/ORD-2024-001
```

**Resposta de Sucesso (200 OK):**
```json
{
  "mensagem": "Pedido deletado com sucesso",
  "numeroPedido": "ORD-2024-001"
}
```

**Resposta de Erro (404 Not Found):**
```json
{
  "erro": "Pedido não encontrado"
}
```

---

## Códigos de Status HTTP

| Código | Significado | Quando é usado |
|--------|-------------|----------------|
| 200 | OK | Sucesso em GET, PUT, DELETE |
| 201 | Created | Sucesso ao criar recurso (POST) |
| 400 | Bad Request | Dados inválidos ou número de pedido duplicado |
| 404 | Not Found | Pedido não encontrado |
| 500 | Internal Server Error | Erro no servidor |

---

## Transformação de Dados

A API recebe e retorna dados em **português**, mas armazena no banco de dados em **inglês**:

### Mapeamento de Campos

| Campo em Português (API) | Campo em Inglês (BD) |
|--------------------------|----------------------|
| numeroPedido | orderId |
| valorTotal | value |
| dataCriacao | creationDate |
| itens | items |
| codigoProduto | productId |
| quantidade | quantity |
| preco | price |

**Exemplo de transformação:**

**Input/Output (Português):**
```json
{
  "numeroPedido": "ORD-001",
  "valorTotal": 150.50,
  "itens": ["..."]
}
```

**Banco de Dados (Inglês):**
```json
{
  "orderId": "ORD-001",
  "value": 150.50,
  "items": ["..."]
}
```

---

## Exemplos de Uso

### cURL

**Criar pedido:**
```bash
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
        "preco": 75.25
      }
    ]
  }'
```

**Buscar pedido:**
```bash
curl http://localhost:3000/api/order/ORD-001
```

**Listar todos:**
```bash
curl http://localhost:3000/api/order/list
```

**Atualizar pedido:**
```bash
curl -X PUT http://localhost:3000/api/order/ORD-001 \
  -H "Content-Type: application/json" \
  -d '{...}'
```

**Deletar pedido:**
```bash
curl -X DELETE http://localhost:3000/api/order/ORD-001
```

### JavaScript (Fetch)

```javascript
// Criar pedido
const response = await fetch('http://localhost:3000/api/order', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    numeroPedido: 'ORD-001',
    valorTotal: 150.50,
    dataCriacao: new Date(),
    itens: [
      {
        codigoProduto: 'PROD-123',
        quantidade: 2,
        preco: 75.25
      }
    ]
  })
});

const data = await response.json();
console.log(data);
```

---

## Validações

### Pedido
- `numeroPedido`: Obrigatório, único, tipo String
- `valorTotal`: Obrigatório, tipo Number
- `dataCriacao`: Opcional (padrão: data atual), tipo Date
- `itens`: Obrigatório, tipo Array (mínimo 1 item)

### Item do Pedido
- `codigoProduto`: Obrigatório, tipo String
- `quantidade`: Obrigatório, tipo Number (deve ser positivo)
- `preco`: Obrigatório, tipo Number (deve ser positivo)

---

## Dicas de Uso

1. **Número de Pedido Único**: Cada pedido deve ter um `numeroPedido` único. Tente criar um pedido com número já existente resultará em erro 400.

2. **Formato de Data**: Use o formato ISO 8601 para datas (ex: `2024-01-15T10:30:00Z`)

3. **Cálculo de Valor Total**: O `valorTotal` deve ser calculado pela aplicação cliente somando (quantidade × preço) de todos os itens

4. **Ordenação**: A listagem de pedidos retorna os mais recentes primeiro

5. **Postman Collection**: Use o arquivo `postman_collection.json` para importar todos os endpoints no Postman

---

## Próximos Passos (Melhorias Futuras)

- [ ] Paginação na listagem de pedidos
- [ ] Filtros por data, valor, produto
- [ ] Autenticação JWT
- [ ] Rate limiting
- [ ] Webhooks para notificações
- [ ] Versionamento da API (v1, v2)
- [ ] Documentação Swagger/OpenAPI
- [ ] Cache com Redis
- [ ] Logs estruturados

---

## Suporte

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Consulte o arquivo `README.md`
- Leia o arquivo `QUICK_START.md`

