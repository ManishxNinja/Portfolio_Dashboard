'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { StockData } from '@/lib/mock-data';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface SectorSummaryProps {
  data: StockData[];
}

export function SectorSummaryComponent({ data }: SectorSummaryProps) {
  const sectorMap = new Map<string, any>();

  data.forEach((stock) => {
    const investment = stock.purchasePrice * stock.quantity;
    const presentValue = stock.currentPrice * stock.quantity;
    const gainLoss = presentValue - investment;

    if (!sectorMap.has(stock.sector)) {
      sectorMap.set(stock.sector, {
        sector: stock.sector,
        totalInvestment: 0,
        totalPresentValue: 0,
        gainLoss: 0,
        gainLossPercent: 0,
      });
    }

    const summary = sectorMap.get(stock.sector)!;
    summary.totalInvestment += investment;
    summary.totalPresentValue += presentValue;
    summary.gainLoss += gainLoss;
  });

  const sectors = Array.from(sectorMap.values()).map((summary) => ({
    ...summary,
    gainLossPercent: (summary.gainLoss / summary.totalInvestment) * 100,
  }));

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Sector Allocation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sectors.map((sector) => {
          const isGain = sector.gainLoss >= 0;

          return (
            <Card key={sector.sector} className="p-6 border-l-4 border-l-primary">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-foreground">{sector.sector}</h3>
                  <Badge
                    variant={isGain ? 'outline' : 'destructive'}
                    className={isGain ? 'bg-green-50 text-green-700 border-green-200' : ''}
                  >
                    {isGain ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {sector.gainLossPercent.toFixed(2)}%
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Investment</span>
                    <span className="font-semibold text-foreground">
                      ₹{sector.totalInvestment.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Present Value</span>
                    <span className="font-semibold text-foreground">
                      ₹{sector.totalPresentValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gain/Loss</span>
                      <span
                        className={`font-bold ${
                          isGain ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {isGain ? '+' : ''}₹{sector.gainLoss.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
