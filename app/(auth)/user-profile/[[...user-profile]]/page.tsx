"use client"
import React from 'react'
import { UserProfile, useUser } from "@clerk/nextjs";
import { NavBar } from '@/components/NavBar';


const UserProfilePage = () => {
    const { isLoaded, isSignedIn, user } = useUser();

    return (
        <div className="flex flex-col h-full items-center justify-center">
            <NavBar />
            <div className='mt-[3rem]'>
                <UserProfile path="/user-profile" routing="path" />
            </div>
        </div>
    )
}


export default UserProfilePage;