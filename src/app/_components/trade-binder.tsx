"use client";

import React, { useState } from "react";
import { api } from "~/trpc/react";
import { QRCodeSVG } from "qrcode.react";
import { Switch } from "~/components/ui/switch";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function TradeBinder() {
  const utils = api.useUtils();
  const [cards] = api.card.getAll.useSuspenseQuery();
  // For now, assuming user is logged in

  // Filter for tradable cards
  const tradableCards = cards.filter((c) => c.isTradable);

  const toggleTradableMutation = api.card.toggleTradable.useMutation({
    onSuccess: () => {
      void utils.card.getAll.invalidate();
    },
  });

  // Mock user profile URL for the QR code
  const profileUrl = typeof window !== "undefined" ? `${window.location.origin}/trade/${"user-id-placeholder"}` : "";

  return (
    <div className="space-y-6 pb-20">
      <div className="grid gap-4 md:grid-cols-2">
        {/* My Trade Profile Card */}
        <Card>
            <CardHeader>
                <CardTitle>Your Trade Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                <div className="bg-white p-2 rounded">
                    <QRCodeSVG value={profileUrl} size={150} />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                    Scan to view my trade binder
                </p>
            </CardContent>
        </Card>

        {/* Trade Stats */}
        <Card>
            <CardHeader>
                <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{tradableCards.length}</div>
                <p className="text-sm text-muted-foreground">Cards for trade</p>

                <div className="mt-4 text-2xl font-bold text-green-600">
                    ${tradableCards.reduce((acc, c) => acc + (parseFloat(c.price || "0") || 0), 0).toFixed(2)}
                </div>
                <p className="text-sm text-muted-foreground">Total Trade Value</p>
            </CardContent>
        </Card>
      </div>

      <h3 className="text-xl font-semibold mt-8">Manage Tradables</h3>
      <div className="grid grid-cols-1 gap-2">
          {cards.map((card) => (
              <div key={card.id} className="flex items-center justify-between p-3 bg-card border rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 overflow-hidden">
                      {card.imageUrl && <img src={card.imageUrl} className="h-10 w-auto rounded" />}
                      <div className="truncate">
                          <div className="font-medium">{card.name}</div>
                          <div className="text-xs text-muted-foreground">{card.set?.toUpperCase()} • ${card.price ?? "N/A"}</div>
                      </div>
                  </div>
                  <Switch
                    checked={card.isTradable}
                    onCheckedChange={() => toggleTradableMutation.mutate({ id: card.id, isTradable: !card.isTradable })}
                  />
              </div>
          ))}
      </div>
    </div>
  );
}

