import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import TransactionForm from './components/Transaction/AddTransactionForm';
import Dashboard from './components/Transaction/TransactionList';
import RealTimeStockData from './components/TradingBot/Trading';
import CryptoTracker from './components/TradingBot/CryptoDash';
import Loan from './components/LoanSection/Loans';
import AddBankDetails from './components/Bank/BankForm';
import MainTransaction from './components/Bank/MainTransaction';

const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/transaction" element={<TransactionForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trading" element={<RealTimeStockData />} />
        <Route path="/crypto" element={<CryptoTracker />} />
        <Route path="/loans" element={<Loan/>} />
        <Route path="/addbank" element={<AddBankDetails/>} />
        <Route path="/details" element={<MainTransaction/>} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
