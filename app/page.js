'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import ChainRow from '@/components/ChainRow'
import GlobalStats from '@/components/GlobalStats'

const POLL_MS = 4000

export default function HomePage() {
  const [chains, setChains] = useState([])
  const [lastUpdate, setLastUpdate] = useState(null)
  const [loading, setLoading] = useState(true)
  const historyRef = useRef({})

  const fetchBlocks = useCallback(async () => {
    try {
      const res = await fetch('/api/blocks', { cache: 'no-store' })
      if (!res.ok) throw new Error('fetch failed')
      const data = await res.json()

      const next = {}
      data.chains.forEach(chain => {
        const prev = historyRef.current[chain.id] ?? []
        const latest = { ...chain.block, isNew: false }
        const isNewBlock = prev.length === 0 || prev[0].number !== latest.number
        if (isNewBlock) latest.isNew = true
        next[chain.id] = isNewBlock
          ? [latest, ...prev.slice(0, 7).map(b => ({ ...b, isNew: false }))]
          : prev
      })
      historyRef.current = next

      setChains(
        data.chains.map(c => ({ ...c, blocks: next[c.id] ?? [] }))
      )
      setLastUpdate(data.ts)
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBlocks()
    const id = setInterval(fetchBlocks, POLL_MS)
    return () => clearInterval(id)
  }, [fetchBlocks])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center space-y-4 fade-up">
          <div className="text-5xl animate-spin" style={{ display: 'inline-block' }}>⛓</div>
          <p className="text-[#475569] text-sm tracking-widest uppercase">Connecting to chains…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
      <GlobalStats chains={chains} lastUpdate={lastUpdate} />
      <div className="space-y-3">
        {chains.map(chain => (
          <ChainRow key={chain.id} chain={chain} />
        ))}
      </div>
      <p className="text-center text-[10px] text-[#334155] pt-2">
        Data from public RPC endpoints · Refreshes every {POLL_MS / 1000}s · No API key required
      </p>
    </div>
  )
}
