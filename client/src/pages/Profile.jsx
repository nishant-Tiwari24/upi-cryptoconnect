import React from 'react'
import UserProfile from '../components/UserProfile';
import { Link } from "react-router-dom";
import ScratchCard from '../components/Scratch';
import img from "../../public/card.jpg"


const profile = () => {

  const coupons = [
    { id: 1, name: 'Coupon 1' },
    { id: 2, name: 'Coupon 2' },
    { id: 3, name: 'Coupon 3' },

  ];

  const renderCoupons = () => {
    return coupons.slice(0, 5).map(coupon => (
      <div key={coupon.id} className='grid-cols-3 grid-rows-3 grid'>
        <ScratchCard
                width={220}
                height={250}
                image={img}
                brushSize={40}
                className="text-white"
            />
      </div>
    ));
  };

  return (
    <div className='flex h-screen gap-3 p-7'>
        <div className='text-white flex flex-col gap-4 bg-boxbg rounded-3xl border-2 w-3/4 h-5/6'>
            <div className='border-b w-full h-1/5 p-6 flex justify-around'>
                <div className='rounded-3xl border p-4'> 
                    <p className='font-bold text-gray-300'>Cashback earned: <span className='font-thin'> $40</span></p>
                    <Link to="/" className='text-fadeBlue'>withdraw{"->"}</Link>
                </div>
                <div className='flex flex-col rounded-3xl border p-4'> 
                  <p className='font-bold text-gray-300'>Total Coupons earned</p>
                  <p className='font-thin text-lg'>10</p>
                </div>

                <div className='flex flex-col rounded-3xl border p-4'> 
                  <p className='font-bold text-gray-300'>Account Balance</p>
                  <p className='font-thin text-lg'>$1000</p>
                </div>
            </div>
            <div className='grid grid-cols-3 grid-rows-3 w-full h-4/5 p-5'>
              {renderCoupons()}
            </div>
        </div>
        <div className='flex flex-col text-white p-5 bg-boxbg rounded-3xl border-2 w-1/4 h-5/6'>
            <UserProfile />
        </div>
    </div>
  );
};

export default profile;
