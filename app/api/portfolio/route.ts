import YahooFinance from 'yahoo-finance2';
import { mockPortfolio, getMockStockData } from '@/lib/mock-data';
import { fetchAllGoogleFinanceData } from '@/lib/google-finance';
import type { StockData } from '@/lib/mock-data';

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

export async function GET() {
  try {
    const yahooSymbols = mockPortfolio.map((stock) => stock.yahooSymbol);
    const googleSymbols = mockPortfolio.map((stock) => stock.googleSymbol);

    const [yahooQuotes, googleDataMap] = await Promise.all([
      yahooFinance.quote(yahooSymbols),
      fetchAllGoogleFinanceData(googleSymbols),
    ]);

    const yahooQuoteMap = new Map<string, (typeof yahooQuotes)[number]>();
    const quotesArray = Array.isArray(yahooQuotes) ? yahooQuotes : [yahooQuotes];
    for (const q of quotesArray) {
      if (q && q.symbol) {
        yahooQuoteMap.set(q.symbol, q);
      }
    }

    const portfolioData: StockData[] = mockPortfolio.map((stock) => {
      const yahooQuote = yahooQuoteMap.get(stock.yahooSymbol);
      const googleData = googleDataMap.get(stock.googleSymbol);

      if (yahooQuote) {
        const currentPrice = yahooQuote.regularMarketPrice ?? 0;

        const peRatio =
          googleData?.peRatio ??
          yahooQuote.trailingPE ??
          0;

        const latestEarnings =
          googleData?.latestEarnings ??
          yahooQuote.epsTrailingTwelveMonths ??
          0;

        return {
          ...stock,
          currentPrice,
          peRatio,
          latestEarnings,
        };
      }

      return getMockStockData(stock);
    });

    const googleSuccessCount = Array.from(googleDataMap.values()).filter(
      (d) => d.peRatio !== null || d.latestEarnings !== null
    ).length;

    return Response.json({
      success: true,
      data: portfolioData,
      timestamp: new Date().toISOString(),
      source: {
        cmp: 'yahoo-finance',
        peRatio: googleSuccessCount > 0 ? 'google-finance' : 'yahoo-finance',
        earnings: googleSuccessCount > 0 ? 'google-finance' : 'yahoo-finance',
      },
    });
  } catch (error) {
    console.error('API failed, falling back to mock data:', error);

    const portfolioData = mockPortfolio.map((stock) => getMockStockData(stock));

    return Response.json({
      success: true,
      data: portfolioData,
      timestamp: new Date().toISOString(),
      source: {
        cmp: 'mock-data',
        peRatio: 'mock-data',
        earnings: 'mock-data',
      },
    });
  }
}
