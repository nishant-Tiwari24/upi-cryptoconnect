import React from 'react';

const TransactionHistory = ({ transactions }) => {
  if (!transactions) return <div>Loading...</div>;

  return (
    <div className="bg-zinc-800 border-zinc-700 border-2 font-mono p-6 rounded-lg flex-1">
      <h2 className="text-xl mb-4">Transaction History of Past Transactions</h2>
      <ul className="overflow-y-auto max-h-96">
        {transactions.map((transaction, index) => (
          <li key={index} className={`mb-2 ${transaction.amount > 0 ? 'text-red-400' : 'text-green-500'} bg-zinc-900 border-zinc-800 p-2 rounded-sm`}>
            {transaction.amount > 0 ? 'Sent' : 'Received'}: {Math.abs(transaction.amount)} 
            - {transaction.timestamp} <p className='text-amber-400'>Receiver UPI: {transaction.receiverUPI}</p> <p className='text-green-400'>Saved Amount Per Transaction: ${transaction.savedAmount}</p> 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionHistory;