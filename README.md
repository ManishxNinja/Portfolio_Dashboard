# Portfolio Dashboard

A real-time stock portfolio tracker built with Next.js. Fetches live CMP from Yahoo Finance and P/E Ratio + EPS from Google Finance for 8 NSE-listed Indian stocks.

## Tech Stack

- Next.js 16 
- React 19, TypeScript
- Tailwind CSS, shadcn/ui
- yahoo-finance2 (CMP data)
- Google Finance scraper (P/E, EPS)

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## How It Works

The backend API route (`app/api/portfolio/route.ts`) fetches data from two sources in parallel:

- **Yahoo Finance** — current market price via the `yahoo-finance2` npm library
- **Google Finance** — P/E ratio and earnings scraped from `google.com/finance/quote/SYMBOL:NSE`

If Google Finance is unavailable, it falls back to Yahoo. If both fail, mock data is used so the dashboard stays functional.

The frontend (`app/page.tsx`) polls the API every 15 seconds for live updates. Auto-refresh can be toggled on/off.

## Project Structure

```
app/
  page.tsx                    Main dashboard page
  api/portfolio/route.ts      Backend API (Yahoo + Google Finance)
components/
  portfolio-stats.tsx         Summary cards (investment, value, gain/loss)
  portfolio-table.tsx         Holdings table with all 11 columns
  sector-summary.tsx          Sector grouping with aggregated metrics
lib/
  google-finance.ts           Google Finance scraper
  mock-data.ts                Portfolio definitions and fallback data
  data-fetcher.ts             Client-side fetch utilities
```

## Portfolio

8 stocks across 4 sectors: Reliance, TCS, Infosys, HDFC Bank, Wipro, Maruti Suzuki, ICICI Bank, Adani Ports.

## Deploy

```bash
npm run build
vercel
```

No environment variables or API keys needed.
