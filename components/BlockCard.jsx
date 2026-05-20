'use client'
import { useState, useEffect, useRef } from 'react'

function timeAgo(ts) {
  const s = Math.floor((Date.now() / 1000) - ts)
  if (s < 60)   return `${s}s`
  if (s < 3600) return `${Math.floor(s / 60)}m`
  return `${Math.floor(s / 3600)}h`
}

export default function BlockCard({ block, color, explorer, isFirst }) {
  const [age, setAge] = useState(() => timeAgo(block.timestamp))
  const cardRef = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setAge(timeAgo(block.timestamp)), 3000)
    return () => clearInterval(id)
  }, [block.timestamp])

  const gasColor =
    block.gasUsedPct > 85 ? '#f87171' :
    block.gasUsedPct > 55 ? '#fbbf24' :
    '#34d399'

  const explorerUrl = `${explorer}/block/${block.number}`

  return (
    <a
      ref={cardRef}
      href={explorerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex-shrink-0 w-36 rounded-xl border p-3 space-y-2.5 transition-all hover:scale-[1.02] group ${isFirst ? 'block-enter' : ''}`}
      style={{
        '--glow': color + '55',
        background: isFirst ? `${color}10` : '#0a0f1e',
        borderColor: isFirst ? `${color}55` : '#1e293b',
      }}
    >
      <div>
        <p className="text-[8px] uppercase tracking-widest text-[#475569] mb-0.5">Block</p>
        <p
          className="text-[11px] font-mono font-bold truncate group-hover:underline"
          style={{ color: isFirst ? color : '#94a3b8' }}
        >
          #{parseInt(block.number).toLocaleString()}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-[9px] text-[#475569]">Txs</span>
        <span className="text-[10px] font-mono font-bold text-[#e2e8f0]">
          {block.txCount.toLocaleString()}
        </span>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-[9px] text-[#475569]">Gas</span>
          <span className="text-[9px] font-mono" style={{ color: gasColor }}>
            {block.gasUsedPct}%
          </span>
        </div>
        <div className="h-1 bg-[#1e293b] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: `${block.gasUsedPct}%`, background: gasColor }}
          />
        </div>
      </div>

      {block.baseFee !== null && (
        <div className="flex justify-between items-center">
          <span className="text-[9px] text-[#475569]">Base</span>
          <span className="text-[9px] font-mono text-[#64748b]">{block.baseFee}gw</span>
        </div>
      )}

      <p className="text-[8px] text-[#334155] font-mono">{age} ago</p>
    </a>
  )
}
