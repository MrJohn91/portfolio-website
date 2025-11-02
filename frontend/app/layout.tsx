import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'John Igbokwe - AI & Data Engineer',
  description: 'AI-powered portfolio of John Igbokwe, showcasing projects, experience, and achievements',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

