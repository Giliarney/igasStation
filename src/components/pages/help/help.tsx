"use client"

import React  from 'react';

const Help: React.FC = () => {

    return (
        <div className="mt-80 flex flex-col items-center justify-center">
            <div className='w-[25%]'>
                <img src="/assets/em-construcao.png" alt="" />
            </div>
            
            <div className='flex flex-col text-center'>
                <h1 className="w-full h-full items-center justify-center text-slate-700 text-xl lg:text-2xl">
                    Desculpe!
                </h1>
                <p className="w-full h-full items-center justify-center text-slate-500 text-sm md:text-base">
                    Página em desenvolvimento...
                </p>
            </div>
        </div>
    );
};

export default Help;
