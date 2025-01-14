import React, { useState } from 'react'
import { GrRadial } from "react-icons/gr";
import { GrRadialSelected } from "react-icons/gr";


const Reqpay = ({name, sender, amount, key}) => {
    const [paytoggle , setPaytoggle] = useState(false);
    const [paythrough, setPaythrough] = useState("metamask");

    
    const payHandler = ()=>{
        setPaytoggle(true);
    }
    const closeHandler = ()=>{
        setPaytoggle(false);
    }
    const paythroughHandler = (type)=>{
        setPaythrough(type);
    }
  return (
    <div className='flex justify-between m-2 items-center w-full border-2 border-zinc-400 rounded-lg bg-boxbg p-8'>
        <div key={key} className=' flex flex-col justify-center'>
            <p className='text-sm text-stone-400 inset-x-0 bottom-0 font-medium'>{name}</p>
            <p className='flex items-center font-bold text-2xl text-zinc-300'>${amount}</p>
            <p className='text-sm text-stone-400 inset-x-0 bottom-0 font-medium'>{sender}</p>
        </div>
        <button onClick={payHandler} className=' rounded-full p-5 bg-icon text-black w-24 h-full'>Pay</button>
        {paytoggle && (
                <div className='absolute inset-0 flex items-center justify-center backdrop-blur-sm'>
                    <div className='flex flex-col justify-between relative w-1/4 h-2/4 rounded-2xl bg-boxbg border-2 p-6 border-stone-500'>
                        <div className='flex flex-col justify-between h-full py-6'>
                            <div className='flex flex-col items-center gap-3'>
                                <p className='text-lg font-medium text-stone-500'>{sender}</p>
                                <p className='text-4xl font-semibold text-zinc-300'>${amount}</p>
                            </div>
                            <div className='flex flex-col w-full gap-2 text-zinc-400'>
                                <div onClick={()=>paythroughHandler("metamask")} className='flex justify-between items-center w-full border p-3 text-xl rounded-md'>
                                    <p>Metamask</p> 
                                    {paythrough=="metamask"? <GrRadialSelected className='text-icon'/> : <GrRadial />}
                                </div>
                                <div onClick={()=>paythroughHandler("upi")} className='flex justify-between w-full items-center border p-3 text-xl rounded-md'> 
                                    <p>UPI</p>
                                    {paythrough=="upi"? <GrRadialSelected className='text-icon'/> : <GrRadial />}
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-3 font-semibold items-end'>
                            <button onClick={closeHandler} className='w-full rounded-full p-3 border bg-neutral-600 text-stone-300'>cancel</button>
                            <button className='p-3 border bg-icon w-full rounded-full text-black'>Pay</button>
                        </div>
                    </div>
                </div>
            )}
    </div>
  )
}

export default Reqpay