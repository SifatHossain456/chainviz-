'use client'
import { useState, useEffect } from 'react'

export default function GlobalStats({ chains, lastUpdate }) {
  const [age, setAge] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setAge(lastUpdate ? Math.round((Date.now() - lastUpdate) / 1000) : 0)
    }, 1000)
    return () => clearInterval(id)
  }, [lastUpdate])

  const active = chains.filter(c => c.blocks?.length > 0).length

  const totalTps = chains.reduce((sum, c) => {
    const blocks = c.blocks ?? []
    if (blocks.length < 2) return sum + (c.avgBlockTime > 0 ? (blocks[0]?.txCount ?? 0) / c.avgBlockTime : 0)
    const dt = blocks[0].timestamp - blocks[1].timestamp
    return dt > 0 ? sum + blocks[0].txCount / dt : sum
  }, 0)

  const avgGas = chains.length > 0
    ? (chains.reduce((s, c) => s + (c.gasPrice ?? 0), 0) / chains.length).toFixed(1)
    : null

  return (
    <aside
      className="card flex flex-wrap items-center gap-x-6 gap-y-3 px-5 py-3.5"
      aria-label="Global network statistics"
    >
      <div className="flex items-center gap-2 shrink-0">
        <span className="w-2 h-2 rounded-full live-dot" style={{ background: 'var(--green)' }} aria-hidden />
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--green)' }}>
          Live
        </span>
      </div>

      <div className="w-px h-4 hidden sm:block" style={{ background: 'var(--border)' }} aria-hidden />

      <StatItem label="Total TPS"   value={totalTps > 0 ? totalTps.toFixed(1) : '…'} />
      <StatItem label="Active"      value={`${active} / 5 chains`} />
      {avgGas && <StatItem label="Avg Gas" value={`${avgGas} gwei`} color="var(--yellow)" />}

      <div className="ml-auto text-[10px] mono tabular" style={{ color: 'var(--text-4)' }}>
        {age}s ago
      </div>
    </aside>
  )
}

function StatItem({ label, value, color }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[9px] uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>{label}</span>
      <span className="text-sm font-bold mono" style={color ? { color } : { color: 'var(--text-1)' }}>{value}</span>
    </div>
  )
}
