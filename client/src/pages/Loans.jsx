
import React, { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import Navbar from '../components/Navbar';

// import { ConnectWallet, useAddress, useBalance, useContract, useTransferToken  } from '@thirdweb-dev/react';
// import { useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import axios from 'axios';

const Loan = () => {
  const [timer, setTimer] = useState(10);
  const [balance, setBalance] = useState(null);
  const [status, setStatus] = useState('Querying...');
  const [flash, setFlash] = useState(false);
  const [depositAmt, setDepositAmt] = useState(0);
  const [connected, setConnected] = useState(false);
  
  const [loanAmount, setLoanAmount] = useState(0);
  const [foundPair, setFoundPair] = useState('USDC - DAI'); // exchange pair used in dex.sol
  const [estimatedProfit, setEstimatedProfit] = useState('');
  const [statusMessage, setStatusMessage] = useState('...');
  const [history, setHistory] = useState([
    // { date: '15/6/2024', token: 'USDC', loan: '10', pl: '+1.1' },
  ]);

  localStorage.getItem('user') === 'active' ? localStorage.setItem('user','active') : localStorage.setItem('user','passive'); 
  // web3 hooks
  const walletAddress = useAddress();
  const { data: userUSDCBalance, isLoading: loadingUSDCToken } = useBalance("0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8");
  const { contract } = useContract('0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8'); 
  const {
    mutateAsync: transferTokens,
    isLoading: loadingTransferToken,
    error,
  } = useTransferToken(contract);

  // Arena1
  const { contract: FLArbitrage } = useContract('0xd85ef7fca7b28a515cc55714A42B2e31aA548e85');
  const { data: readBalance, isLoading: loadingFLArbitrage, error: FLError } = useContractRead(
    FLArbitrage,
    "getBalance",
    ['0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8'],
  )

  useEffect(() => {
    if (!walletAddress) {
      setConnected(false);
    } else {
      setConnected(true);
      axios.post("http://localhost:5550/loan/historyRead", { address: walletAddress })
        .then((res) => {
          const obj = res.data;
          console.log(res.data);
          
          // Create a new array to store updated history
          const updatedHistory = obj.map((item) => {
            const date = new Date(item.date);
            const d = date.getDate();
            const m = date.getMonth() + 1;
            const y = date.getFullYear();
            return { date: `${d}/${m}/${y}`, token: item.token, loan: item.loan, pl: item.pl };
          });
  
          // Update the history state with the new array
          setHistory(updatedHistory);
        })
        .catch((err) => {
          alert("Failed to fetch loan history");
        });
    }
  }, [walletAddress]);
  

  // timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []); 

  useEffect(() => {
    const init = async () => {
      if (timer === 0) {
        // timer 10 seconds
        const bal = await FLArbitrage.call("getBalance",['0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8']);
        setDepositAmt(bal);
        console.log("bal" + bal);
        if(bal > 0) {
          setStatus("Locked")
        }
        else{
          setStatus('Free');
        }
        console.log("timer:" + bal);
        setTimer(10);
      }
    }
    init();
  }, [timer]);

  useEffect(() =>{
    if(loadingUSDCToken){
      setBalance('Loading...');
    }
    else{
      setBalance(`${userUSDCBalance.displayValue} USDC`);
    }
  },[loadingUSDCToken])

  const handleWithdraw = async () => {
    await FLArbitrage.call("withdraw",['0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8']);
    localStorage.setItem('user','passive');
    setStatus('Free'); // write to db
    setStatusMessage('');
    setFlash(false);
  }

  const handleArena = async () => {
    try {
      if(loadingTransferToken){
        alert("Loading...");
      }
      else{
        await transferTokens({
        to: '0xd85ef7fca7b28a515cc55714A42B2e31aA548e85', // transfer to arena1
        amount: '5', // transferring 5 USDC as minimum safety deposit
        })
        localStorage.setItem('user','active');
        setStatus('Locked'); 
        setStatusMessage('');
      }
    } catch (error) {
      localStorage.setItem('user','passive');
      console.log(error);
    }
  }

  const handleStatus = () => {
    try {
      if(depositAmt > 1){
        setStatus('Locked'); 
      }
      else{
        setStatus('Free');
      }
    } catch (error) {
      setStatus('Try Again!');
    }
  }

  const handleFlash = () => {
    
    if(localStorage.getItem('user') === 'passive'){
      return alert("Please lock an arena to get a flash loan!");
    }
    else{
      setFlash(true);
      const profit = 0.10 * loanAmount;
      setStatusMessage('Picking the best arbitrage pair for you...');
      setTimeout(() => {
        setFoundPair('USDC - DAI');
        setEstimatedProfit(`${profit} USDC`);
        setStatusMessage('');
      }, 2000);
    }
  };

  const handleProceed = async () => {
    const amt = loanAmount * (10**6);
    console.log(typeof(amt));
    console.log(amt);

    try {
      await FLArbitrage.call('requestFlashLoan',['0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8',amt]);
      setStatusMessage('Success, Please withdraw your amount!');
      const date = new Date().toLocaleDateString();
      axios.post('http://localhost:5550/loan/historyWrite',{ 
        address: walletAddress,
        date: date, 
        token: 'USDC', 
        amt: loanAmount,  
        pft: loanAmount*0.1,
      })
      .then((res) => {
        if(res.data.status === "success"){
          alert("success");
          const object = res.data.data[0];
          console.log(object);
          const date = new Date(object.date);
          const d = date.getDate();
          const m = date.getMonth() + 1;
          const y = date.getFullYear();
          const newEntry = { date: `${d}/${m}/${y}`, token: object.token, loan: object.loan, pl: object.pl};
          setHistory([...history, newEntry]);
        }
        else{
          alert('failed to update history');
        }
      })
      .catch((err) => {
        console.log(err);
      })
    } catch (error) {
      setStatusMessage('Error');
    }
    // if (isSuccess) {
    //   const newEntry = { date: new Date().toLocaleDateString(), token: 'USDC', loan: loanAmount, pl: '+1.1' };
    //   setHistory([...history, newEntry]);
    // }
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white p-8">
        <div className="flex justify-between items-center mb-8">
          <button className="text-white font-bold py-3 px-6 rounded-lg shadow-lg ml-auto">
            <ConnectWallet />
          </button>
        </div>
        <div className="bg-zinc-900 border-zinc-700 border-[1px] p-6 rounded-lg shadow-lg">
          <p className="text-lg">Required USDC Balance: 5 USDC</p>
          <p className="text-lg">Available USDC Balance: {balance}</p>
        </div>
        <br />
        <h1 className="text-3xl font-bold">Arenas</h1>
        <p className='text-2xl text-green-500' ><em>Deposit 5 USDC to lock the arena!</em></p>
        <br />
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-zinc-900 border-zinc-700 border-[1px] p-6 rounded-lg shadow-lg cursor-pointer">
            <p className='text-lg text-red-300'>New quotes in 00:{timer}</p>
            <p className="text-lg">Contract: 0xd85....8e85</p>
            <p className="text-lg">Status: {status}</p>
            <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
            onClick={handleStatus}
          >
            Avail Status
          </button>
          {status === 'Free' && (
            <button
            className="ml-5 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
            onClick={handleArena}
          >
            Deposit
          </button>
          )}
          {localStorage.getItem('user') === 'active' && (
            <button
            className="ml-5 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
            onClick={handleWithdraw}
          >
            Withdraw
          </button>
          )}
          </div>
          <div className="bg-zinc-900 border-zinc-700 border-[1px] p-6 rounded-lg shadow-lg cursor-pointer">
            <p className="text-lg">Contract: 0xdef...456</p>
            <p className="text-lg">Status: Locked</p>
          </div>
        </div>
        <div className="mb-8">
          <label className="block mb-3 text-xl">Loan Amount</label>
          {localStorage.getItem('user') === 'passive' && (
            <p className='text-mg text-red-200'><em>please lock an arena to get flash loan</em></p>
          )}
          <input
            type="number"
            className="w-full p-3 rounded-lg border-zinc-700 border-[1px] bg-zinc-800 text-white"
            placeholder="Ex: 4 USDC"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
            onClick={handleFlash}
          >
            FLASH!
          </button>
        </div>
        {flash === true && (
          <div className="bg-zinc-900 border-zinc-700 border-[1px] p-6 rounded-lg shadow-lg mb-8">
          {/* {statusMessage && <p className="text-lg">{statusMessage}</p>} */}
          <div className="flex items-center mt-6">
            <p className="mr-3">Found Pair:</p>
            <div className="bg-zinc-800 border-zinc-700 border-[1px] p-3 rounded-lg">{foundPair}</div>
          </div>
          <div className="flex items-center mt-6">
            <p className="mr-3">Estimated Profit:</p>
            <div className="bg-zinc-800 border-zinc-700 border-[1px] p-3 rounded-lg">{estimatedProfit}</div>
          </div>
          <div className="mt-6">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
              onClick={handleProceed}
            >
              Proceed
            </button>
          </div>
        </div>
        )}
        <div className="bg-zinc-900 border-zinc-700 border-[1px] p-6 rounded-lg shadow-lg mb-8">
          {statusMessage === 'Success, Please withdraw your amount!' && <p className="text-green-500">{statusMessage}</p>}
          {statusMessage === 'Error' && <p className="text-red-500">{statusMessage}</p>}
        </div>
        <div className="bg-zinc-900  p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">History</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b-2 border-zinc-700 text-2xl font-light text-zinc-500 p-3">Date</th>
                <th className="border-b-2 border-zinc-700 text-2xl font-light text-zinc-500 p-3">Token</th>
                <th className="border-b-2 border-zinc-700 text-2xl font-light text-zinc-500 p-3">Loan</th>
                <th className="border-b-2 border-zinc-700 text-2xl font-light text-zinc-500 p-3">P/L</th>
              </tr>
            </thead>
            {connected && (
              <tbody>
              {history.map((entry, index) => (
                <tr key={index}>
                  <td className="border-b border-zinc-700 p-3">{entry.date}</td>
                  <td className="border-b border-zinc-700 p-3">{entry.token}</td>
                  <td className="border-b border-zinc-700 text-yellow-500 p-3">{entry.loan}</td>
                  <td className="border-b border-zinc-700 p-3 text-green-500">
                    <div className="flex ">
                      <FiArrowUp size={24} />
                      <div>{entry.pl}</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            )}
            {!connected && (
              <p>Connect your wallet!!</p>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default Loan;