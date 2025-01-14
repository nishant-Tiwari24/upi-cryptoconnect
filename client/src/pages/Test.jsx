// import React, { useState } from 'react';
// import { FiArrowUp } from 'react-icons/fi';
// // import Navbar from '../Navbar';

// const Loan = () => {
//   const [loanAmount, setLoanAmount] = useState('');
//   const [foundPair, setFoundPair] = useState('USDC - DAI');
//   const [estimatedProfit, setEstimatedProfit] = useState('11 USDC');
//   const [statusMessage, setStatusMessage] = useState('');
//   const [history, setHistory] = useState([
//     { date: '15/6/2024', token: 'USDC', loan: '10', pl: '+1.1' },
//     { date: '17/6/2024', token: 'USDC', loan: '100', pl: '+11.2' },
//     { date: '15/6/2024', token: 'USDC', loan: '10', pl: '+15.1' },
//     { date: '17/6/2024', token: 'USDC', loan: '100', pl: '+11.2' },
//     { date: '15/6/2024', token: 'USDC', loan: '10', pl: '+23.1' },
//     { date: '17/6/2024', token: 'USDC', loan: '1000', pl: '+14.2' },
//   ]);

//   const handleFlash = () => {
//     setStatusMessage('Picking the best arbitrage pair for you...');
//     setTimeout(() => {
//       setFoundPair('USDC - DAI');
//       setEstimatedProfit('11 USDC');
//       setStatusMessage('');
//     }, 2000);
//   };

//   const handleProceed = () => {
//     const isSuccess = Math.random() > 0.5;
//     setStatusMessage(isSuccess ? 'Success' : 'Error');
//     if (isSuccess) {
//       const newEntry = { date: new Date().toLocaleDateString(), token: 'USDC', loan: loanAmount, pl: '+1.1' };
//       setHistory([...history, newEntry]);
//     }
//   };

//   return (
//     <>
//     {/* <Navbar/> */}
//     <div className="min-h-screen bg-black text-white p-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Arenas</h1>
//         <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg">
//           Connect Wallet
//         </button>
//       </div>
//       <div className="grid grid-cols-2 gap-6 mb-8">
//         <div className="bg-zinc-900 border-zinc-700 border-[1px] p-6 rounded-lg shadow-lg">
//           <p className="text-lg">Contract: 0xabc...123</p>
//           <p className="text-lg">Status: Free</p>
//         </div>
//         <div className="bg-zinc-900 border-zinc-700 border-[1px] p-6 rounded-lg shadow-lg">
//           <p className="text-lg">Contract: 0xdef...456</p>
//           <p className="text-lg">Status: Locked</p>
//         </div>
//       </div>
//       <div className="mb-8">
//         <label className="block mb-3 text-xl">Loan Amount</label>
//         <input
//           type="number"
//           className="w-full p-3 rounded-lg border-zinc-700 border-[1px] bg-zinc-800 text-white"
//           placeholder="Enter amount"
//           value={loanAmount}
//           onChange={(e) => setLoanAmount(e.target.value)}
//         />
//       </div>
//       <div className="mb-6">
//         <button
//           className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
//           onClick={handleFlash}
//         >
//           FLASH!
//         </button>
//       </div>
//       <div className="bg-zinc-900 border-zinc-700 border-[1px] p-6 rounded-lg shadow-lg mb-8">
//         {statusMessage && <p className="text-lg">{statusMessage}</p>}
//         <div className="flex items-center mt-6">
//           <p className="mr-3">Found Pair:</p>
//           <div className="bg-zinc-800 border-zinc-700 border-[1px] p-3 rounded-lg">{foundPair}</div>
//         </div>
//         <div className="flex items-center mt-6">
//           <p className="mr-3">Estimated Profit:</p>
//           <div className="bg-zinc-800 border-zinc-700 border-[1px] p-3 rounded-lg">{estimatedProfit}</div>
//         </div>
//         <div className="mt-6">
//           <button
//             className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
//             onClick={handleProceed}
//           >
//             Proceed
//           </button>
//         </div>
//       </div>
//       <div className="bg-zinc-900 border-zinc-700 border-[1px] p-6 rounded-lg shadow-lg mb-8">
//         {statusMessage === 'Success' && <p className="text-green-500">{statusMessage}</p>}
//         {statusMessage === 'Error' && <p className="text-red-500">{statusMessage}</p>}
//       </div>
//       <div className="bg-zinc-900  p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-6">History</h2>
//         <table className="w-full text-left">
//           <thead>
//             <tr>
//               <th className="border-b-2 border-zinc-700 text-2xl font-light text-zinc-500 p-3">Date</th>
//               <th className="border-b-2 border-zinc-700 text-2xl font-light text-zinc-500 p-3">Token</th>
//               <th className="border-b-2 border-zinc-700 text-2xl font-light text-zinc-500 p-3">Loan</th>
//               <th className="border-b-2 border-zinc-700 text-2xl font-light text-zinc-500 p-3">P/L</th>
//             </tr>
//           </thead>
//           <tbody>
//             {history.map((entry, index) => (
//               <tr key={index}>
//                 <td className="border-b border-zinc-700 p-3">{entry.date}</td>
//                 <td className="border-b border-zinc-700 p-3">{entry.token}</td>
//                 <td className="border-b border-zinc-700 text-yellow-500 p-3">{entry.loan}</td>
//                 <td className="border-b border-zinc-700 p-3 text-green-500"><div className='flex '><FiArrowUp size={24}/><div>{entry.pl}</div></div></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//     </>
//   );
// };

// export default Loan;
