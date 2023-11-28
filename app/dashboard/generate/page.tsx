import PdfToBase64 from '@/components/PdfToBase64';
import React from 'react'

interface GenerateProps {

}

const Generate: React.FC<GenerateProps> = ({ }) => {
    return (
        <main className='p-8'>
            <div className='flex flex-col gap-3 w-[80%]'>
                <h1 className="scroll-m-20 font-semibold tracking-tight text-2xl">
                    Generate Embeddings
                </h1>
                <div className='pt-3'>
                    <PdfToBase64 />
                </div>
            </div>
        </main>
    );
}

export default Generate;