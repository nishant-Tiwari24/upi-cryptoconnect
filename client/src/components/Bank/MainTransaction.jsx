import React, { useEffect, useState } from 'react';
import BankCard from './BankCard';
import UserInfo from './UserInfo';
import TransactionForm from './TransactionForm';
import TransactionHistory from './TransactionHistory';
import BarGraph from './BarGraph';
import api from '../../utils/api';
import Navbar from '../Navbar';
import ScannerComponent from './ScannerComponent';

function MainTransaction() {
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/bank/user-details');  
        setUserData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await api.get('/money-transfer');
        setTransactions(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
    fetchTransactions();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="bg-black text-zinc-200 min-h-screen p-6">
        
      <div className="mx-auto">
        <div className="flex gap-6 items-center mb-6">
          {userData && (
            <>
              <BankCard userData={userData} />
              <UserInfo userData={userData} />
              <ScannerComponent/>
            </>
          )}
        </div>
        <div className="flex space-x-6">
          <TransactionForm />
          <TransactionHistory transactions={transactions} />
        </div>
        <div className="flex space-x-6 mt-6">
          <BarGraph title="Amount Sent" transactions={transactions} type="sent" />
          <BarGraph title="Amount Received" transactions={transactions} type="received" />
        </div>
      </div>
    </div>
    </>
  );
}

export default MainTransaction;