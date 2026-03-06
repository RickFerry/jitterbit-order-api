const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// CREATE - Criar novo pedido
router.post('/order', orderController.createOrder);

// READ ONE - Buscar pedido por ID
router.get('/order/:id', orderController.getOrderById);

// READ ALL - Listar todos os pedidos
router.get('/order/list', orderController.getAllOrders);

// UPDATE - Atualizar pedido
router.put('/order/:id', orderController.updateOrder);

// DELETE - Deletar pedido
router.delete('/order/:id', orderController.deleteOrder);

module.exports = router;

