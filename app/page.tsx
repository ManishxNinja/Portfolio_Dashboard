'use client';

import React, { useState, useEffect } from 'react';
import { PortfolioStats } from '@/components/portfolio-stats';
import { PortfolioTable } from '@/components/portfolio-table';
import { SectorSummaryComponent } from '@/components/sector-summary';
import type { StockData } from '@/lib/mock-data';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function DashboardPage() {
  const [portfolioData, setPortfolioData] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [dataSource, setDataSource] = useState<{
    cmp: string;
    peRatio: string;
    earnings: string;
  } | null>(null);

  const fetchPortfolioData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/portfolio');
      const result = await response.json();

      if (!result.success) {
        throw new Error('Failed to fetch portfolio data');
      }

      setPortfolioData(result.data);
      setDataSource(result.source);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch portfolio data. Please try again.');
      console.error('Error fetching portfolio data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchPortfolioData();
    }, 15000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Portfolio Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Real-time investment tracking and analysis
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-sm font-semibold text-foreground">
                  {lastUpdated
                    ? lastUpdated.toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    : "--:--"}
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => fetchPortfolioData()}
                disabled={isLoading}
                className="gap-2"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              id="auto-refresh"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded border-border"
            />
            <label
              htmlFor="auto-refresh"
              className="text-sm text-muted-foreground cursor-pointer"
            >
              Auto-refresh every 15 seconds
            </label>
            {autoRefresh && (
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse ml-2" />
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {portfolioData.length > 0 && <PortfolioStats data={portfolioData} />}
        {portfolioData.length > 0 && (
          <SectorSummaryComponent data={portfolioData} />
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Holdings</h2>
            <p className="text-sm text-muted-foreground">
              {portfolioData.length} stocks
            </p>
          </div>
          <PortfolioTable data={portfolioData} isLoading={isLoading} />
        </div>

        <div className="bg-secondary/50 border border-border rounded-lg p-4 mt-8">
          <p className="text-xs text-muted-foreground">
            <strong>Data Sources:</strong>{' '}
            {dataSource ? (
              <>
                CMP from <strong>{dataSource.cmp}</strong> | P/E Ratio from{' '}
                <strong>{dataSource.peRatio}</strong> | Earnings from{' '}
                <strong>{dataSource.earnings}</strong>
              </>
            ) : (
              'Loading...'
            )}
          </p>
        </div>
      </main>
    </div>
  );
}
