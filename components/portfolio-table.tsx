'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { StockData } from '@/lib/mock-data';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PortfolioTableProps {
  data: StockData[];
  isLoading?: boolean;
}

export function PortfolioTable({ data, isLoading = false }: PortfolioTableProps) {
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/50 hover:bg-secondary/50">
            <TableHead className="font-semibold">Stock</TableHead>
            <TableHead className="text-right font-semibold">Purchase Price</TableHead>
            <TableHead className="text-right font-semibold">Qty</TableHead>
            <TableHead className="text-right font-semibold">Investment</TableHead>
            <TableHead className="text-right font-semibold">Portfolio %</TableHead>
            <TableHead className="font-semibold">Exchange</TableHead>
            <TableHead className="text-right font-semibold">CMP</TableHead>
            <TableHead className="text-right font-semibold">Present Value</TableHead>
            <TableHead className="text-right font-semibold">Gain/Loss</TableHead>
            <TableHead className="text-right font-semibold">P/E Ratio</TableHead>
            <TableHead className="text-right font-semibold">Latest Earnings</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((stock) => {
            const investment = stock.purchasePrice * stock.quantity;
            const presentValue = stock.currentPrice * stock.quantity;
            const gainLoss = presentValue - investment;
            const gainLossPercent = (gainLoss / investment) * 100;

            const totalInvestment = data.reduce((sum, s) => sum + s.purchasePrice * s.quantity, 0);
            const portfolioPercent = (investment / totalInvestment) * 100;

            const isGain = gainLoss >= 0;

            return (
              <TableRow key={stock.id} className="hover:bg-muted/50">
                <TableCell className="font-medium text-foreground">
                  <div>
                    <div className="font-semibold">{stock.symbol}</div>
                    <div className="text-sm text-muted-foreground">{stock.name}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right">₹{stock.purchasePrice.toFixed(2)}</TableCell>
                <TableCell className="text-right">{stock.quantity}</TableCell>
                <TableCell className="text-right">₹{investment.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className="font-mono">
                    {portfolioPercent.toFixed(2)}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-mono">
                    {stock.exchange}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-semibold">₹{stock.currentPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right">₹{presentValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</TableCell>
                <TableCell className="text-right">
                  <div
                    className={`font-semibold flex items-center justify-end gap-1 ${
                      isGain ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {isGain ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>
                      ₹{Math.abs(gainLoss).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-xs">({gainLossPercent.toFixed(2)}%)</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{stock.peRatio.toFixed(2)}</TableCell>
                <TableCell className="text-right">₹{stock.latestEarnings.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
