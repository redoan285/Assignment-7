import React from 'react';
import SummaryCards from './SummaryCards';

const Banner = () => {
    return (
        <div className='min-h-[70vh] bg-gray-50 text-center container mx-auto flex flex-col items-center space-y-4  gap-4'>
            <h1 className='text-3xl font-black font-bold mt-4'>Friends to keep close in your life</h1>
            <p className='text-gray-500'>Your personal shelf of meaningful connections. Browse, tend, and nurture the <br />
relationships that matter most.</p>
<button className='btn bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-600'>+ Add a Friend</button>
<SummaryCards />
        </div>
    );
};

export default Banner;