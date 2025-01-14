import React from 'react';
import { chip, visa } from '../../assets';

const BankCard = ({ userData }) => {
  if (!userData || !userData.bankDetails) return <div>Loading...</div>;

  const { bankName, ifscCode, upiId, balance } = userData.bankDetails;

  return (
    <div className="bg-gradient-to-r font-mono from-zinc-800 border-2 border-zinc-700 to-zinc-900 p-6 h-80 w-[700px] rounded-lg relative shadow-lg">

      <div className="text-white mt-8 ">
        <p className="text-xl font-medium truncate">{bankName}</p>
        <p className="text-lg mt-2 text-zinc-400">{ifscCode}</p>
        <p className="text-lg text-zinc-400 mt-2">UPI ID: {upiId}</p>
        <p className="text-lg text-amber-400 mt-2">Balance: ${balance}</p>
      </div>
      <div className="absolute bottom-4 left-6">
        <img src={visa} alt="Visa Logo" className="w-16" />
      </div>
      <div className="absolute bottom-4 right-2">
        <img src={chip} alt="Visa Logo" className="w-24" />
      </div>
    </div>
  );
}

export default BankCard;