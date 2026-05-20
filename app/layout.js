import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'ChainViz — Live Block Visualizer',
  description: 'Real-time block production visualizer across Ethereum, Base, Arbitrum, Polygon & Optimism. Watch blocks appear as they are mined.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Navbar />
        </header>
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
