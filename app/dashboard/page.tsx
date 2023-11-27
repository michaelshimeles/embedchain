"use client"
import PdfToBase64 from '@/components/PdfToBase64';
import { useState } from 'react';

interface DashboardProps {

}

const Dashboard: React.FC<DashboardProps> = ({ }) => {
    return (
        <main className="flex min-w-screen flex-col items-center justify-between">
            <div className='flex flex-col pt-[3rem] gap-3 w-[80%]'>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Generate Embeddings
                </h1>
                <div className='pt-5'>
                    <PdfToBase64 />
                </div>
            </div>
        </main>
    );
}

export default Dashboard;