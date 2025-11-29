"use client";

import { LifeCounter } from "./life-counter";
import { api } from "~/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

export function PlayTab() {
  const { data: stats } = api.game.getStats.useQuery({});

  return (
    <div className="space-y-6 pb-20">
      {/* Game Stats */}
      {stats && stats.totalGames > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Games Played</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalGames}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Win Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {stats.winRate}%
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {stats.wins}W - {stats.losses}L
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="text-lg">
                Coming Soon
              </Badge>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Life Counter */}
      <LifeCounter />
    </div>
  );
}

