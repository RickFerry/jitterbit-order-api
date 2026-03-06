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

// Rotas - SEM prefixo /api conforme requisito
app.use('/', orderRoutes);

// Conectar ao banco de dados
connectDB().then(r => console.log('Conexão com MongoDB estabelecida com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

module.exports = app;

