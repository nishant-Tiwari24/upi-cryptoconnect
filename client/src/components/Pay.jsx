import React, { useState, useEffect } from "react";
import "../index.css";
import { GrRadial } from "react-icons/gr";
import { GrRadialSelected } from "react-icons/gr";
import api from "../utils/api"
import axios from 'axios';
// import { ConnectWallet, useAddress, useContract, useTransferToken } from '@thirdweb-dev/react';
// import Moralis from 'moralis';

const UPI = () => {
  const [upi, setUpi] = useState("");
  const [option, setOption] = useState("");
  const [amount, setAmount] = useState(0);
  // const address = useAddress();
  const [USDC, setUSDC] = useState('');
  const [DAI, setDAI] = useState('');
  const [keyword, setKeyword] = useState("");
  const [metamaskID, setMetamaskId] = useState();

  // const walletAddress = useAddress();

  // const { contract: usdcToken } = useContract('0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8');
  // const {
  //     mutateAsync: transferUSDC,
  //     isLoading: loadingTransferUSDC,
  //     error: usdcError,
  // } = useTransferToken(usdcToken);
  // const { contract: daiToken } = useContract('0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357');
  // const {
  //     mutateAsync: transferDAI,
  //     isLoading: loadingTransferDAI,
  //     error: daiError,
  // } = useTransferToken(daiToken);

//   useEffect(() => {
//     const init1 = async () => {
//         try {
//             await Moralis.start({
//                 apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6Ijc0MzU1NDE4LTZmNTUtNGRiZi04M2E5LTg0YmVmMWU2ZTg3ZSIsIm9yZ0lkIjoiMzk4MDY1IiwidXNlcklkIjoiNDA5MDI2IiwidHlwZUlkIjoiNmNiZGM1ZWItMTE0MS00Nzg4LWExZDItM2FkZjk3MWI2MzA0IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTk1MDI5NjAsImV4cCI6NDg3NTI2Mjk2MH0.AJXjaSjXiJSpmYFfjFwkbK06cEcMdjHzq3b1fu3PHwQ"
//             });

//             const response = await Moralis.EvmApi.token.getTokenPrice({
//                 "chain": "0x1",
//                 "include": "percent_change",
//                 "exchange": "uniswapv3",
//                 "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
//             });

//             console.log(response.raw.usdPrice);
//             console.log('Before', USDC);
//             setUSDC(response.raw.usdPrice);
//             console.log('after', USDC);

//             const resp = await Moralis.EvmApi.token.getTokenPrice({
//                 "chain": "0x1",
//                 "include": "percent_change",
//                 "exchange": "uniswapv3",
//                 "address": "0x6b175474e89094c44da98b954eedeac495271d0f"
//             });

//             console.log(resp.raw);
//             setDAI(resp.raw.usdPrice);
//         } catch (e) {
//             console.error(e);
//         }
//     }
//     init1();
// }, [])

//   const payementHandler = async () => {
//     try {
//         axios.post("http://localhost:5550/api/auth/fetchdetail", {
//             'waddr': address,
//         })
//             .then(async (res) => {
//                 if (res.data === 'no') {
//                     alert('Your wallet address is not linked!');
//                 }
//                 // wallet address linked
//                 else {
//                     const res = await axios.post(
//                         `http://localhost:5550/api/auth/fetchdetail`,
//                         { email: "bhomik@gmail.com" }
//                     );
//                     const details = await res.data.user;
//                     setMetamaskId(details.metamaskId);

//                     if (address === metamaskID) {
//                         if (!amount || !option || !upi) {
//                             return alert("Missing fields!")
//                         }
//                         if (option === 'USDC') {
//                             const res = await axios.post(
//                                 `http://localhost:5550/api/auth/fetchdetail`,
//                                 { upi: upi }
//                             );
//                             const receiver = res.data;
//                             console.log(receiver.metamaskId);

//                             const val = ((amount / 83) * Number(USDC).toFixed(2)).toFixed(2);
//                             const mtm = 0.2 * val;
//                             console.log(typeof (val) + typeof (mtm));
//                             alert("Pay: " + val + '\n' + 'MTM Fee: ' + Number(mtm).toFixed(2) + '\n' + 'Total: ' + (Number(val) + mtm).toFixed(2));

//                             await transferUSDC({
//                                 to: receiver.metamaskId,
//                                 amount: Number(val) + Number(mtm),
//                             })

//                             const date = new Date().toLocaleDateString();
//                             axios.post("http://localhost:5550/pay/paymentWrite",{
//                                 date: date,
//                                 to: upi,
//                                 amt: amount,
//                                 sender: walletAddress,
//                                 keyword: keyword,
//                                 coin: "USDC",
//                             })
//                             .then((res)=>{
//                                 console.log(res.data);
//                             })
//                             .catch((err)=>{
//                                 console.log(err);
//                             })
//                         }
//                         if (option === 'DAI') {
//                             const res = await axios.post(
//                                 `http://localhost:5550/api/auth/fetchdetail`,
//                                 { upi: upi }
//                             );
//                             const receiver = await res.data.metamaskId;
//                             console.log(receiver);

//                             const val = ((amount / 83) * Number(DAI).toFixed(2)).toFixed(2);
//                             const mtm = 0.2 * val;
//                             console.log(typeof (val) + typeof (mtm));
//                             alert("Pay: " + val + '\n' + 'MTM Fee: ' + Number(mtm).toFixed(2) + '\n' + 'Total: ' + (Number(val) + mtm).toFixed(2));


//                             await transferDAI({
//                                 to: receiver,
//                                 amount: Number(val) + Number(mtm),
//                             })

//                             const date = new Date().toLocaleDateString();
//                             axios.post("http://localhost:5550/pay/paymentWrite",{
//                                 date: date,
//                                 to: upi,
//                                 amt: amount,
//                                 sender: walletAddress,
//                                 keyword: keyword,
//                                 coin: "DAI",
//                             })
//                             .then((res)=>{
//                                 console.log(res.data);
//                             })
//                             .catch((err)=>{
//                                 console.log(err);
//                             })
//                         }
//                     }
//                     if (address !== metamaskID) {
//                         alert('Wallet address not linked with your UPI, Check your wallet address');
//                     }
//                 }
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     } catch (error) {
//         console.log(error);
//     }
// }

const payementHandler = ()=>{}
  const reqestHadler = () =>{
    try {
      (async()=>{
        const res = await api.post('/money-transfer/money-requested', { receiver: upi, amount:amount});
        console.log(res.data);
      })();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-boxbg flex flex-col justify-between w-1/4 h-3/5 rounded-lg p-5 mt-20 border">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="UPI Id"
          onChange={(e) => setUpi(e.target.value)}
          className="p-4 bg-neutral-700 outline-none rounded-md"
        />
        <input
          type="number"
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
          className="p-4 bg-neutral-700 outline-none rounded-md"
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex w-full gap-2">
          <button
            onClick={reqestHadler}
            className="rounded-full w-full p-3 bg-blue-800"
          >
            Request
          </button>
          <button
            onClick={payementHandler}
            className="rounded-full w-full p-3 bg-fadeBlue"
          >
            Pay
          </button>
        </div>
        <p className="text-sm mt-3 font-thin"> powered by Us</p>
      </div>
    </div>
  );
};

export default UPI;
