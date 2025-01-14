import mongoose from 'mongoose';

const MoneyTransferSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BankDetails',
    required: true,
  },
  senderUPI: {
    type: String,
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BankDetails',
    required: true,
  },
  receiverUPI: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  savedAmount: {
    type: Number,
    default: 0,
  },
  savePercent: {
    type: Number,
    default: 0,
  },
  totalSavedAmount: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const MoneyTransfer = mongoose.model('MoneyTransfer', MoneyTransferSchema);

export default MoneyTransfer;