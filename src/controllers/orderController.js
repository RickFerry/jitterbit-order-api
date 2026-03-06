const Order = require('../models/Order');

// Função auxiliar para transformar dados conforme requisito
// INPUT: numeroPedido, valorTotal, dataCriacao, items[idItem, quantidadeItem, valorItem]
// OUTPUT: orderId, value, creationDate, items[productId, quantity, price]
const transformToEnglish = (data) => {
  return {
    orderId: data.numeroPedido,
    value: data.valorTotal,
    creationDate: data.dataCriacao || new Date(),
    items: data.items.map(item => ({
      productId: parseInt(item.idItem),  // Converte string para number
      quantity: item.quantidadeItem,
      price: item.valorItem
    }))
  };
};

// Função auxiliar para transformar dados de EN para PT (resposta)
const transformToPortuguese = (order) => {
  return {
    numeroPedido: order.orderId,
    valorTotal: order.value,
    dataCriacao: order.creationDate,
    items: order.items.map(item => ({
      idItem: item.productId.toString(),
      quantidadeItem: item.quantity,
      valorItem: item.price
    }))
  };
};

// CREATE - POST /order
exports.createOrder = async (req, res) => {
  try {
    // Recebe dados em português e transforma para inglês
    const orderData = transformToEnglish(req.body);

    const order = new Order(orderData);
    await order.save();

    // Retorna em português
    const response = transformToPortuguese(order);

    res.status(201).json({
      mensagem: 'Pedido criado com sucesso',
      pedido: response
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        erro: 'Número de pedido já existe'
      });
    }
    res.status(400).json({
      erro: error.message
    });
  }
};

// READ ONE - GET /order/:id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id });

    if (!order) {
      return res.status(404).json({
        erro: 'Pedido não encontrado'
      });
    }

    // Retorna em português
    const response = transformToPortuguese(order);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      erro: error.message
    });
  }
};

// READ ALL - GET /order/list
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ creationDate: -1 });

    // Retorna todos em português
    const response = orders.map(order => transformToPortuguese(order));

    res.status(200).json({
      total: orders.length,
      pedidos: response
    });
  } catch (error) {
    res.status(500).json({
      erro: error.message
    });
  }
};

// UPDATE - PUT /order/:id
exports.updateOrder = async (req, res) => {
  try {
    // Recebe dados em português e transforma para inglês
    const orderData = transformToEnglish(req.body);

    const order = await Order.findOneAndUpdate(
      { orderId: req.params.id },
      orderData,
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        erro: 'Pedido não encontrado'
      });
    }

    // Retorna em português
    const response = transformToPortuguese(order);

    res.status(200).json({
      mensagem: 'Pedido atualizado com sucesso',
      pedido: response
    });
  } catch (error) {
    res.status(400).json({
      erro: error.message
    });
  }
};

// DELETE - DELETE /order/:id
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ orderId: req.params.id });

    if (!order) {
      return res.status(404).json({
        erro: 'Pedido não encontrado'
      });
    }

    res.status(200).json({
      mensagem: 'Pedido deletado com sucesso',
      numeroPedido: order.orderId
    });
  } catch (error) {
    res.status(500).json({
      erro: error.message
    });
  }
};

