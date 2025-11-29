"use client";

import { api } from "~/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, AlertCircle } from "lucide-react";
import { Badge } from "~/components/ui/badge";

export function PremiumDashboard() {
  const [performance] = api.premiumAnalytics.getPortfolioPerformance.useSuspenseQuery({ days: 30 });
  const [arbitrage] = api.premiumAnalytics.getArbitrageOpportunities.useSuspenseQuery();

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Premium Analytics</h2>
        <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
          <TrendingUp className="w-3 h-3 mr-1" />
          Premium
        </Badge>
      </div>

      {/* Portfolio Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Portfolio Performance (30 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {performance.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value: any) => [`$${value}`, "Value"]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Portfolio Value"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No historical data yet. Start tracking prices to see your portfolio performance over time.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Arbitrage Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Arbitrage Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          {arbitrage.length > 0 ? (
            <div className="space-y-2">
              {arbitrage.map((opp) => (
                <div
                  key={opp.cardId}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div>
                    <p className="font-medium">{opp.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Your Price: ${opp.currentPrice} → Scryfall: ${opp.scryfallPrice}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={Number(opp.percentDiff) > 0 ? "default" : "destructive"}
                      className="font-bold"
                    >
                      {Number(opp.percentDiff) > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {opp.percentDiff}%
                    </Badge>
                    <p className="text-sm mt-1">${Math.abs(opp.difference).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No significant price differences found. Your collection is up to date!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

