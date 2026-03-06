const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Order = require('../src/models/Order');

// Conectar ao banco de dados de teste
beforeAll(async () => {
  const MONGODB_URI_TEST = process.env.MONGODB_URI || 'mongodb://localhost:27017/jitterbit-orders-test';
  await mongoose.connect(MONGODB_URI_TEST);
});

// Limpar banco de dados após cada teste
afterEach(async () => {
  await Order.deleteMany({});
});

// Desconectar após todos os testes
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Order API Tests', () => {

  // Mock de pedido conforme requisito do teste Jitterbit
  const mockOrderPT = {
    numeroPedido: 'v10089015vdb-01',
    valorTotal: 10000,
    dataCriacao: '2023-07-19T12:24:11.5299601+00:00',
    items: [
      {
        idItem: '2434',
        quantidadeItem: 1,
        valorItem: 1000
      },
      {
        idItem: '2435',
        quantidadeItem: 2,
        valorItem: 4500
      }
    ]
  };

  describe('POST /order', () => {
    it('deve criar um pedido com sucesso e retornar status 201', async () => {
      const response = await request(app)
        .post('/order')
        .send(mockOrderPT)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toHaveProperty('mensagem');
      expect(response.body).toHaveProperty('pedido');
      expect(response.body.pedido.numeroPedido).toBe('v10089015vdb-01');
      expect(response.body.pedido.valorTotal).toBe(10000);
    });

    it('deve retornar erro 400 ao tentar criar pedido com número duplicado', async () => {
      // Criar primeiro pedido
      await request(app)
        .post('/order')
        .send(mockOrderPT);

      // Tentar criar com mesmo número
      const response = await request(app)
        .post('/order')
        .send(mockOrderPT)
        .expect(400);

      expect(response.body).toHaveProperty('erro');
    });

    it('deve transformar dados de PT para EN no banco de dados', async () => {
      await request(app)
        .post('/order')
        .send(mockOrderPT);

      const orderInDB = await Order.findOne({ orderId: 'v10089015vdb-01' });

      expect(orderInDB).toBeDefined();
      expect(orderInDB.orderId).toBe('v10089015vdb-01');
      expect(orderInDB.value).toBe(10000);
      expect(orderInDB.items).toHaveLength(2);
      expect(orderInDB.items[0].productId).toBe(2434);
      expect(typeof orderInDB.items[0].productId).toBe('number');
    });
  });

  describe('GET /order/:id', () => {
    it('deve retornar um pedido específico com status 200', async () => {
      // Criar pedido primeiro
      await request(app)
        .post('/order')
        .send(mockOrderPT);

      // Buscar pedido
      const response = await request(app)
        .get('/order/v10089015vdb-01')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.numeroPedido).toBe('v10089015vdb-01');
      expect(response.body.valorTotal).toBe(10000);
    });

    it('deve retornar 404 para pedido não encontrado', async () => {
      const response = await request(app)
        .get('/order/ORD-999')
        .expect(404);

      expect(response.body).toHaveProperty('erro');
    });
  });

  describe('GET /order/list', () => {
    it('deve retornar lista de todos os pedidos com status 200', async () => {
      // Criar múltiplos pedidos
      await request(app)
        .post('/order')
        .send(mockOrderPT);

      const order2 = { ...mockOrderPT, numeroPedido: 'v10089016vdb-02' };
      await request(app)
        .post('/order')
        .send(order2);

      // Buscar lista
      const response = await request(app)
        .get('/order/list')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('pedidos');
      expect(response.body.total).toBe(2);
      expect(response.body.pedidos).toHaveLength(2);
    });

    it('deve retornar lista vazia quando não há pedidos', async () => {
      const response = await request(app)
        .get('/order/list')
        .expect(200);

      expect(response.body.total).toBe(0);
      expect(response.body.pedidos).toHaveLength(0);
    });
  });

  describe('PUT /order/:id', () => {
    it('deve atualizar um pedido com sucesso e retornar status 200', async () => {
      // Criar pedido
      await request(app)
        .post('/order')
        .send(mockOrderPT);

      // Atualizar pedido
      const updatedOrder = {
        ...mockOrderPT,
        valorTotal: 20000
      };

      const response = await request(app)
        .put('/order/v10089015vdb-01')
        .send(updatedOrder)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('mensagem');
      expect(response.body.pedido.valorTotal).toBe(20000);
    });

    it('deve retornar 404 ao tentar atualizar pedido inexistente', async () => {
      const response = await request(app)
        .put('/order/ORD-999')
        .send(mockOrderPT)
        .expect(404);

      expect(response.body).toHaveProperty('erro');
    });
  });

  describe('DELETE /order/:id', () => {
    it('deve deletar um pedido com sucesso e retornar status 200', async () => {
      // Criar pedido
      await request(app)
        .post('/order')
        .send(mockOrderPT);

      // Deletar pedido
      const response = await request(app)
        .delete('/order/v10089015vdb-01')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('mensagem');
      expect(response.body.numeroPedido).toBe('v10089015vdb-01');

      // Verificar que foi deletado
      const orderInDB = await Order.findOne({ orderId: 'v10089015vdb-01' });
      expect(orderInDB).toBeNull();
    });

    it('deve retornar 404 ao tentar deletar pedido inexistente', async () => {
      const response = await request(app)
        .delete('/order/ORD-999')
        .expect(404);

      expect(response.body).toHaveProperty('erro');
    });
  });
});

