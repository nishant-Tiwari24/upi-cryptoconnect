import React, { useEffect, useState } from 'react'
import Reqpay from '../components/Reqpay'
import api from "../utils/api";

const Request = () => {
  const [data, setData] = useState([]);
  useEffect(()=>{
    (
        async()=>{
        try {
            const res = await api.get('/money-transfer/all-request-money');
            const a = await res.data;
            setData(a.money.requests);
            console.log(a);
            console.log(data);
        } catch (error) {
            console.log(error);
        }}
    )();
},[]);
  return (
    <div className='h-screen w-full bg-black text-white border-t p-5'>
      
      {data.length == 0 ? <p className='h-full flex justify-center items-center text-xl text-gray-400'>No data found.</p> : data.map((elem)=>(

        <Reqpay key={Element._id} name={elem.name} sender={elem.sender} amount={elem.amount} />
      ))

      }
    </div>
  )
}

export default Request