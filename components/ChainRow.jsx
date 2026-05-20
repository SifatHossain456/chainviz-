'use client'
import BlockCard from './BlockCard'

function tps(blocks, avgBlockTime) {
  if (blocks.length >= 2) {
    const dt = blocks[0].timestamp - blocks[1].timestamp
    if (dt > 0) return (blocks[0].txCount / dt).toFixed(1)
  }
  if (blocks.length === 1) return (blocks[0].txCount / avgBlockTime).toFixed(1)
  return null
}

function GasLabel({ gwei, color }) {
  const level = gwei < 5 ? 'Low' : gwei < 30 ? 'Med' : 'High'
  const cls   = level === 'Low' ? 'badge-green' : level === 'Med' ? 'badge-yellow' : 'badge-red'
  return (
    <>
      <span className="mono text-[10px]" style={{ color }}>
        {gwei} gwei
      </span>
      <span className={`badge ${cls}`}>{level}</span>
    </>
  )
}

export default function ChainRow({ chain }) {
  const { label, color, gasPrice, avgBlockTime, explorer, blocks = [] } = chain
  const latest   = blocks[0]
  const chainTps = tps(blocks, avgBlockTime)

  return (
    <article
      className="card overflow-hidden"
      aria-label={`${label} block stream`}
    >
      {/* ── Row header ───────────────────────────────── */}
      <header
        className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3 border-b"
        style={{ borderColor: 'var(--border)' }}
      >
        {/* Chain identity */}
        <div className="flex items-center gap-2.5 min-w-[120px]">
          <span
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ background: color, boxShadow: `0 0 8px ${color}60` }}
          />
          <h3 className="text-sm font-bold">{label}</h3>
        </div>

        {latest ? (
          <>
            {/* Block number */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px]" style={{ color: 'var(--text-3)' }}>Block</span>
              <span className="text-[11px] font-bold mono" style={{ color: 'var(--text-2)' }}>
                #{parseInt(latest.number).toLocaleString()}
              </span>
            </div>

            {/* TPS */}
            {chainTps && (
              <div className="flex items-center gap-1.5">
                <span className="text-[10px]" style={{ color: 'var(--text-3)' }}>TPS</span>
                <span className="text-[11px] font-bold mono" style={{ color }}>
                  {chainTps}
                </span>
              </div>
            )}

            {/* Gas */}
            <div className="flex items-center gap-2">
              <span className="text-[10px]" style={{ color: 'var(--text-3)' }}>Gas</span>
              {gasPrice != null && <GasLabel gwei={gasPrice} color={color} />}
            </div>

            {/* Summary */}
            <div className="ml-auto text-[10px] mono" style={{ color: 'var(--text-4)' }}>
              {latest.txCount.toLocaleString()} txs · {latest.gasUsedPct}% gas used
            </div>
          </>
        ) : (
          <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-3)' }}>
            <span className="w-1.5 h-1.5 rounded-full live-dot" style={{ background: 'var(--text-4)' }} />
            Connecting…
          </span>
        )}
      </header>

      {/* ── Block stream ──────────────────────────────── */}
      <div
        className="flex gap-2.5 px-4 py-3 no-scrollbar overflow-x-auto"
        role="list"
        aria-label={`Recent ${label} blocks`}
      >
        {blocks.length === 0
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[140px] h-[136px] rounded-2xl skeleton"
                style={{ animationDelay: `${i * 80}ms` }}
                aria-hidden="true"
              />
            ))
          : blocks.map((block, i) => (
              <div key={block.number} role="listitem">
                <BlockCard
                  block={block}
                  color={color}
                  explorer={explorer}
                  isFirst={i === 0 && block.isNew}
                />
              </div>
            ))
        }
      </div>
    </article>
  )
}
