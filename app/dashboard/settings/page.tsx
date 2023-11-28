"use client"
import { Input } from '@/components/ui/input';
import React from 'react'
import { useUser } from '@clerk/nextjs';
import { Label } from '@/components/ui/label';
interface pageProps {

}

const page: React.FC<pageProps> = ({ }) => {
    const { user } = useUser()
    return (
        <div className='flex flex-col p-8 gap-2'>
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
                Settings
            </h2>
            <div className='flex flex-col gap-2 pt-2'>
                <Label>User Id</Label>
                <Input disabled value={user?.id} className='rounded-full h-[35px] w-[20rem]' />
            </div>
            <div className='flex flex-col gap-2 pt-2'>
                <Label>API key</Label>
                <Input disabled type='password' value={user?.id} className='rounded-full h-[35px] w-[20rem]' />
            </div>
        </div>);
}

export default page;