import YahooFinance from 'yahoo-finance2';
import { mockPortfolio, getMockStockData } from '@/lib/mock-data';
import type { StockData } from '@/lib/mock-data';

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

export async function GET() {
  try {
    const yahooSymbols = mockPortfolio.map((stock) => stock.yahooSymbol);

    const quotes = await yahooFinance.quote(yahooSymbols);

    const quoteMap = new Map<string, typeof quotes[number]>();
    const quotesArray = Array.isArray(quotes) ? quotes : [quotes];
    for (const q of quotesArray) {
      if (q && q.symbol) {
        quoteMap.set(q.symbol, q);
      }
    }

    const portfolioData: StockData[] = mockPortfolio.map((stock) => {
      const quote = quoteMap.get(stock.yahooSymbol);

      if (quote) {
        return {
          ...stock,
          currentPrice: quote.regularMarketPrice ?? 0,
          peRatio: quote.trailingPE ?? 0,
          latestEarnings: quote.epsTrailingTwelveMonths ?? 0,
        };
      }

      return getMockStockData(stock);
    });

    return Response.json({
      success: true,
      data: portfolioData,
      timestamp: new Date().toISOString(),
      source: 'yahoo-finance',
    });
  } catch (error) {
    console.error('Yahoo Finance API failed, falling back to mock data:', error);

    const portfolioData = mockPortfolio.map((stock) => getMockStockData(stock));

    return Response.json({
      success: true,
      data: portfolioData,
      timestamp: new Date().toISOString(),
      source: 'mock-data',
    });
  }
}
