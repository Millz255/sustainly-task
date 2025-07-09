// app/layout.tsx
import './globals.css'
import type { Metadata, Viewport } from 'next'
import { gilroy, inter } from './fonts'
import { ThemeProvider } from '@/components/ui/theme-provider'

export const metadata: Metadata = {
  title: 'Sustainly',
  description: 'Sustainly: ESG reporting and carbon footprint calculation.',
  icons: {
    icon: '/favicon.ico',
    
    apple: '/apple-touch-icon.png', 
    shortcut: '/favicon.ico', 
  },
  manifest: '/site.webmanifest', 
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${gilroy.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}