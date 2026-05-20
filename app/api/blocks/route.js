import { createPublicClient, http, formatGwei } from 'viem'
import { mainnet, base, arbitrum, polygon, optimism } from 'viem/chains'

const CHAINS = [
  { chain: mainnet,  rpc: 'https://cloudflare-eth.com',        label: 'Ethereum',  symbol: 'ETH',  color: '#627eea', avgBlockTime: 12 },
  { chain: base,     rpc: 'https://mainnet.base.org',          label: 'Base',      symbol: 'ETH',  color: '#0052ff', avgBlockTime: 2 },
  { chain: arbitrum, rpc: 'https://arb1.arbitrum.io/rpc',      label: 'Arbitrum',  symbol: 'ETH',  color: '#12aaff', avgBlockTime: 0.25 },
  { chain: polygon,  rpc: 'https://polygon-rpc.com',           label: 'Polygon',   symbol: 'POL',  color: '#8247e5', avgBlockTime: 2 },
  { chain: optimism, rpc: 'https://mainnet.optimism.io',       label: 'Optimism',  symbol: 'ETH',  color: '#ff0420', avgBlockTime: 2 },
]

export async function GET() {
  const results = await Promise.allSettled(
    CHAINS.map(async ({ chain, rpc, label, symbol, color, avgBlockTime }) => {
      const client = createPublicClient({ chain, transport: http(rpc, { timeout: 7000, retryCount: 1 }) })
      const [block, gasPrice] = await Promise.all([
        client.getBlock({ includeTransactions: false }),
        client.getGasPrice(),
      ])

      const gasPriceGwei = Math.round(Number(formatGwei(gasPrice)) * 100) / 100
      const gasUsed = Number(block.gasUsed)
      const gasLimit = Number(block.gasLimit)

      return {
        id: chain.id,
        label,
        symbol,
        color,
        avgBlockTime,
        explorer: chain.blockExplorers?.default?.url ?? '#',
        block: {
          number:    block.number.toString(),
          timestamp: Number(block.timestamp),
          txCount:   block.transactions.length,
          gasUsed,
          gasLimit,
          gasUsedPct: gasLimit > 0 ? Math.round((gasUsed / gasLimit) * 100) : 0,
          baseFee: block.baseFeePerGas
            ? Math.round(Number(formatGwei(block.baseFeePerGas)) * 100) / 100
            : null,
        },
        gasPrice: gasPriceGwei,
      }
    })
  )

  const chains = results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value)

  return Response.json({ chains, ts: Date.now() }, {
    headers: { 'Cache-Control': 'no-store, no-cache' },
  })
}
