import PdfToBase64 from '@/components/PdfToBase64'
import DashboardLayout from '@/components/dashboard/layout/Layout'
import type { Metadata } from 'next'

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
        <DashboardLayout>
            {children}
        </DashboardLayout>

    )
}