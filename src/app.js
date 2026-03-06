const express = require('express');
const connectDB = require('./config/database');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de teste
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API Jitterbit - Gerenciamento de Pedidos',
    versao: '1.0.0'
  });
});

// Rotas
app.use('/api', orderRoutes);

// Conectar ao banco de dados
connectDB();

module.exports = app;

