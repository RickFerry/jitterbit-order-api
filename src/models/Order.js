const mongoose = require('mongoose');

// Schema definido em INGLÊS conforme requisito
const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: Number,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  items: [{
    productId: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);

