'use client'
import BlockCard from './BlockCard'

function gasLevel(gwei) {
  if (gwei < 5)   return { label: 'Low', color: '#34d399' }
  if (gwei < 30)  return { label: 'Med', color: '#fbbf24' }
  return { label: 'High', color: '#f87171' }
}

export default function ChainRow({ chain }) {
  const { label, color, symbol, gasPrice, avgBlockTime, explorer, blocks = [] } = chain
  const latest = blocks[0]

  const tps = (() => {
    if (blocks.length < 2) return latest ? (latest.txCount / avgBlockTime).toFixed(1) : null
    const dt = blocks[0].timestamp - blocks[1].timestamp
    return dt > 0 ? (blocks[0].txCount / dt).toFixed(1) : null
  })()

  const gas = gasLevel(gasPrice ?? 0)

  return (
    <div className="bg-[#070d1a] border border-[#1e293b] rounded-2xl overflow-hidden hover:border-[#1e3a5f] transition-colors">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 px-5 py-3 border-b border-[#1e293b]">
        <div className="flex items-center gap-2.5 min-w-[120px]">
          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
          <span className="text-sm font-bold">{label}</span>
        </div>

        {latest ? (
          <>
            <div className="text-xs text-[#475569]">
              #<span className="font-mono text-[#94a3b8]">{parseInt(latest.number).toLocaleString()}</span>
            </div>
            {tps && (
              <div className="text-xs text-[#475569]">
                TPS <span className="font-mono" style={{ color }}>{tps}</span>
              </div>
            )}
            <div className="text-xs text-[#475569]">
              Gas <span className="font-mono text-[10px] px-1.5 py-0.5 rounded" style={{ color: gas.color, background: gas.color + '15' }}>
                {gasPrice} gwei · {gas.label}
              </span>
            </div>
            <div className="ml-auto text-xs text-[#334155] font-mono">
              {latest.txCount.toLocaleString()} txs · {latest.gasUsedPct}% gas
            </div>
          </>
        ) : (
          <span className="text-xs text-[#334155] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1e293b] live-dot" />
            Fetching…
          </span>
        )}
      </div>

      {/* Block stream */}
      <div className="flex gap-2.5 px-3 py-3 overflow-x-auto scrollbar-hide">
        {blocks.length === 0 ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-36 h-[108px] rounded-xl bg-[#0a0f1e] border border-[#1e293b] animate-pulse" />
          ))
        ) : (
          blocks.map((block, i) => (
            <BlockCard
              key={block.number}
              block={block}
              color={color}
              explorer={explorer}
              isFirst={i === 0 && block.isNew}
            />
          ))
        )}
      </div>
    </div>
  )
}
