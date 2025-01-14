import React, { Suspense, useEffect, useState } from 'react'
import styles from "./style";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Profile from './pages/Profile';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import { Navbar } from './components';
import Dashboard from './pages/Dashboard.jsx';
import TransactionForm from './pages/AddTransaction.jsx';
import CryptoTracker from './pages/Crypto.jsx';
import Loan from './pages/Loans.jsx';
import Cookies from "js-cookie";
import ProtectedRoute from './PrivateRoute.jsx';
import NotFound from './pages/NotFound.jsx';
import Loader from './components/Loader.jsx';
import Bank from './pages/Bank.jsx';
import MainTransaction from './pages/MainTransaction.jsx';
import Payements from './pages/Payements.jsx';

const App = () => {
  const [tt , setToken] = useState("");

  useEffect(()=>{
    const token = Cookies.get('token');
    setToken(token);

  })
  return (
    <div className="bg-primary w-full overflow-hidden">
      <Router>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>
      <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<LoginPage />
            } />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/flash loans" element={<Loan/>} />
            <Route path="/crypto tracker" element={<CryptoTracker />} />

            {/* only if user is login */}
            <Route 
              element={<ProtectedRoute  isAuthenticated={tt ? true : false} />}
            >
              <Route path="/profile" element={<Profile />} />
              <Route path="/test" element={<test />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transaction" element={<TransactionForm />} />
              <Route path="/cryptupi" element={<Payements />} />
              <Route path="/KYC" element={<Bank />} />
              <Route path="/bank detail" element={<MainTransaction />} />
              {/* <Route path="/requests" element={<Request />} /> */}
            </Route>
            <Route path="/*" element={<NotFound />} />
          </Routes>
      </Suspense>
      </Router>
    </div>
  )
}

export default App
