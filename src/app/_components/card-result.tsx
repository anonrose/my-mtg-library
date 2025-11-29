"use client";

import React, { useState } from "react";
import { Save, X, Eye } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import { Badge } from "~/components/ui/badge";
import { ScrollArea } from "~/components/ui/scroll-area";

interface IdentifyResult {
  name: string;
  set: string | null;
  price: string | null;
  imageUrl: string | null;
  scryfallId?: string | null;
  oracleText?: string | null;
  typeLine?: string | null;
  colorIdentity?: string | null;
}

interface CardResultProps {
  result: IdentifyResult;
  onSave: () => void;
  onCancel: () => void;
}

export function CardResult({ result, onSave, onCancel }: CardResultProps) {
  const createMutation = api.card.create.useMutation({
    onSuccess: () => {
      onSave();
    },
  });

  const handleSave = () => {
    createMutation.mutate({
      name: result.name,
      set: result.set,
      price: result.price,
      imageUrl: result.imageUrl,
      scryfallId: result.scryfallId,
      oracleText: result.oracleText,
      typeLine: result.typeLine,
      colorIdentity: result.colorIdentity,
    });
  };

  // Mock legality (Scryfall API usually returns this, but we simplified our enriched response)
  // In a full app, we'd map `result.legalities`
  const legalities = ["Standard", "Commander", "Modern", "Pauper"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-md overflow-hidden bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50 flex flex-col max-h-[90vh]">
        <CardHeader className="relative p-0 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-10 rounded-full bg-black/20 text-white hover:bg-black/40"
            onClick={onCancel}
          >
            <X className="h-4 w-4" />
          </Button>
          {result.imageUrl ? (
            <img
              src={result.imageUrl}
              alt={result.name}
              className="h-64 w-full object-contain bg-slate-100 dark:bg-slate-800 py-4"
            />
          ) : (
            <div className="flex h-64 w-full items-center justify-center bg-slate-100 dark:bg-slate-800">
              <span className="text-slate-500">No image available</span>
            </div>
          )}
        </CardHeader>

        <ScrollArea className="flex-1">
            <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <CardTitle className="text-2xl">{result.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{result.typeLine}</p>
                </div>
                <div className="text-right">
                    <span className="text-xl font-bold text-green-600 dark:text-green-400 block">
                    {result.price ? `$${result.price}` : "N/A"}
                    </span>
                    <Badge variant="outline" className="mt-1">
                        {result.set?.toUpperCase() ?? "UNK"}
                    </Badge>
                </div>
            </div>

            {result.oracleText && (
                <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-900 rounded-md text-sm italic border">
                    {result.oracleText.split('\n').map((line, i) => (
                        <p key={i} className="mb-1 last:mb-0">{line}</p>
                    ))}
                </div>
            )}

            <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Legality</h4>
                <div className="flex flex-wrap gap-1">
                    {legalities.map(fmt => (
                        <Badge key={fmt} variant="secondary" className="text-xs">
                            {fmt}
                        </Badge>
                    ))}
                </div>
            </div>
            </CardContent>
        </ScrollArea>

        <CardFooter className="p-6 pt-0 shrink-0 flex gap-2">
          <Button variant="outline" className="flex-1" disabled>
              <Eye className="mr-2 h-4 w-4" />
              Watch Price
          </Button>
          <Button
            onClick={handleSave}
            className="flex-[2]"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? (
              "Saving..."
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
