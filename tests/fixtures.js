// Exemplos de Pedidos para Teste - Formato conforme requisito Jitterbit

// Pedido Completo 1
const pedido1 = {
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    },
    {
      "idItem": "2435",
      "quantidadeItem": 9,
      "valorItem": 1000
    }
  ]
};

// Pedido Completo 2
const pedido2 = {
  "numeroPedido": "v10089016vdb-02",
  "valorTotal": 4500,
  "dataCriacao": "2023-07-20T14:45:00.000Z",
  "items": [
    {
      "idItem": "3001",
      "quantidadeItem": 2,
      "valorItem": 1500
    },
    {
      "idItem": "3002",
      "quantidadeItem": 3,
      "valorItem": 500
    }
  ]
};

// Pedido Simples
const pedidoSimples = {
  "numeroPedido": "v10089017vdb-03",
  "valorTotal": 999,
  "dataCriacao": "2023-07-21T09:00:00.000Z",
  "items": [
    {
      "idItem": "1001",
      "quantidadeItem": 1,
      "valorItem": 999
    }
  ]
};

// Pedido com Múltiplos Itens
const pedidoMultiplo = {
  "numeroPedido": "v10089018vdb-04",
  "valorTotal": 25999,
  "dataCriacao": "2023-07-22T16:20:00.000Z",
  "items": [
    {
      "idItem": "5001",
      "quantidadeItem": 1,
      "valorItem": 18990
    },
    {
      "idItem": "5002",
      "quantidadeItem": 1,
      "valorItem": 899
    },
    {
      "idItem": "5003",
      "quantidadeItem": 1,
      "valorItem": 2999
    },
    {
      "idItem": "5004",
      "quantidadeItem": 3,
      "valorItem": 1037
    }
  ]
};

module.exports = {
  pedido1,
  pedido2,
  pedidoSimples,
  pedidoMultiplo
};

