"use client"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation'

const Dashboard = ({ }) => {
    const pathname = usePathname()

    return (
        <div className='flex flex-col items-end p-6'>
            <Link href="/">
                <Button>Home</Button>
            </Link>
            <div className='flex flex-col items-start w-full mt-3'>
                Current Pathname: {pathname}
            </div>
        </div>
    );
}

export default Dashboard;