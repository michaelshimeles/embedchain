"use client"
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import NavMenu from './NavMenu';


const MobileNavMenu = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="lg:hidden" size="icon" variant="ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[280px] px-0" side="left">
                <div className="flex flex-col gap-2">
                    <div className="flex h-[60px] items-center px-6">
                        <Link className="flex items-center gap-2 font-semibold" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-replace"><path d="M14 4c0-1.1.9-2 2-2" /><path d="M20 2c1.1 0 2 .9 2 2" /><path d="M22 8c0 1.1-.9 2-2 2" /><path d="M16 10c-1.1 0-2-.9-2-2" /><path d="m3 7 3 3 3-3" /><path d="M6 10V5c0-1.7 1.3-3 3-3h1" /><rect width="8" height="8" x="2" y="14" rx="2" /></svg>
                            <span>EmbedChain</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <NavMenu />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default MobileNavMenu;