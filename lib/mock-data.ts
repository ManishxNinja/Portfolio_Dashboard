export interface Stock {
  id: string;
  symbol: string;
  yahooSymbol: string;
  name: string;
  purchasePrice: number;
  quantity: number;
  exchange: string;
  sector: string;
}

export interface StockData extends Stock {
  currentPrice: number;
  peRatio: number;
  latestEarnings: number;
}

export const mockPortfolio: Stock[] = [
  { id: '1', symbol: 'RELIANCE', yahooSymbol: 'RELIANCE.NS', name: 'Reliance Industries', purchasePrice: 2800, quantity: 5, exchange: 'NSE', sector: 'Financials' },
  { id: '2', symbol: 'TCS', yahooSymbol: 'TCS.NS', name: 'Tata Consultancy Services', purchasePrice: 3500, quantity: 10, exchange: 'NSE', sector: 'Technology' },
  { id: '3', symbol: 'INFY', yahooSymbol: 'INFY.NS', name: 'Infosys', purchasePrice: 1800, quantity: 8, exchange: 'NSE', sector: 'Technology' },
  { id: '4', symbol: 'HDFC', yahooSymbol: 'HDFCBANK.NS', name: 'HDFC Bank', purchasePrice: 1600, quantity: 12, exchange: 'NSE', sector: 'Financials' },
  { id: '5', symbol: 'WIPRO', yahooSymbol: 'WIPRO.NS', name: 'Wipro', purchasePrice: 450, quantity: 20, exchange: 'NSE', sector: 'Technology' },
  { id: '6', symbol: 'MARUTI', yahooSymbol: 'MARUTI.NS', name: 'Maruti Suzuki', purchasePrice: 9500, quantity: 2, exchange: 'NSE', sector: 'Automotive' },
  { id: '7', symbol: 'ICICIBANK', yahooSymbol: 'ICICIBANK.NS', name: 'ICICI Bank', purchasePrice: 1250, quantity: 15, exchange: 'NSE', sector: 'Financials' },
  { id: '8', symbol: 'ADANIPORTS', yahooSymbol: 'ADANIPORTS.NS', name: 'Adani Ports', purchasePrice: 650, quantity: 30, exchange: 'NSE', sector: 'Infrastructure' },
];

export const getMockStockData = (stock: Stock): StockData => {
  const priceVariation = (Math.random() - 0.5) * 0.2;
  const currentPrice = stock.purchasePrice * (1 + priceVariation);
  const peRatio = 15 + Math.random() * 10;
  const latestEarnings = stock.purchasePrice * stock.quantity * 0.05 * (0.8 + Math.random() * 0.4);

  return {
    ...stock,
    currentPrice: parseFloat(currentPrice.toFixed(2)),
    peRatio: parseFloat(peRatio.toFixed(2)),
    latestEarnings: parseFloat(latestEarnings.toFixed(2)),
  };
};

export type SectorSummary = {
  sector: string;
  totalInvestment: number;
  totalPresentValue: number;
  gainLoss: number;
  gainLossPercent: number;
};
