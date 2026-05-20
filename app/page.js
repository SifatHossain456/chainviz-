'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import HeroSection    from '@/components/HeroSection'
import NetworkOverview from '@/components/NetworkOverview'
import ChainRow       from '@/components/ChainRow'

const POLL_MS = 4000

export default function HomePage() {
  const [chains,     setChains]     = useState([])
  const [lastUpdate, setLastUpdate] = useState(null)
  const [loading,    setLoading]    = useState(true)
  const historyRef = useRef({})

  const fetchBlocks = useCallback(async () => {
    try {
      const res = await fetch('/api/blocks', { cache: 'no-store' })
      if (!res.ok) throw new Error('fetch failed')
      const data = await res.json()

      const next = {}
      data.chains.forEach(chain => {
        const prev   = historyRef.current[chain.id] ?? []
        const latest = { ...chain.block, isNew: false }
        const isNew  = prev.length === 0 || prev[0].number !== latest.number
        if (isNew) latest.isNew = true
        next[chain.id] = isNew
          ? [latest, ...prev.slice(0, 7).map(b => ({ ...b, isNew: false }))]
          : prev
      })
      historyRef.current = next

      setChains(data.chains.map(c => ({ ...c, blocks: next[c.id] ?? [] })))
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

  return (
    <>
      <HeroSection chains={chains} loading={loading} lastUpdate={lastUpdate} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 space-y-6">
        {/* Network overview cards */}
        <section aria-label="Network Overview">
          <NetworkOverview chains={chains} loading={loading} />
        </section>

        {/* Live block streams */}
        <section aria-label="Live Block Streams">
          <header className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-[#f0f4ff]">Live Block Streams</h2>
              <p className="text-xs text-[#475569] mt-0.5">
                New blocks slide in as they are mined · Click any block to view on explorer
              </p>
            </div>
            {lastUpdate && (
              <span className="text-[10px] mono text-[#334155] tabular">
                Poll every {POLL_MS / 1000}s
              </span>
            )}
          </header>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="card h-36 skeleton" style={{ animationDelay: `${i * 80}ms` }} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {chains.map(chain => (
                <ChainRow key={chain.id} chain={chain} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  )
}
