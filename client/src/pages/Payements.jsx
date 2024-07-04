import React, { useState } from 'react';
import Pay from '../components/Pay';
import Request from './Request';
import Reqpay from '../components/Reqpay';



const Payements = () => {
    const [active, setActive] = useState("upi");

    const toggleHandler = (paymentType) => {
        setActive(paymentType);
    }

    return (
        <div className='flex flex-col bg-black w-full text-white border-t h-screen'>
            <div className='w-full flex px-8 py-4 gap-10 text-xl'>
                <div 
                    onClick={() => toggleHandler("upi")} 
                    className={`w-full flex justify-center border p-4 rounded-full ${active === "upi" ? 'bg-fadeBlue text-black' : 'bg-boxbg'} hover:bg-fadeBlue hover:text-black`}
                >
                    UPI
                </div>
                <div 
                    onClick={() => toggleHandler("metamask")} 
                    className={`w-full flex justify-center border p-4 rounded-full ${active === "metamask" ? 'bg-fadeBlue text-black' : 'bg-boxbg'} hover:bg-fadeBlue hover:text-black`}
                >
                    Requests
                </div>
            </div>
            <div className='h-full flex justify-center'>
                {active === "upi" && <Pay />}
                {active === "metamask" && <Request />}
            </div>
        </div>
    )
}

export default Payements;
