"use client";

import React, { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Trash2, Plus, Download } from "lucide-react";
import { Badge } from "~/components/ui/badge";

export function DeckList() {
  const [newDeckName, setNewDeckName] = useState("");
  const [selectedDeckId, setSelectedDeckId] = useState<number | null>(null);

  const ctx = api.useUtils();
  const [decks] = api.deck.getAll.useSuspenseQuery();

  const createMutation = api.deck.create.useMutation({
    onSuccess: () => {
      setNewDeckName("");
      void ctx.deck.getAll.invalidate();
    },
  });

  const handleCreateDeck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeckName.trim()) return;
    createMutation.mutate({ name: newDeckName });
  };

  if (selectedDeckId) {
    return <DeckDetail deckId={selectedDeckId} onBack={() => setSelectedDeckId(null)} />;
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Decks</h2>
      </div>

      <form onSubmit={handleCreateDeck} className="flex gap-2">
        <Input
          placeholder="New Deck Name (e.g. Commander Atraxa)"
          value={newDeckName}
          onChange={(e) => setNewDeckName(e.target.value)}
        />
        <Button type="submit" disabled={createMutation.isPending}>
          <Plus className="mr-2 h-4 w-4" />
          Create
        </Button>
      </form>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {decks.map((deck) => (
          <Card
            key={deck.id}
            className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            onClick={() => setSelectedDeckId(deck.id)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-bold">{deck.name}</CardTitle>
              <Badge variant="secondary">{deck._count.cards} Cards</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {deck.format ? deck.format : "Casual"}
              </div>
            </CardContent>
          </Card>
        ))}

        {decks.length === 0 && (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No decks yet. Create one to start building!
          </div>
        )}
      </div>
    </div>
  );
}

function DeckDetail({ deckId, onBack }: { deckId: number; onBack: () => void }) {
  const ctx = api.useUtils();
  const [deck] = api.deck.getById.useSuspenseQuery({ id: deckId });

  const deleteMutation = api.deck.delete.useMutation({
    onSuccess: () => {
      void ctx.deck.getAll.invalidate();
      onBack();
    },
  });

  const removeCardMutation = api.deck.removeCard.useMutation({
    onSuccess: () => {
      void ctx.deck.getById.invalidate({ id: deckId });
      void ctx.deck.getAll.invalidate();
    },
  });

  const exportDeck = () => {
    if (!deck) return;

    // Simple text export format: "1 Card Name"
    const text = deck.cards
      .map((c) => `1 ${c.name}`)
      .join("\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${deck.name.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!deck) return <div>Loading...</div>;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>Back</Button>
            <h2 className="text-2xl font-bold">{deck.name}</h2>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={exportDeck} title="Export to Text">
                <Download className="h-4 w-4" />
            </Button>
            <Button
                variant="destructive"
                size="icon"
                onClick={() => {
                    if (confirm("Are you sure you want to delete this deck? Cards will return to collection.")) {
                        deleteMutation.mutate({ id: deck.id });
                    }
                }}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
      </div>

      <div className="rounded-md border">
          {deck.cards.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                  This deck is empty. Add cards from your collection!
              </div>
          ) : (
              <div className="divide-y">
                  {deck.cards.map((card) => (
                      <div key={card.id} className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                              {card.imageUrl && (
                                  <img src={card.imageUrl} alt={card.name} className="h-12 w-auto rounded" />
                              )}
                              <span className="font-medium">{card.name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCardMutation.mutate({ cardId: card.id })}
                          >
                              Remove
                          </Button>
                      </div>
                  ))}
              </div>
          )}
      </div>
    </div>
  );
}

