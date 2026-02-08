'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import type { StockData } from '@/lib/mock-data';
import { TrendingUp, TrendingDown, Wallet, DollarSign } from 'lucide-react';

interface PortfolioStatsProps {
  data: StockData[];
}

export function PortfolioStats({ data }: PortfolioStatsProps) {
  const totalInvestment = data.reduce((sum, stock) => sum + stock.purchasePrice * stock.quantity, 0);
  const totalPresentValue = data.reduce((sum, stock) => sum + stock.currentPrice * stock.quantity, 0);
  const totalGainLoss = totalPresentValue - totalInvestment;
  const gainLossPercent = (totalGainLoss / totalInvestment) * 100;

  const isGain = totalGainLoss >= 0;

  const stats = [
    {
      label: 'Total Investment',
      value: `₹${totalInvestment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      icon: DollarSign,
      color: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Present Portfolio Value',
      value: `₹${totalPresentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      icon: Wallet,
      color: 'bg-primary/10',
      textColor: 'text-primary',
    },
    {
      label: 'Gain/Loss',
      value: `${isGain ? '+' : ''}₹${Math.abs(totalGainLoss).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      icon: isGain ? TrendingUp : TrendingDown,
      color: isGain ? 'bg-green-50' : 'bg-red-50',
      textColor: isGain ? 'text-green-600' : 'text-red-600',
    },
    {
      label: 'Total Return %',
      value: `${gainLossPercent.toFixed(2)}%`,
      icon: TrendingUp,
      color: isGain ? 'bg-green-50' : 'bg-red-50',
      textColor: isGain ? 'text-green-600' : 'text-red-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <Card key={stat.label} className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
              <div className={`p-2.5 rounded-lg ${stat.color}`}>
                <IconComponent className={`w-5 h-5 ${stat.textColor}`} />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div className="flex-1">
                <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
