import React from 'react';

function Hero3() {
    return (
        <div className='relative w-full min-h-[60vh] flex items-center justify-center bg-black text-white p-8'>
            <div className='max-w-5xl mx-auto text-center space-y-3'>
                <h1 className='text-xl md:text-2xl font-bold uppercase tracking-tight'>
                   A Statement of Power & Identity
                </h1>
                <p className='text-lg md:text max-w-2xl mx-auto text-gray-300'>
ZIRO9’s new drop is here—bold, statement-making pieces that reflect confidence and unstoppable energy. Designed for those who live with strength, dominance, and rebellion, this collection is all about standing out.                </p>
                <button className='mt-8 px-8 py-3  text-white p7 font-medium hover:bg-gray-200 transition-colors duration-300'>
                Wear your attitude.
                </button>
            </div>
        </div>
    );
}

export default Hero3;