"use client"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CodeBlock } from '@skeletonlabs/skeleton';

const Dashboard = ({ }) => {

    return (
        <div className='flex flex-col w-full p-6'>
            <div className='flex justify-end'>
                <Link href="/">
                    <Button>Home</Button>
                </Link>
            </div>
            <h2 className="mt-3 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                How it works
            </h2>
            <div className='mt-4'>
                <div className='flex items-center gap-1'>
                    <p>Get your API key from
                    </p>
                    <Link className='flex items-center gap-1 hover:underline' href={'/dashboard/settings'}>
                        Settings
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg>
                    </Link>
                </div>
                <br />
                <p>Fetch your embeddings:</p>
                <div className='flex flex-col mt-4 gap-3'>
                    <code className='flex px-4 py-2 border rounded-full'>
                        <p>
                            const response = await fetch(&quot;https://embedchain.vercel.app/api/embed&quot;, {
                                `headers: {
                                "x-api-key": API_KEY
                            }`
                            })
                        </p>
                    </code>
                    <code className='flex px-4 py-2 border rounded-full'>
                        <p>
                            curl -H &quot;x-api-key: API_KEY&quot; &quot;https://embedchain.vercel.app/api/embed&quot;
                        </p>
                    </code>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;