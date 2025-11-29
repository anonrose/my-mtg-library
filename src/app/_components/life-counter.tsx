"use client";

import { useState } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface Player {
  name: string;
  life: number;
  commanderDamage: Record<string, number>;
}

export function LifeCounter() {
  const [format, setFormat] = useState<"standard" | "commander">("standard");
  const [playerCount, setPlayerCount] = useState(2);
  const [players, setPlayers] = useState<Player[]>([
    { name: "Player 1", life: 20, commanderDamage: {} },
    { name: "Player 2", life: 20, commanderDamage: {} },
  ]);
  const [started, setStarted] = useState(false);

  const initializePlayers = () => {
    const startingLife = format === "commander" ? 40 : 20;
    const newPlayers: Player[] = [];
    for (let i = 0; i < playerCount; i++) {
      const cmdDmg: Record<string, number> = {};
      if (format === "commander") {
        for (let j = 0; j < playerCount; j++) {
          if (i !== j) cmdDmg[`Player ${j + 1}`] = 0;
        }
      }
      newPlayers.push({
        name: `Player ${i + 1}`,
        life: startingLife,
        commanderDamage: cmdDmg,
      });
    }
    setPlayers(newPlayers);
    setStarted(true);
  };

  const adjustLife = (index: number, amount: number) => {
    setPlayers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, life: p.life + amount } : p))
    );
  };

  const adjustCommanderDamage = (
    playerIndex: number,
    fromPlayer: string,
    amount: number
  ) => {
    setPlayers((prev) =>
      prev.map((p, i) =>
        i === playerIndex
          ? {
              ...p,
              commanderDamage: {
                ...p.commanderDamage,
                [fromPlayer]: (p.commanderDamage[fromPlayer] || 0) + amount,
              },
            }
          : p
      )
    );
  };

  const reset = () => {
    setStarted(false);
    initializePlayers();
  };

  if (!started) {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Start New Game</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Format</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Button
                  variant={format === "standard" ? "default" : "outline"}
                  onClick={() => {
                    setFormat("standard");
                    setPlayers((prev) =>
                      prev.map((p) => ({ ...p, life: 20, commanderDamage: {} }))
                    );
                  }}
                >
                  Standard (20 life)
                </Button>
                <Button
                  variant={format === "commander" ? "default" : "outline"}
                  onClick={() => {
                    setFormat("commander");
                    setPlayers((prev) =>
                      prev.map((p) => ({ ...p, life: 40 }))
                    );
                  }}
                >
                  Commander (40 life)
                </Button>
              </div>
            </div>

            <div>
              <Label>Players</Label>
              <Input
                type="number"
                min="2"
                max="6"
                value={playerCount}
                onChange={(e) =>
                  setPlayerCount(Math.min(6, Math.max(2, parseInt(e.target.value) || 2)))
                }
                className="mt-2"
              />
            </div>

            <Button onClick={initializePlayers} className="w-full">
              Start Game
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {format === "commander" ? "Commander" : "Standard"} Game
        </h2>
        <Button variant="outline" size="sm" onClick={reset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {players.map((player, index) => (
          <Card
            key={index}
            className={
              player.life <= 0
                ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                : ""
            }
          >
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>{player.name}</span>
                {player.life <= 0 && (
                  <span className="text-sm text-red-500">Defeated</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Life Total */}
              <div className="text-center">
                <div className="text-6xl font-bold mb-4">{player.life}</div>
                <div className="flex gap-2 justify-center">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => adjustLife(index, -1)}
                  >
                    <Minus className="w-6 h-6" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => adjustLife(index, 1)}
                  >
                    <Plus className="w-6 h-6" />
                  </Button>
                </div>
              </div>

              {/* Commander Damage */}
              {format === "commander" && (
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">
                    Commander Damage
                  </Label>
                  {Object.entries(player.commanderDamage).map(
                    ([from, damage]) => (
                      <div
                        key={from}
                        className="flex items-center justify-between text-sm"
                      >
                        <span>{from}:</span>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              adjustCommanderDamage(index, from, -1)
                            }
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span
                            className={
                              damage >= 21 ? "font-bold text-red-500" : ""
                            }
                          >
                            {damage}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              adjustCommanderDamage(index, from, 1)
                            }
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

