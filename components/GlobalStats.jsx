'use client'
import { useState, useEffect } from 'react'

function StatItem({ label, value, color }) {
  return (
    <div className="flex flex-col items-center sm:items-start gap-0.5">
      <span className="text-[9px] uppercase tracking-widest text-[#475569]">{label}</span>
      <span className="text-lg font-black font-mono tabular-nums" style={color ? { color } : {}}>
        {value}
      </span>
    </div>
  )
}

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
    if (blocks.length < 2) return sum + (blocks[0]?.txCount ?? 0) / c.avgBlockTime
    const dt = blocks[0].timestamp - blocks[1].timestamp
    if (dt <= 0) return sum
    return sum + blocks[0].txCount / dt
  }, 0)

  const totalTxsInLatest = chains.reduce((s, c) => s + (c.blocks?.[0]?.txCount ?? 0), 0)

  const avgGas = chains.length > 0
    ? (chains.reduce((s, c) => s + (c.gasPrice ?? 0), 0) / chains.length).toFixed(1)
    : null

  return (
    <div className="bg-[#0a0f1e] border border-[#1e293b] rounded-2xl px-5 py-4">
      <div className="flex flex-wrap gap-6 items-center">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 live-dot" />
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Live</span>
        </div>

        <div className="w-px h-8 bg-[#1e293b] hidden sm:block" />

        <StatItem label="Total TPS" value={totalTps > 0 ? totalTps.toFixed(1) : '…'} color="#f1f5f9" />
        <StatItem label="Txs (latest blocks)" value={totalTxsInLatest > 0 ? totalTxsInLatest.toLocaleString() : '…'} />
        <StatItem label="Active Chains" value={`${active} / 5`} color="#22d3ee" />
        {avgGas && <StatItem label="Avg Gas" value={`${avgGas} gwei`} color="#fb923c" />}

        <div className="ml-auto text-[10px] text-[#334155] font-mono tabular-nums">
          {age}s ago
        </div>
      </div>
    </div>
  )
}
