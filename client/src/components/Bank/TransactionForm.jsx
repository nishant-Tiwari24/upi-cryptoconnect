import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import api from '../../utils/api';

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    senderUPI: '',
    receiverUPI: '',
    amount: '',
    savePercent: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/money-transfer/create`, formData);
      console.log(response.data);
      toast.success('Transaction successful!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to send transaction');
    }
  };

  return (
    <div className="bg-zinc-800 font-mono border-zinc-700 border-2 p-6 rounded-lg flex-1">
      <Toaster />
      <h2 className="text-xl mb-4">Transfer Money through UPI ID</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="senderUPI" className="block mb-2">Sender UPI Address</label>
          <input
            type="text"
            id="senderUPI"
            name="senderUPI"
            value={formData.senderUPI}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-900"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="receiverUPI" className="block mb-2">Receiver UPI Address</label>
          <input
            type="text"
            id="receiverUPI"
            name="receiverUPI"
            value={formData.receiverUPI}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-900"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block mb-2">Amount to Send</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-900"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="savePercent" className="block mb-2">Save Percent (Savings per Transaction)</label>
          <input
            type="number"
            id="savePercent"
            name="savePercent"
            value={formData.savePercent}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-900"
          />
        </div>
        <button type="submit" className="w-full bg-amber-600 text-white p-2 rounded">Transfer</button>
      </form>
    </div>
  );
};

export default TransactionForm;