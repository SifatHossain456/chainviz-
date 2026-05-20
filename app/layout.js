import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'ChainViz — Live Block Visualizer',
  description: 'Real-time block production across Ethereum, Base, Arbitrum, Polygon & Optimism.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
