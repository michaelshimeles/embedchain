"use client"
import { NavBar } from "@/components/NavBar";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="flex flex-col h-full items-center justify-center">
            <NavBar />
            <div className='mt-[3rem]'>
                <SignIn />
            </div>
        </div>
    );
}