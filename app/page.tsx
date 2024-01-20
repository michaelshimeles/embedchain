import { NavBar } from "@/components/NavBar";
import Pricing from "@/components/pricing/Pricing";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Video from 'next-video';

export default function Home() {
  return (
    <main className="flex min-w-screen flex-col items-center justify-between">
      <NavBar />
      <div className='flex flex-col items-center mt-[4rem] p-3 '>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
          EmbedChain AI
        </h1>
        <p className="leading-7 text-center [&:not(:first-child)]:mt-3">
          Store your Vector Embeddings Securely, Cost Effectively, & Permanently.
        </p>
        <div className="mt-4">
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        </div>
        <div className="pt-5 w-[60rem]">
          <Video src={"https://mrhirufvbnthpmbpxkvu.supabase.co/storage/v1/object/public/files/Vector.mp4?t=2024-01-15T07%3A59%3A54.718Z"} />
        </div>
      </div>
    </main>
  )
}
