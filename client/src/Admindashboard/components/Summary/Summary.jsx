import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const Summary = () => {
    const {balance} = useContext(AuthContext)
    return (
        <div>
            <h1 className='text-3xl mb-5 font-bold'>Account Summary</h1>
            <div className='bg-white p-6 max-w-lg rounded-md'>
                <h1 className='text-2xl font-bold'>Your Balance</h1>
                <div className='flex items-center gap-5'>
                    <h4 className='text-xl'>USD</h4>
                    <h1 className='text-3xl text-blue-500 font-bold'>$ {balance}</h1>
                </div>
            </div>
        </div>
    );
};

export default Summary;