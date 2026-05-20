'use client'

const CHAIN_META = {
  1:     { short: 'ETH',  name: 'Ethereum',  color: '#627eea', icon: '⟠' },
  8453:  { short: 'BASE', name: 'Base',      color: '#2563eb', icon: '🔵' },
  42161: { short: 'ARB',  name: 'Arbitrum',  color: '#12aaff', icon: '🔷' },
  137:   { short: 'POL',  name: 'Polygon',   color: '#8247e5', icon: '🟣' },
  10:    { short: 'OP',   name: 'Optimism',  color: '#ff0420', icon: '🔴' },
}

function GasBadge({ gwei }) {
  if (!gwei) return null
  const level = gwei < 5 ? 'low' : gwei < 30 ? 'med' : 'high'
  const cls   = level === 'low' ? 'badge-green' : level === 'med' ? 'badge-yellow' : 'badge-red'
  const label = level === 'low' ? 'Low' : level === 'med' ? 'Med' : 'High'
  return <span className={`badge ${cls}`}>{label}</span>
}

export default function NetworkOverview({ chains, loading }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-3)' }}>
        Network Status
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="card h-28 skeleton" style={{ animationDelay: `${i * 60}ms` }} />
            ))
          : chains.map(chain => {
              const meta    = CHAIN_META[chain.id] ?? {}
              const latest  = chain.blocks?.[0]
              const online  = !!latest

              return (
                <article
                  key={chain.id}
                  className="card px-4 py-3 space-y-2.5"
                  aria-label={`${meta.name} status`}
                >
                  {/* Header */}
                  <header className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: chain.color }}
                      />
                      <span className="text-xs font-bold">{meta.short}</span>
                    </div>
                    <span
                      className="w-1.5 h-1.5 rounded-full live-dot"
                      style={{ background: online ? 'var(--green)' : 'var(--text-4)' }}
                      aria-label={online ? 'online' : 'connecting'}
                    />
                  </header>

                  {/* Block number */}
                  <div>
                    <p className="text-[8px] uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-3)' }}>
                      Latest Block
                    </p>
                    <p className="text-xs font-bold mono" style={{ color: chain.color }}>
                      {latest ? `#${parseInt(latest.number).toLocaleString()}` : '—'}
                    </p>
                  </div>

                  {/* Gas */}
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] mono" style={{ color: 'var(--text-2)' }}>
                      {chain.gasPrice ? `${chain.gasPrice} gwei` : '—'}
                    </span>
                    <GasBadge gwei={chain.gasPrice} />
                  </div>

                  {/* Tx count */}
                  {latest && (
                    <p className="text-[9px]" style={{ color: 'var(--text-3)' }}>
                      <span className="mono font-semibold" style={{ color: 'var(--text-2)' }}>
                        {latest.txCount.toLocaleString()}
                      </span>{' '}txs · <span className="mono">{latest.gasUsedPct}%</span> gas
                    </p>
                  )}
                </article>
              )
            })
        }
      </div>
    </div>
  )
}
