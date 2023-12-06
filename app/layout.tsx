import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Provider from '@/utils/provider'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EmbedChain',
  description: 'Permanent Vector Embedding Storage',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {/* Gradient Background */}
              {/* <div className="max-w-2xl w-full h-1/2 absolute top-0 right-0 -z-10 rounded-full bg-gradient-to-bl from-pink-800 via-blue-700/20 to-green-500/20 blur-3xl"></div> */}
              {/* Main Content */}
              {/* <div className="relative z-10"> */}
              {children}
              <Toaster />
              {/* </div> */}
            </ThemeProvider>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  )
}