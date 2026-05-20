import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#030712]/95 backdrop-blur border-b border-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 h-12 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#627eea] via-[#8247e5] to-[#ff0420] flex items-center justify-center text-sm font-black">
            ⛓
          </div>
          <span className="font-black text-sm tracking-tight">ChainViz</span>
        </Link>

        <div className="ml-auto flex items-center gap-3 text-xs text-[#475569]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-dot" />
            Live · 5 Chains
          </span>
          <span className="hidden sm:block">ETH · Base · Arbitrum · Polygon · Optimism</span>
        </div>
      </div>
    </nav>
  )
}
