import { NavBar } from '@/components/NavBar';
import Pricing from '@/components/pricing/Pricing';
import React from 'react'

const PricingPage = ({ }) => {
    return (
        <main className="flex min-w-screen flex-col items-center justify-between">
            <NavBar />
            <div className='flex flex-col items-center mt-[4rem] p-3 '>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                    Pricing
                </h1>
                <Pricing />
            </div>
        </main>
    );
}

export default PricingPage;