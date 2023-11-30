"use client"
import { NavBar } from "@/components/NavBar";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (

        <div className="flex flex-col h-full items-center justify-center">
            <NavBar />
            <div className='mt-[3rem]'>
                <SignUp />
            </div>
        </div>
    );
}