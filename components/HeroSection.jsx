'use client'
import { useState, useEffect } from 'react'

export default function HeroSection({ chains, loading, lastUpdate }) {
  const [age, setAge] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setAge(lastUpdate ? Math.round((Date.now() - lastUpdate) / 1000) : 0)
    }, 1000)
    return () => clearInterval(id)
  }, [lastUpdate])

  const totalTxs = chains.reduce((s, c) => s + (c.blocks?.[0]?.txCount ?? 0), 0)
  const active   = chains.filter(c => c.blocks?.length > 0).length

  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden border-b"
      style={{ borderColor: 'var(--border)' }}
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 20% 50%, #627eea22 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 50%, #8247e522 0%, transparent 60%)',
        }}
      />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">

          {/* Left: headline */}
          <div className="space-y-4 fade-up max-w-xl">
            <div className="inline-flex items-center gap-2 badge badge-green">
              <span className="w-1.5 h-1.5 rounded-full live-dot" style={{ background: 'var(--green)' }} />
              Live · Real-time data
            </div>
            <h1 className="text-3xl sm:text-4xl font-black leading-tight" style={{ color: 'var(--text-1)' }}>
              Watch blocks appear<br />
              <span style={{ background: 'linear-gradient(90deg,#627eea,#8247e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                as they are mined
              </span>
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Real-time block production across 5 major EVM chains.
              Every block slides in the moment it hits the chain — no refresh needed.
            </p>
          </div>

          {/* Right: live counters */}
          <dl
            className="grid grid-cols-3 gap-4 shrink-0"
            aria-label="Live network statistics"
          >
            <StatBox
              label="Chains"
              value={loading ? '…' : `${active}/5`}
              color="var(--cyan)"
            />
            <StatBox
              label="Latest Txs"
              value={loading ? '…' : totalTxs > 0 ? totalTxs.toLocaleString() : '…'}
              color="#f0f4ff"
            />
            <StatBox
              label="Updated"
              value={loading ? '…' : `${age}s`}
              color="var(--green)"
            />
          </dl>
        </div>
      </div>
    </section>
  )
}

function StatBox({ label, value, color }) {
  return (
    <div
      className="card px-4 py-3 text-center min-w-[80px]"
      style={{ borderColor: 'var(--border)' }}
    >
      <dt className="text-[9px] uppercase tracking-widest mb-1" style={{ color: 'var(--text-3)' }}>
        {label}
      </dt>
      <dd className="text-xl font-black mono tabular" style={{ color }}>
        {value}
      </dd>
    </div>
  )
}
