import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/lib/language-context'
import { CursorGlow } from '@/components/cursor-glow'

export const metadata: Metadata = {
  title: 'John Igbokwe - AI & Data Engineer',
  description: 'AI-powered portfolio of John Igbokwe, showcasing projects, experience, and achievements',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CursorGlow />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}

