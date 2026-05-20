import Link from 'next/link'

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-md border-b"
      style={{ background: 'rgba(3,7,18,.92)', borderColor: 'var(--border)' }}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="ChainViz home">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-base font-black shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #627eea 0%, #8247e5 50%, #ff0420 100%)',
              boxShadow: '0 0 16px rgba(98,126,234,.35)',
            }}
          >
            ⛓
          </div>
          <div>
            <span className="font-black text-sm tracking-tight text-[#f0f4ff]">ChainViz</span>
            <span className="hidden sm:inline text-[10px] text-[#475569] ml-2 uppercase tracking-widest">
              Block Explorer
            </span>
          </div>
        </Link>

        {/* Chain pills */}
        <div className="hidden md:flex items-center gap-1.5 ml-4" aria-label="Monitored chains">
          {[
            { name: 'ETH',  color: '#627eea' },
            { name: 'Base', color: '#2563eb' },
            { name: 'ARB',  color: '#12aaff' },
            { name: 'POL',  color: '#8247e5' },
            { name: 'OP',   color: '#ff0420' },
          ].map(c => (
            <span
              key={c.name}
              className="text-[10px] font-bold px-2 py-0.5 rounded-full mono"
              style={{ background: `${c.color}18`, color: c.color }}
            >
              {c.name}
            </span>
          ))}
        </div>

        {/* Live indicator */}
        <div className="ml-auto flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full live-dot"
            style={{ background: 'var(--green)' }}
            aria-label="Live data"
          />
          <span className="text-xs text-[#475569] hidden sm:block">Live · 5 Chains</span>
        </div>
      </div>
    </nav>
  )
}
