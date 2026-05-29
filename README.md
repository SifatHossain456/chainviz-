# ChainViz — Live Block Visualizer

Watch blocks appear in real time across Ethereum, Base, Arbitrum, Polygon, and Optimism. A minimal, fast block explorer dashboard with live TPS, gas prices, and network stats.

## Features

- **Live block feed** — new blocks appear as they are mined, no refresh needed
- **Multi-chain** — Ethereum, Base, Arbitrum, Optimism, Polygon simultaneously
- **TPS tracking** — transactions per second per chain, calculated from block data
- **Gas prices** — current gas in Gwei per chain, color-coded fast/normal/slow
- **Block detail** — click any block for hash, timestamp, transaction count, and gas used

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 App Router |
| Styling | Tailwind CSS v4 + CSS variables |
| Data | Etherscan APIs (free tier) |
| Polling | Server-side fetch with 3s revalidation |

## Getting Started

```bash
git clone https://github.com/SifatHossain456/chainviz-.git
cd chainviz-
npm install
cp .env.example .env.local
npm run dev
```

## Environment Variables

```env
ETHERSCAN_API_KEY=your_etherscan_api_key
```

Free Etherscan API key at [etherscan.io/apis](https://etherscan.io/apis).

## License

MIT
