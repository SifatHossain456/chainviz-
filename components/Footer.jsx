export default function Footer() {
  const chains = ['Ethereum', 'Base', 'Arbitrum', 'Polygon', 'Optimism']

  return (
    <footer
      className="border-t mt-auto"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

          {/* Brand */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black"
                style={{ background: 'linear-gradient(135deg,#627eea,#8247e5,#ff0420)' }}
              >
                ⛓
              </div>
              <span className="font-black text-sm">ChainViz</span>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-3)' }}>
              Real-time block visualizer · Data from public RPCs
            </p>
          </div>

          {/* Chains */}
          <div>
            <p className="text-[9px] uppercase tracking-widest mb-2" style={{ color: 'var(--text-4)' }}>
              Monitored Chains
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {chains.map(c => (
                <li key={c} className="text-xs" style={{ color: 'var(--text-3)' }}>{c}</li>
              ))}
            </ul>
          </div>

          {/* Note */}
          <p className="text-[10px] text-right" style={{ color: 'var(--text-4)' }}>
            No API key required<br />Refreshes every 4 seconds
          </p>
        </div>
      </div>
    </footer>
  )
}
