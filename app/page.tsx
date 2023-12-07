import { NavBar } from "@/components/NavBar";
import Pricing from "@/components/pricing/Pricing";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-w-screen flex-col items-center justify-between">
      <NavBar />
      <div className='flex flex-col items-center mt-[4rem] p-3 '>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
          EmbedChain
        </h1>
        <p className="leading-7 text-center [&:not(:first-child)]:mt-3">
          Store your Vector Embeddings Securely, Cost Effectively, & Permanently.
        </p>
        <div className="mt-4">
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        </div>
        <div className="pt-5">
          <iframe frameBorder="0" width="900" height="560" src="https://www.youtube.com/embed/KRNDRT4WDiE?si=sRBbDsOVSSlN0qh7" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
      </div>
    </main>
  )
}
