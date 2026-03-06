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

  const mockOrderPT = {
    numeroPedido: 'ORD-001',
    valorTotal: 150.50,
    dataCriacao: new Date('2024-01-15'),
    itens: [
      {
        codigoProduto: 'PROD-123',
        quantidade: 2,
        preco: 50.25
      },
      {
        codigoProduto: 'PROD-456',
        quantidade: 1,
        preco: 50.00
      }
    ]
  };

  describe('POST /api/order', () => {
    it('deve criar um pedido com sucesso e retornar status 201', async () => {
      const response = await request(app)
        .post('/api/order')
        .send(mockOrderPT)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toHaveProperty('mensagem');
      expect(response.body).toHaveProperty('pedido');
      expect(response.body.pedido.numeroPedido).toBe('ORD-001');
      expect(response.body.pedido.valorTotal).toBe(150.50);
    });

    it('deve retornar erro 400 ao tentar criar pedido com número duplicado', async () => {
      // Criar primeiro pedido
      await request(app)
        .post('/api/order')
        .send(mockOrderPT);

      // Tentar criar com mesmo número
      const response = await request(app)
        .post('/api/order')
        .send(mockOrderPT)
        .expect(400);

      expect(response.body).toHaveProperty('erro');
    });

    it('deve transformar dados de PT para EN no banco de dados', async () => {
      await request(app)
        .post('/api/order')
        .send(mockOrderPT);

      const orderInDB = await Order.findOne({ orderId: 'ORD-001' });

      expect(orderInDB).toBeDefined();
      expect(orderInDB.orderId).toBe('ORD-001');
      expect(orderInDB.value).toBe(150.50);
      expect(orderInDB.items).toHaveLength(2);
      expect(orderInDB.items[0].productId).toBe('PROD-123');
    });
  });

  describe('GET /api/order/:id', () => {
    it('deve retornar um pedido específico com status 200', async () => {
      // Criar pedido primeiro
      await request(app)
        .post('/api/order')
        .send(mockOrderPT);

      // Buscar pedido
      const response = await request(app)
        .get('/api/order/ORD-001')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.numeroPedido).toBe('ORD-001');
      expect(response.body.valorTotal).toBe(150.50);
    });

    it('deve retornar 404 para pedido não encontrado', async () => {
      const response = await request(app)
        .get('/api/order/ORD-999')
        .expect(404);

      expect(response.body).toHaveProperty('erro');
    });
  });

  describe('GET /api/order/list', () => {
    it('deve retornar lista de todos os pedidos com status 200', async () => {
      // Criar múltiplos pedidos
      await request(app)
        .post('/api/order')
        .send(mockOrderPT);

      const order2 = { ...mockOrderPT, numeroPedido: 'ORD-002' };
      await request(app)
        .post('/api/order')
        .send(order2);

      // Buscar lista
      const response = await request(app)
        .get('/api/order/list')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('pedidos');
      expect(response.body.total).toBe(2);
      expect(response.body.pedidos).toHaveLength(2);
    });

    it('deve retornar lista vazia quando não há pedidos', async () => {
      const response = await request(app)
        .get('/api/order/list')
        .expect(200);

      expect(response.body.total).toBe(0);
      expect(response.body.pedidos).toHaveLength(0);
    });
  });

  describe('PUT /api/order/:id', () => {
    it('deve atualizar um pedido com sucesso e retornar status 200', async () => {
      // Criar pedido
      await request(app)
        .post('/api/order')
        .send(mockOrderPT);

      // Atualizar pedido
      const updatedOrder = {
        ...mockOrderPT,
        valorTotal: 200.00
      };

      const response = await request(app)
        .put('/api/order/ORD-001')
        .send(updatedOrder)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('mensagem');
      expect(response.body.pedido.valorTotal).toBe(200.00);
    });

    it('deve retornar 404 ao tentar atualizar pedido inexistente', async () => {
      const response = await request(app)
        .put('/api/order/ORD-999')
        .send(mockOrderPT)
        .expect(404);

      expect(response.body).toHaveProperty('erro');
    });
  });

  describe('DELETE /api/order/:id', () => {
    it('deve deletar um pedido com sucesso e retornar status 200', async () => {
      // Criar pedido
      await request(app)
        .post('/api/order')
        .send(mockOrderPT);

      // Deletar pedido
      const response = await request(app)
        .delete('/api/order/ORD-001')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('mensagem');
      expect(response.body.numeroPedido).toBe('ORD-001');

      // Verificar que foi deletado
      const orderInDB = await Order.findOne({ orderId: 'ORD-001' });
      expect(orderInDB).toBeNull();
    });

    it('deve retornar 404 ao tentar deletar pedido inexistente', async () => {
      const response = await request(app)
        .delete('/api/order/ORD-999')
        .expect(404);

      expect(response.body).toHaveProperty('erro');
    });
  });
});

