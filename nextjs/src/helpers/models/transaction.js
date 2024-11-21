const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  portfolioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio', // Reference to the Portfolio model
    required: true
  },
  stockId: {
    
    id: String,
    required: true
  },
  type: {
    type: String,
    enum: ['buy', 'sell'],
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  purchasePrice: {
    type: Number,
    required: true
  },
  totalValue: {
    type: Number,
    required: true
  },
  transactionDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// const Transaction = mongoose.model('Transaction', transactionSchema);

export default  mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

// module.exports = Transaction;
