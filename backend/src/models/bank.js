import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema, model } = mongoose;

const BankDetailsSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  bankName: { 
    type: String, 
    required: true,
    enum: ['State Bank of India', 'Punjab National Bank', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'SBI']
  },
  ifscCode: { type: String, required: true },
  accountHolder: { type: String, required: true },
  accountAddress: { type: String, required: true },
  accountType: { type: String, required: true },
  amount: { type: Number, required: true, default: 0 },
  upiId: { type: String, required: true, unique: true },
}, { timestamps: true });

BankDetailsSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.ifscCode = await bcrypt.hash(this.ifscCode, salt);
  this.accountHolder = await bcrypt.hash(this.accountHolder, salt);
  this.accountAddress = await bcrypt.hash(this.accountAddress, salt);
  next();
});

const BankDetails = model('BankDetails', BankDetailsSchema);

export default BankDetails;