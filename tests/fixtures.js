// Exemplos de Pedidos para Teste

// Pedido Completo 1
const pedido1 = {
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
};

// Pedido Completo 2
const pedido2 = {
  "numeroPedido": "ORD-2024-002",
  "valorTotal": 1250.00,
  "dataCriacao": "2024-01-16T14:45:00Z",
  "itens": [
    {
      "codigoProduto": "MONITOR-LG-001",
      "quantidade": 2,
      "preco": 450.00
    },
    {
      "codigoProduto": "TECLADO-MECH-001",
      "quantidade": 1,
      "preco": 350.00
    }
  ]
};

// Pedido Simples
const pedidoSimples = {
  "numeroPedido": "ORD-2024-003",
  "valorTotal": 99.90,
  "dataCriacao": "2024-01-17T09:00:00Z",
  "itens": [
    {
      "codigoProduto": "WEBCAM-LOG-001",
      "quantidade": 1,
      "preco": 99.90
    }
  ]
};

// Pedido com Múltiplos Itens
const pedidoMultiplo = {
  "numeroPedido": "ORD-2024-004",
  "valorTotal": 2599.50,
  "dataCriacao": "2024-01-18T16:20:00Z",
  "itens": [
    {
      "codigoProduto": "NOTEBOOK-DELL-XPS",
      "quantidade": 1,
      "preco": 1899.00
    },
    {
      "codigoProduto": "MOUSE-PAD-RGB",
      "quantidade": 1,
      "preco": 89.90
    },
    {
      "codigoProduto": "HEADSET-GAMER",
      "quantidade": 1,
      "preco": 299.90
    },
    {
      "codigoProduto": "CABO-USB-C",
      "quantidade": 3,
      "preco": 103.57
    }
  ]
};

module.exports = {
  pedido1,
  pedido2,
  pedidoSimples,
  pedidoMultiplo
};

