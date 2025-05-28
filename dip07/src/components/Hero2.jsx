import React from 'react';

function Hero2() {
    return (
        <div className='relative w-full min-h-[60vh] flex items-center justify-center bg-black text-white p-8'>
            <div className='max-w-5xl mx-auto text-center space-y-3'>
                <h1 className='text-xl md:text-2xl font-bold uppercase tracking-tight'>
                    Not Just a Scent, <span className='text-gray-300'>It’s a Legacy</span>
                </h1>
                <p className='text-lg md:text max-w-2xl mx-auto text-gray-300'>
               ZIRO9’s new fragrance drop is here—bold, dominant, and unforgettable. Mafia commands respect, Millionaire exudes success. More than just scents, they define who you are.
                </p>
                <button className='mt-8 px-8 py-3  text-white p7 font-medium hover:bg-gray-200 transition-colors duration-300'>
                   Wear your legacy.
                </button>
            </div>
        </div>
    );
}

export default Hero2;