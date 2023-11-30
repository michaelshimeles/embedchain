"use client"
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"

export default function Pricing() {
  const { isSignedIn } = useUser()

  console.log("user", isSignedIn)

  return (
    <section className="min-h-screen w-full flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
          <div className="flex flex-col p-6 shadow-lg rounded-lg  justify-between border border-gray-300">
            <div>
              <h3 className="text-2xl font-bold text-center">Free</h3>
              <div className="mt-4 text-center">
                <span className="text-4xl font-bold">$0</span>/ month
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Unlimited Embeddings
                </li>
                <li className="flex items-center">
                  <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  10 PDFs stored forever
                </li>
                <li className="flex items-center">
                  <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  100 requests per day
                </li>
              </ul>
            </div>
            {isSignedIn
              ?
              <Link href="/dashboard">
                <div className="mt-6">
                  <Button className="w-full">Get Started</Button>
                </div>
              </Link>
              :
              <Link href="/sign-up">
                <div className="mt-6">
                  <Button className="w-full">Get Started</Button>
                </div>
              </Link>
            }
          </div>
          <div className="relative flex flex-col p-6 shadow-lg rounded-lg justify-between border border-purple-500">
            <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Popular
            </div>
            <div>
              <h3 className="text-2xl font-bold text-center">Pro</h3>
              <div className="mt-4 text-center">
                <span className="text-4xl font-bold">$50</span>/ month
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <IconCheck className="text-white text-2xs bg-green-500 rounded-full mr-2 p-1" />
                  Unlimited Embeddings
                </li>
                <li className="flex items-center">
                  <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  1000 PDFs stored forever
                </li>
                <li className="flex items-center">
                  <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  1000 requests per day
                </li>
              </ul>
            </div>
            {isSignedIn
              ?
              <Link href="https://buy.stripe.com/test_00g5m900YgNR3JK000">
                <div className="mt-6">
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500">Get Started</Button>
                </div>
              </Link>
              :
              <Link href="/sign-up">
                <div className="mt-6">
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500">Get Started</Button>
                </div>
              </Link>
            }
          </div>
          <div className="flex flex-col p-6 shadow-lg rounded-lg  justify-between border border-gray-300">
            <div>
              <h3 className="text-2xl font-bold text-center">Enterprise</h3>
              <div className="py-4 text-center">

              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Unlimited Embeddings
                </li>
                <li className="flex items-center">
                  <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Unlimited PDFs stored forever
                </li>
                <li className="flex items-center">
                  <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Unlimited API requests
                </li>
                <li className="flex items-center">
                  <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  Dedicated Support
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Link href="https://cal.com/michaelshimeles/15min">
                <Button className="w-full">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function IconCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
