"use client"
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs';
import { Label } from '@/components/ui/label';
import { useGetUserInfo } from '@/utils/hook/useGetUserInfo';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast"

const Settings = ({ }) => {
    const { user } = useUser()
    const { data: info, error } = useGetUserInfo(user?.id!)
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { toast } = useToast()

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard');
            toast({
                description: "Copied to clipboard.",
            })

            // You can also set a state to show a success message
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }


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
                <div className='flex items-center gap-1'>
                    <Input type={showPassword ? "text" : "password"} disabled value={info?.[0]?.apiKey} className='rounded-full h-[35px] w-[20rem]' />
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(info?.[0]?.apiKey)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                    </Button>
                </div>
                <Button className='rounded-full w-[5rem]' variant="outline" onClick={() => setShowPassword((prev) => !prev)}>{!showPassword ? "Show" : "Hide"}</Button>
            </div>
        </div>);
}

export default Settings;