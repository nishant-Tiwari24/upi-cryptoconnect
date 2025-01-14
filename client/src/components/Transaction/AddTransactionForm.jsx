import React, { useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const TransactionForm = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [transactionType, setTransactionType] = useState('debit'); // Default transaction type

  const notifySuccess = () => toast.success('Transaction added successfully');
  const notifyError = () => toast.error('Failed to add transaction');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/transactions', { amount, currency, category, description, transactionType });
      notifySuccess();
      setAmount('');
      setCurrency('USD');
      setCategory('');
      setDescription('');
    } catch (error) {
      console.error('Error adding transaction:', error);
      notifyError();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-[700px] space-y-8 bg-zinc-900 p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Add Transaction</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="amount" className="sr-only">Amount</label>
              <input
                id="amount"
                name="amount"
                type="number"
                autoComplete="off"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 placeholder-gray-400 text-white focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="currency" className="sr-only">Currency</label>
              <select
                id="currency"
                name="currency"
                className="appearance-none rounded-none relative block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 placeholder-gray-400 text-white focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            <div>
              <label htmlFor="category" className="sr-only">Category</label>
              <select
                id="category"
                name="category"
                className="appearance-none rounded-none relative block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 placeholder-gray-400 text-white focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Salary">Salary</option>
                <option value="Groceries">Groceries</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Utilities">Utilities</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Travel">Travel</option>
                <option value="Dining">Dining</option>
                <option value="Education">Education</option>
                <option value="Investment">Investment</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
            </div>
            <div>
              <label htmlFor="description" className="sr-only">Description</label>
              <input
                id="description"
                name="description"
                type="text"
                autoComplete="off"
                className="appearance-none rounded-none relative block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 placeholder-gray-400 text-white focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="transactionType" className="sr-only">Transaction Type</label>
              <select
                id="transactionType"
                name="transactionType"
                className="appearance-none rounded-none relative block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 placeholder-gray-400 text-white focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <option value="debit">Debit</option>
                <option value="credit">Credit</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
