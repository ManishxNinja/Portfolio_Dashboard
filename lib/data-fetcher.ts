import type { StockData } from './mock-data';

export async function fetchPortfolioData(): Promise<{ data: StockData[]; source: string }> {
  const response = await fetch('/api/portfolio');

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch portfolio data');
  }

  return { data: result.data, source: result.source };
}

export function calculatePortfolioStats(data: StockData[]) {
  const totalInvestment = data.reduce((sum, stock) => sum + stock.purchasePrice * stock.quantity, 0);
  const totalPresentValue = data.reduce((sum, stock) => sum + stock.currentPrice * stock.quantity, 0);
  const totalGainLoss = totalPresentValue - totalInvestment;
  const gainLossPercent = totalInvestment > 0 ? (totalGainLoss / totalInvestment) * 100 : 0;

  return {
    totalInvestment,
    totalPresentValue,
    totalGainLoss,
    gainLossPercent,
  };
}

export function formatCurrency(value: number, decimals = 2): string {
  return `₹${value.toLocaleString('en-IN', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  })}`;
}

export function formatPercentage(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`;
}

export function getGainLossColor(value: number): string {
  if (value > 0) return 'text-green-600';
  if (value < 0) return 'text-red-600';
  return 'text-gray-600';
}

export function getGainLossBgColor(value: number): string {
  if (value > 0) return 'bg-green-50';
  if (value < 0) return 'bg-red-50';
  return 'bg-gray-50';
}
