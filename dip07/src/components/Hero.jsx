import React from 'react';

function Hero() {
    return (
        <div className='relative w-full min-h-[60vh] flex items-center justify-center bg-black text-white p-8'>
            <div className='max-w-5xl mx-auto text-center space-y-3'>
                <h1 className='text-xl md:text-2xl font-bold uppercase tracking-tight'>
                    Built Different. <span className='text-gray-300'>Worn to Rule.</span>
                </h1>
                <p className='text-lg md:text max-w-2xl mx-auto text-gray-300'>
                    ZIRO9 T-shirts aren't trends—they're power moves. For the ones who lead, not follow.
                    This drop? It's for the legacy-makers.
                </p>
                <button className='mt-8 px-8 py-3  text-white p7 font-medium hover:bg-gray-200 transition-colors duration-300'>
                    SHOP THE DROP
                </button>
            </div>
        </div>
    );
}

export default Hero;