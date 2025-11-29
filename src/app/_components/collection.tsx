"use client";

import React from "react";
import { api } from "~/trpc/react";
import { Loader2, RefreshCw, TrendingUp } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

export function Collection() {
  const [cards] = api.card.getAll.useSuspenseQuery();
  const utils = api.useUtils();

  const handleRefresh = () => {
    void utils.card.getAll.invalidate();
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center justify-between">
         <h2 className="text-2xl font-bold">My Collection ({cards.length})</h2>
         <Button variant="ghost" size="icon" onClick={handleRefresh}>
             <RefreshCw className="h-4 w-4" />
         </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {cards.map((card) => (
          <div
            key={card.id}
            className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm group relative"
          >
            {card.isTradable && (
                <div className="absolute top-2 right-2 z-10">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100">
                        Trade
                    </Badge>
                </div>
            )}

            <div className="aspect-[2.5/3.5] w-full bg-muted relative">
               {card.imageUrl ? (
                  <img
                    src={card.imageUrl}
                    alt={card.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
               ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground p-2 text-center text-sm">
                     No Image
                  </div>
               )}
            </div>
            <div className="p-3">
              <h3 className="truncate font-semibold leading-none tracking-tight" title={card.name}>
                {card.name}
              </h3>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground text-xs">{card.set?.toUpperCase() ?? "-"}</span>
                <div className="flex flex-col items-end">
                    <span className="font-medium text-green-600 dark:text-green-400">
                        {card.price ? `$${card.price}` : "N/A"}
                    </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {cards.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            <p>No cards scanned yet. Start scanning!</p>
          </div>
        )}
      </div>
    </div>
  );
}
