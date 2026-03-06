#!/bin/bash

# Script para testar a API rapidamente
# Execute: ./test-api.sh

echo "🧪 Testando Jitterbit Order API..."
echo ""

BASE_URL="http://localhost:3000"

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para verificar se API está rodando
check_api() {
    echo -e "${YELLOW}📡 Verificando se API está rodando...${NC}"
    response=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL)

    if [ $response -eq 200 ]; then
        echo -e "${GREEN}✅ API está rodando!${NC}"
        echo ""
        return 0
    else
        echo -e "${RED}❌ API não está rodando. Inicie com: npm run dev${NC}"
        exit 1
    fi
}

# Teste 1: Health Check
test_health() {
    echo -e "${YELLOW}Teste 1: Health Check${NC}"
    curl -s $BASE_URL | jq '.'
    echo ""
}

# Teste 2: Criar Pedido
test_create() {
    echo -e "${YELLOW}Teste 2: Criar Pedido${NC}"
    curl -s -X POST $BASE_URL/api/order \
        -H "Content-Type: application/json" \
        -d '{
            "numeroPedido": "ORD-TEST-001",
            "valorTotal": 299.90,
            "dataCriacao": "2026-03-06T10:00:00Z",
            "itens": [
                {
                    "codigoProduto": "PROD-123",
                    "quantidade": 2,
                    "preco": 99.95
                },
                {
                    "codigoProduto": "PROD-456",
                    "quantidade": 1,
                    "preco": 100.00
                }
            ]
        }' | jq '.'
    echo ""
}

# Teste 3: Buscar Pedido
test_get() {
    echo -e "${YELLOW}Teste 3: Buscar Pedido por ID${NC}"
    curl -s $BASE_URL/api/order/ORD-TEST-001 | jq '.'
    echo ""
}

# Teste 4: Listar Pedidos
test_list() {
    echo -e "${YELLOW}Teste 4: Listar Todos os Pedidos${NC}"
    curl -s $BASE_URL/api/order/list | jq '.'
    echo ""
}

# Teste 5: Atualizar Pedido
test_update() {
    echo -e "${YELLOW}Teste 5: Atualizar Pedido${NC}"
    curl -s -X PUT $BASE_URL/api/order/ORD-TEST-001 \
        -H "Content-Type: application/json" \
        -d '{
            "numeroPedido": "ORD-TEST-001",
            "valorTotal": 399.90,
            "dataCriacao": "2026-03-06T10:00:00Z",
            "itens": [
                {
                    "codigoProduto": "PROD-123",
                    "quantidade": 3,
                    "preco": 99.95
                },
                {
                    "codigoProduto": "PROD-456",
                    "quantidade": 1,
                    "preco": 100.00
                }
            ]
        }' | jq '.'
    echo ""
}

# Teste 6: Deletar Pedido
test_delete() {
    echo -e "${YELLOW}Teste 6: Deletar Pedido${NC}"
    curl -s -X DELETE $BASE_URL/api/order/ORD-TEST-001 | jq '.'
    echo ""
}

# Executar todos os testes
main() {
    check_api

    echo "========================================"
    echo "   EXECUTANDO TESTES DA API"
    echo "========================================"
    echo ""

    test_health
    echo "----------------------------------------"

    test_create
    echo "----------------------------------------"

    test_get
    echo "----------------------------------------"

    test_list
    echo "----------------------------------------"

    test_update
    echo "----------------------------------------"

    test_delete
    echo "----------------------------------------"

    echo ""
    echo -e "${GREEN}✅ Todos os testes concluídos!${NC}"
    echo ""
    echo "💡 Dica: Verifique os resultados acima para confirmar que todos os endpoints estão funcionando."
}

# Verificar se jq está instalado
if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}⚠️  'jq' não está instalado. Instale para melhor visualização:${NC}"
    echo "   Ubuntu/Debian: sudo apt-get install jq"
    echo "   MacOS: brew install jq"
    echo ""
    echo "Continuando sem formatação JSON..."
    echo ""
fi

# Executar
main

