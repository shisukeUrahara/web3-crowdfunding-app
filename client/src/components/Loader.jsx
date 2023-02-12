import React from 'react';
import { loader } from '../assets';

const Loader = ({ message }) => {
    return (
        <div className='fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col'>
            <img src={loader} alt="loader" className='h-[100px] w-[100px] object-contain' />
            <p className='mt-[20px] font-epilogue font-bold text-[20px] text-white text-center'>{message}</p>

        </div>
    )
}

export default Loader