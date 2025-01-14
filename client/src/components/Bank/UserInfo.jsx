import React from 'react';

const UserInfo = ({ userData, transactions }) => {
  if (!userData || !userData.bankDetails) return <div>Loading...</div>;

  const { name, bankDetails } = userData;
  const { balance, upiId, createdAt, updatedAt } = bankDetails;

  let totalSavedAmount = 0;
  if (transactions) {
    transactions.forEach(transaction => {
      if (transaction.savedAmount) {
        totalSavedAmount += transaction.savedAmount;
      }
    });
  }
  console.log(totalSavedAmount)

  return (
    <div className="bg-zinc-800 font-mono p-6 rounded-lg border-2 border-zinc-700 shadow-md flex flex-col items-center justify-center h-80 w-[400px]">
      <h2 className="text-xl text-start font-bold text-amber-600 mb-4">👋🏻 Hello Nishant Tiwari</h2>
      <p className="text-lg font-medium text-white">Total Saved Amount: $76</p>
      <p className="text-lg text-white">UPI ID: {upiId}</p>
      <p className="text-lg text-gray-400">Account Created: {new Date(createdAt).toLocaleDateString()}</p>
      <p className="text-base text-gray-400">Last Updated: {new Date(updatedAt).toLocaleDateString()}</p>
    </div>
  );
}

export default UserInfo;