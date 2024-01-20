"use client"
import { useUser } from "@clerk/nextjs"
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from "react"
import MobileNavMenu from '../navigation/MobileNavMenu'
import NavMenu from '../navigation/NavMenu'

export default function DashboardLayout({ children }: any) {
    return (
        <div className="grid  min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr] ">
            <div className="hidden border-r bg-zinc-100/40 lg:block dark:bg-zinc-800/40">
                <div className="flex flex-col gap-2 h-[100%]">
                    <div className="flex h-[60px] items-center px-6">
                        <Link className="flex items-center gap-2 font-semibold" href="/dashboard">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-replace"><path d="M14 4c0-1.1.9-2 2-2" /><path d="M20 2c1.1 0 2 .9 2 2" /><path d="M22 8c0 1.1-.9 2-2 2" /><path d="M16 10c-1.1 0-2-.9-2-2" /><path d="m3 7 3 3 3-3" /><path d="M6 10V5c0-1.7 1.3-3 3-3h1" /><rect width="8" height="8" x="2" y="14" rx="2" /></svg>
                            <span className="">EmbedChain</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <Suspense fallback={<svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>}>
                            <NavMenu />
                        </Suspense>
                    </div>
                </div>
            </div>
            <div className="flex flex-col h-full overflow-auto">
                <header className="-translate-x-5 lg:hidden sticky top-0 flex min-h-[60px] items-center border-b bg-white px-6 dark:bg-black z-10">
                    <Suspense fallback={<svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>}>
                        <MobileNavMenu />
                    </Suspense>
                </header>
                <Suspense fallback={<svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>}>
                    {children}
                </Suspense>
            </div>
        </div>
    )
}
