import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/lib/language-context'
import { CursorGlow } from '@/components/cursor-glow'

export const metadata: Metadata = {
  title: 'John Igbokwe - AI & Data Engineer',
  description: 'AI-powered portfolio of John Igbokwe, showcasing projects, experience, and achievements',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
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

