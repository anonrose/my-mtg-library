"use client";

import React from "react";
import Link from "next/link";
import { api } from "~/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Loader2, Crown, Lock } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { PremiumDashboard } from "./premium-dashboard";
import { LGSLocator } from "./lgs-locator";
import { OfflineSync } from "./offline-sync";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export function Dashboard() {
  const [stats] = api.analytics.getStats.useSuspenseQuery();
  const { data: subscription } = api.subscription.getStatus.useQuery();

  const isPremium = subscription?.isPremium;

  return (
    <div className="space-y-6 pb-20">
      {/* Subscription Status Banner */}
      {!isPremium && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="font-semibold">Upgrade to Premium</p>
                  <p className="text-sm text-muted-foreground">
                    Unlock price history, AI grading, and more
                  </p>
                </div>
              </div>
              <Link href="/pricing">
                <Button size="sm" className="bg-gradient-to-r from-yellow-500 to-orange-500">
                  Upgrade
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {isPremium && (
        <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white mb-4">
          <Crown className="w-3 h-3 mr-1" />
          Premium Member
        </Badge>
      )}

      {/* Basic Analytics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Value Card */}
        <Card>
          <CardHeader>
            <CardTitle>Total Value</CardTitle>
            <CardDescription>Estimated market value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              ${stats.totalValue}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Across {stats.totalCards} cards
            </p>
            {!isPremium && (
              <p className="text-xs text-muted-foreground mt-2">
                Free tier: {stats.totalCards}/500 cards
              </p>
            )}
          </CardContent>
        </Card>

        {/* Color Distribution Chart */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle>Color Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.colorDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.colorDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Premium Features */}
      {isPremium ? (
        <>
          <PremiumDashboard />
          <div className="grid gap-4 md:grid-cols-2">
            <LGSLocator />
            <OfflineSync />
          </div>
        </>
      ) : (
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="text-center">
              <Lock className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
              <p className="font-semibold mb-1">Premium Feature</p>
              <Link href="/pricing">
                <Button size="sm">Unlock Premium</Button>
              </Link>
            </div>
          </div>
          <CardHeader>
            <CardTitle>Advanced Analytics</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] opacity-30">
            <p className="text-muted-foreground">
              Historical price tracking, portfolio performance, arbitrage opportunities...
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
