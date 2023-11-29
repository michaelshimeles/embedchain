"use client"
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
        </div>
    );
}

export default Dashboard;