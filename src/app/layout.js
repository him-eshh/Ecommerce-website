import GlobalState from '@/globalcontext'
import './globals.css'
import { Inter } from 'next/font/google'
import Bar from '@/components/navigationbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Lihimsu',
  description: 'Lihimsu',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState>
          <Bar />
          <main className="flex min-h-screen flex-col mt-[80px]">{children}</main>
        </GlobalState>
      </body>
    </html>
  )
}
