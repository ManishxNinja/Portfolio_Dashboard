'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchPortfolioData } from '@/lib/data-fetcher';
import type { StockData } from '@/lib/mock-data';

interface UsePortfolioDataOptions {
  autoRefreshInterval?: number;
  enabled?: boolean;
}

interface UsePortfolioDataResult {
  data: StockData[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  lastUpdated: Date | null;
}

export function usePortfolioData(
  options: UsePortfolioDataOptions = {}
): UsePortfolioDataResult {
  const { autoRefreshInterval = 15000, enabled = true } = options;

  const [data, setData] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    try {
      setIsLoading(true);
      setError(null);
      const portfolioData = await fetchPortfolioData();
      setData(portfolioData);
      setLastUpdated(new Date());
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch portfolio data');
      setError(error);
      console.error('[v0] Portfolio data fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!enabled || !autoRefreshInterval) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      fetchData();
    }, autoRefreshInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, autoRefreshInterval, fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
    lastUpdated,
  };
}
