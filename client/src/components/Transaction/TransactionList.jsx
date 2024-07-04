import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import api from '../../utils/api';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { FaUserMd, FaCalendarAlt, FaDollarSign, FaSyringe } from 'react-icons/fa';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import QRCode from 'qrcode.react'; 
import { saveAs } from 'file-saver'; 
import Chatbot from './Chatbot';

const allowedCategories = [
  'Salary',
  'Groceries',
  'Entertainment',
  'Utilities',
  'Healthcare',
  'Miscellaneous'
];


const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const downloadQRCode = (transaction) => {
    const canvas = document.getElementById(`qr-code-${transaction.id}`);
    canvas.toBlob((blob) => {
      saveAs(blob, `transaction-${transaction.id}.png`);
    });
  };

  const generateRandomData = () => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push(Math.round(Math.random() * 100));
    }
    return data;
  };

  const groupTransactionsByDate = (transactions) => {
    const grouped = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.timestamp).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { debit: 0, credit: 0 };
      }
      if (transaction.transactionType === 'debit') {
        acc[date].debit += transaction.amount;
      } else {
        acc[date].credit += transaction.amount;
      }
      return acc;
    }, {});

    const today = new Date();
    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toLocaleDateString();
      if (!grouped[dateString]) {
        grouped[dateString] = { debit: 0, credit: 0 };
      }
    }

    return Object.keys(grouped).sort((a, b) => new Date(a) - new Date(b)).map(date => ({
      date,
      debit: grouped[date].debit,
      credit: grouped[date].credit,
    }));
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get('/transactions');
        setTransactions(response.data);
        setLoading(false);
        drawCharts(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const drawCharts = (data) => {
    const aggregatedData = groupTransactionsByDate(data);

    const debitedData = {
      labels: aggregatedData.map(entry => entry.date),
      datasets: [
        {
          label: 'Debited Amount',
          data: aggregatedData.map(entry => entry.debit),
          backgroundColor: 'rgb(229, 43, 59)', 
        },
      ],
    };

    const creditedData = {
      labels: aggregatedData.map(entry => entry.date),
      datasets: [
        {
          label: 'Credited Amount',
          data: aggregatedData.map(entry => entry.credit),
          backgroundColor: 'rgb(0, 179, 0)', 
        },
      ],
    };

    const ctxDebited = document.getElementById('barChartDebited');
    if (ctxDebited) {
      new Chart(ctxDebited, {
        type: 'bar',
        data: debitedData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    const ctxCredited = document.getElementById('barChartCredited');
    if (ctxCredited) {
      new Chart(ctxCredited, {
        type: 'bar',
        data: creditedData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    const debitedByCategoryData = {
      labels: allowedCategories,
      datasets: [
        {
          label: 'Debited Amount',
          data: allowedCategories.map((category) =>
            data
              .filter(
                (transaction) =>
                  transaction.transactionType === 'debit' && transaction.category === category
              )
              .reduce((acc, curr) => acc + curr.amount, 0)
          ),
          borderColor: 'rgb(229, 43, 59)', // Red border for debited
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
        },
      ],
    };

    const creditedByCategoryData = {
      labels: allowedCategories,
      datasets: [
        {
          label: 'Credited Amount',
          data: allowedCategories.map((category) =>
            data
              .filter(
                (transaction) =>
                  transaction.transactionType === 'credit' && transaction.category === category
              )
              .reduce((acc, curr) => acc + curr.amount, 0)
          ),
          borderColor: 'lime', // Green border for credited
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ],
    };

    const ctxDebitedByCategory = document.getElementById('lineChartDebitedByCategory');
    if (ctxDebitedByCategory) {
      new Chart(ctxDebitedByCategory, {
        type: 'line',
        data: debitedByCategoryData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    const ctxCreditedByCategory = document.getElementById('lineChartCreditedByCategory');
    if (ctxCreditedByCategory) {
      new Chart(ctxCreditedByCategory, {
        type: 'line',
        data: creditedByCategoryData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  };

  const getArrowIcon = (transactionType) => {
    return transactionType === 'debit' ? (
      <FiArrowDown className="text-red-500" />
    ) : (
      <FiArrowUp className="text-green-500" />
    );
  };

  const totalWarpMoney = '$25000'; // Example total warp money
  const totalCredit = '$15000'; // Example total credit
  const totalDebit = '$10000'; // Example total debit
  const salary = '$5000';


  return (
    <div className="text-white flex flex-col bg-black justify-center items-center mt-4">
      <Navbar/>
      <div className="flex justify-center gap-8 w-full max-w-8xl mb-8">
  <div className="bg-zinc-800 p-4 w-[350px] rounded-lg shadow-lg border-zinc-700 border-2">
    <h3 className="text-xl font-bold text-zinc flex items-center mb-2">
      Total Wrapped Money
    </h3>
    <p className="text-3xl text-green-500">{totalWarpMoney}</p>
    <p className="text-green-200">2600% than Last Month</p>
  </div>
  <div className="bg-zinc-800 p-4 w-[350px] rounded-lg shadow-lg border-zinc-700 border-2">
    <h3 className="text-xl font-bold text-zinc flex items-center mb-2">
      Total Credited Money
    </h3>
    <p className="text-3xl text-green-500">{totalCredit}</p>
    <p className="text-green-200">1200% Last Month</p>
  </div>
  <div className="bg-zinc-800 p-4 w-[350px] rounded-lg shadow-lg border-zinc-700 border-2">
    <h3 className="text-xl font-bold text-zinc flex items-center mb-2">
      Total Debited Money
    </h3>
    <p className="text-3xl text-red-500">{totalDebit}</p>
    <p className="text-red-200">800% Last Month</p>
  </div>
  <div className="bg-zinc-800 p-4 w-[350px] rounded-lg shadow-lg border-zinc-700 border-2">
    <h3 className="text-xl font-bold text-zinc flex items-center mb-2">
      Total Salary
    </h3>
    <p className="text-3xl text-green-500">{salary}</p>
    <p className="text-green-200">100% Last Month</p>
  </div>
</div>

      <Chatbot transactions={transactions}/>
      <div className="flex flex-col w-[1500px] mb-8">
        <div className="flex justify-between  mb-8">
          <div className="bg-zinc-800 border-zinc-700 border-2 p-6 rounded-lg w-[740px] shadow-lg h-96">
            <h3 className="text-xl font-bold mb-4 text-white  flex items-center">Debited Amounts Over Time</h3>
            <canvas id="barChartDebited"></canvas>
          </div>
          <div className="bg-zinc-800 border-zinc-700 border-2 p-6 rounded-lg shadow-lg w-[740px] h-96">
            <h3 className="text-xl font-bold mb-4 text-white flex items-center">Credited Amounts Over Time</h3>
            <canvas id="barChartCredited"></canvas>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="bg-zinc-800 p-6 rounded-lg border-zinc-700 border-2  w-[740px] shadow-lg h-96">
            <h3 className="text-xl font-bold mb-4 text-white flex items-center">Debited Amounts by Category</h3>
            <canvas id="lineChartDebitedByCategory"></canvas>
          </div>
          <div className="bg-zinc-800 p-6 rounded-lg border-zinc-700 border-2 shadow-lg  w-[740px] h-96">
            <h3 className="text-xl font-bold mb-4 text-white flex items-center">Credited Amounts by Category</h3>
            <canvas id="lineChartCreditedByCategory"></canvas>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <div className="overflow-x-auto w-[1500px]">
        <table className="w-full bg-zinc-900 rounded-lg overflow-hidden">
          <thead className="bg-zinc-800">
            <tr className="text-left text-white">
              <th className="px-6 py-3 text-lg font-bold uppercase border-b border-zinc-700">Description of the Payment</th>
              <th className="px-6 py-3 text-lg font-bold uppercase border-b border-zinc-700">Amount</th>
              <th className="px-6 py-3 text-lg font-bold uppercase border-b border-zinc-700">Category</th>
              <th className="px-6 py-3 text-lg font-bold uppercase border-b border-zinc-700">Date</th>
              <th className="px-6 py-3 text-lg font-bold uppercase border-b border-zinc-700">Graph Status</th>
              <th className="px-6 py-3 text-lg font-bold uppercase border-b border-zinc-700">QR Code</th>
              <th className="px-6 py-3 text-lg font-bold uppercase border-b border-zinc-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  Loading transactions...
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.id} className="text-white hover:bg-zinc-800">
                  <td className="px-6 py-6 border-gray-700 flex items-center">
                    {getArrowIcon(transaction.transactionType)}
                    <span className="ml-2">{transaction.description}</span>
                  </td>
                  <td className="px-6 py-4 border-gray-700">{transaction.amount}</td>
                  <td className="px-6 py-4 border-gray-700">{transaction.category}</td>
                  <td className="px-6 py-4 border-gray-700">
                    {new Date(transaction.timestamp).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 border-gray-700">
                    <Sparklines data={generateRandomData()} width={100} height={15}>
                      <SparklinesLine color={transaction.transactionType === 'debit' ? '#e53935' : '#4caf50'} />
                      <SparklinesSpots style={{ fill: transaction.transactionType === 'debit' ? '#e53935' : '#4caf50' }} />
                    </Sparklines>
                  </td>
                  <td className="px-6 py-4 border-gray-700">
                    <QRCode id={`qr-code-${transaction.id}`} value={JSON.stringify(transaction)} size={64} />
                  </td>
                  <td className="px-6 py-4 border-gray-700 flex flex-col items-center">
                    <button
                      className="mb-2 border-[1px] border-green-500 hover:border-green-600 text-white py-2 px-4 rounded-md"
                      onClick={() => downloadQRCode(transaction)}
                    >
                      Download QR
                    </button>

                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default Dashboard;
