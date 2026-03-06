# 🚀 Guia Rápido de Setup

## Pré-requisitos

- Node.js v18+ instalado
- MongoDB instalado localmente OU conta no MongoDB Atlas
- Git instalado

## Setup Rápido (5 minutos)

### 1️⃣ Instalar dependências
```bash
npm install
```

### 2️⃣ Configurar MongoDB

**Opção A - MongoDB Atlas (Recomendado - Grátis):**
1. Acesse: https://www.mongodb.com/cloud/atlas/register
2. Crie um cluster gratuito (M0)
3. Crie um usuário de banco de dados
4. Libere o acesso (IP: 0.0.0.0/0 para teste)
5. Pegue a string de conexão
6. Edite o arquivo `.env` e cole a string de conexão

**Opção B - MongoDB Local:**
```bash
# Ubuntu/Debian
sudo apt-get install mongodb
sudo systemctl start mongodb
# A URL padrão já está no .env: mongodb://localhost:27017/jitterbit-orders
```

### 3️⃣ Rodar o servidor
```bash
npm run dev
```

Pronto! API rodando em: http://localhost:3000

### 4️⃣ Testar rapidamente
```bash
# Teste 1: Health Check
curl http://localhost:3000/

# Teste 2: Criar um pedido
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

# Teste 3: Listar pedidos
curl http://localhost:3000/api/order/list
```

## 🧪 Rodar Testes
```bash
npm test
```

## 📤 Subir para GitHub

```bash
# 1. Inicializar repositório (se ainda não fez)
git init

# 2. Adicionar arquivos
git add .

# 3. Commit inicial
git commit -m "feat: implementa API RESTful de gerenciamento de pedidos"

# 4. Criar repositório no GitHub
# Acesse: https://github.com/new
# NÃO inicialize com README

# 5. Conectar com repositório remoto
git remote add origin https://github.com/SEU-USUARIO/jitterbit-order-api.git

# 6. Enviar código
git branch -M main
git push -u origin main
```

## 📋 Checklist de Verificação

- [ ] Dependências instaladas (`npm install`)
- [ ] MongoDB configurado no `.env`
- [ ] Servidor iniciando sem erros (`npm run dev`)
- [ ] Endpoint raiz respondendo (GET /)
- [ ] Criar pedido funcionando (POST /api/order)
- [ ] Listar pedidos funcionando (GET /api/order/list)
- [ ] Testes passando (`npm test`)
- [ ] Código no GitHub

## 🆘 Problemas Comuns

### Erro: "connect ECONNREFUSED"
- MongoDB não está rodando ou URL incorreta no `.env`
- Solução: Verifique se MongoDB está ativo ou use MongoDB Atlas

### Erro: "Port 3000 is already in use"
- Outra aplicação usando a porta 3000
- Solução: Mude a porta no `.env` para PORT=3001

### Testes falhando
- MongoDB de teste não conectado
- Solução: Verifique conexão no arquivo `.env`

## 📖 Documentação Completa

Leia o arquivo `README.md` para documentação completa da API.

## ✨ Recursos Extras

- **Postman Collection**: Importe o arquivo `postman_collection.json` no Postman
- **Testes Unitários**: 15+ testes cobrindo todos os endpoints
- **Transformação de Dados**: Português ↔ Inglês automática

---

💡 **Dica**: Usar o Postman para testar visualmente todos os endpoints!

