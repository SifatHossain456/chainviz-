import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: { default: 'ChainViz — Live Block Visualizer', template: '%s — ChainViz' },
  description: 'Real-time block production visualizer across Ethereum, Base, Arbitrum, Polygon & Optimism. Watch blocks appear as they are mined.',
  keywords: ['blockchain', 'block explorer', 'Ethereum', 'Base', 'Arbitrum', 'live blocks', 'web3'],
  openGraph: {
    title: 'ChainViz — Live Block Visualizer',
    description: 'Watch blocks appear in real-time across Ethereum, Base, Arbitrum, Polygon & Optimism.',
    type: 'website',
    siteName: 'ChainViz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChainViz — Live Block Visualizer',
    description: 'Real-time block production across 5 EVM chains.',
  },
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
