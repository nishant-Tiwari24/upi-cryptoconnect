import mongoose from "mongoose";

const paymentsSchema = mongoose.Schema({
    date: { type: Date, required: true},
    toUPI: { type: String, required: true},
    keyword: { type: String, required: true},
    amount: { type: Number, required:true},
    sender: { type: String, required:true},
    coin: { type: String, required: true},
});

const payments = mongoose.model('payments',paymentsSchema);

export default payments;