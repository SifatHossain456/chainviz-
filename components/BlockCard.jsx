'use client'
import { useState, useEffect } from 'react'

function elapsed(ts) {
  const s = Math.max(0, Math.floor(Date.now() / 1000 - ts))
  if (s < 60)   return `${s}s ago`
  if (s < 3600) return `${Math.floor(s / 60)}m ago`
  return `${Math.floor(s / 3600)}h ago`
}

function gasColor(pct) {
  if (pct > 85) return 'var(--red)'
  if (pct > 55) return 'var(--yellow)'
  return 'var(--green)'
}

export default function BlockCard({ block, color, explorer, isFirst }) {
  const [age, setAge] = useState(() => elapsed(block.timestamp))

  useEffect(() => {
    const id = setInterval(() => setAge(elapsed(block.timestamp)), 5000)
    return () => clearInterval(id)
  }, [block.timestamp])

  const fill    = gasColor(block.gasUsedPct)
  const blockN  = parseInt(block.number).toLocaleString()
  const href    = `${explorer}/block/${block.number}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Block #${blockN} — ${block.txCount} transactions`}
      className={`flex-shrink-0 w-[140px] rounded-2xl border p-3.5 space-y-3 transition-all duration-200 group outline-none focus-visible:ring-2 ${isFirst ? 'block-enter' : ''}`}
      style={{
        '--glow-c':    `${color}44`,
        background:    isFirst ? `${color}10` : 'var(--bg-card)',
        borderColor:   isFirst ? `${color}50` : 'var(--border)',
      }}
    >
      {/* Block number */}
      <header className="space-y-0.5">
        <p className="text-[8px] uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
          Block
        </p>
        <p
          className="text-[11px] font-bold mono group-hover:underline"
          style={{ color: isFirst ? color : 'var(--text-2)' }}
        >
          #{blockN}
        </p>
      </header>

      {/* Tx count */}
      <div className="flex items-center justify-between">
        <span className="text-[9px]" style={{ color: 'var(--text-3)' }}>Txs</span>
        <span className="text-[11px] font-bold mono tabular" style={{ color: 'var(--text-1)' }}>
          {block.txCount.toLocaleString()}
        </span>
      </div>

      {/* Gas used bar */}
      <div aria-label={`Gas used: ${block.gasUsedPct}%`}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px]" style={{ color: 'var(--text-3)' }}>Gas</span>
          <span className="text-[9px] mono font-semibold" style={{ color: fill }}>
            {block.gasUsedPct}%
          </span>
        </div>
        <div className="gas-bar">
          <div className="gas-bar-fill" style={{ width: `${block.gasUsedPct}%`, background: fill }} />
        </div>
      </div>

      {/* Base fee */}
      {block.baseFee !== null && (
        <div className="flex items-center justify-between">
          <span className="text-[9px]" style={{ color: 'var(--text-3)' }}>Base fee</span>
          <span className="text-[9px] mono" style={{ color: 'var(--text-3)' }}>
            {block.baseFee} gw
          </span>
        </div>
      )}

      {/* Age */}
      <footer>
        <time
          dateTime={new Date(block.timestamp * 1000).toISOString()}
          className="text-[8px] mono"
          style={{ color: 'var(--text-4)' }}
        >
          {age}
        </time>
      </footer>
    </a>
  )
}
