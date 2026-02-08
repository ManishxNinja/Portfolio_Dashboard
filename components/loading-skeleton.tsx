'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

export function PortfolioStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="p-6 border-0 shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
              <div className="h-10 w-10 bg-muted rounded-lg animate-pulse" />
            </div>
            <div className="h-8 bg-muted rounded w-3/4 animate-pulse" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export function SectorSummarySkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 bg-muted rounded w-1/4 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-6 border-l-4 border-l-primary">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-6 bg-muted rounded w-1/2 animate-pulse" />
                <div className="h-6 bg-muted rounded w-1/4 animate-pulse" />
              </div>
              <div className="space-y-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-4 bg-muted rounded animate-pulse" />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function PortfolioTableSkeleton() {
  return (
    <Card className="w-full p-6">
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-muted rounded animate-pulse" />
        ))}
      </div>
    </Card>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-8 bg-muted rounded w-64 animate-pulse" />
              <div className="h-4 bg-muted rounded w-96 animate-pulse" />
            </div>
            <div className="h-9 bg-muted rounded w-24 animate-pulse" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <PortfolioStatsSkeleton />
        <SectorSummarySkeleton />
        <div className="space-y-4">
          <div className="h-8 bg-muted rounded w-1/4 animate-pulse" />
          <PortfolioTableSkeleton />
        </div>
      </main>
    </div>
  );
}
