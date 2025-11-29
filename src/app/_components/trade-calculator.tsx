"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TradeBinder } from "./trade-binder";

export function TradeCalculator() {
  // In a real app, we'd fetch the partner's tradables via an ID from the QR code
  // For this MVP, we'll just simulate two lists: "My Tradables" and "Their Tradables" (manual entry for them)

  const [myOffer, setMyOffer] = useState<any[]>([]);
  const [theirOffer, setTheirOffer] = useState<any[]>([]);
  const [manualPrice, setManualPrice] = useState("");
  const [manualName, setManualName] = useState("");

  const [cards] = api.card.getAll.useSuspenseQuery();
  const myTradables = cards.filter(c => c.isTradable);

  const addToMyOffer = (card: any) => {
    if (!myOffer.find(c => c.id === card.id)) {
      setMyOffer([...myOffer, card]);
    }
  };

  const removeFromMyOffer = (id: number) => {
    setMyOffer(myOffer.filter(c => c.id !== id));
  };

  const addToTheirOffer = () => {
    if (manualName && manualPrice) {
        setTheirOffer([...theirOffer, {
            id: Date.now(), // temporary ID
            name: manualName,
            price: manualPrice
        }]);
        setManualName("");
        setManualPrice("");
    }
  };

  const removeFromTheirOffer = (id: number) => {
      setTheirOffer(theirOffer.filter(c => c.id !== id));
  };

  const myTotal = myOffer.reduce((sum, c) => sum + (parseFloat(c.price || "0") || 0), 0);
  const theirTotal = theirOffer.reduce((sum, c) => sum + (parseFloat(c.price || "0") || 0), 0);
  const diff = myTotal - theirTotal;

  return (
    <div className="space-y-6 pb-20">
        <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="binder">My Binder</TabsTrigger>
                <TabsTrigger value="calculator">Calculator</TabsTrigger>
            </TabsList>

            <TabsContent value="binder">
                <TradeBinder />
            </TabsContent>

            <TabsContent value="calculator">
                 <div className="grid gap-4 md:grid-cols-2">
                    {/* My Side */}
                    <Card className={diff > 0 ? "border-red-200 bg-red-50 dark:bg-red-900/10" : "border-green-200 bg-green-50 dark:bg-green-900/10"}>
                        <CardHeader>
                            <CardTitle className="flex justify-between">
                                <span>You Give</span>
                                <span>${myTotal.toFixed(2)}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 mb-4">
                                {myOffer.map(card => (
                                    <div key={card.id} className="flex justify-between items-center text-sm">
                                        <span>{card.name}</span>
                                        <div className="flex items-center gap-2">
                                            <span>${card.price}</span>
                                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => removeFromMyOffer(card.id)}>×</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 border-t">
                                <p className="text-sm font-medium mb-2">Add from your tradables:</p>
                                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                                    {myTradables.map(card => (
                                        <Button
                                            key={card.id}
                                            variant="outline"
                                            size="sm"
                                            onClick={() => addToMyOffer(card)}
                                            disabled={!!myOffer.find(c => c.id === card.id)}
                                        >
                                            {card.name} (${card.price})
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Their Side */}
                    <Card className={diff < 0 ? "border-red-200 bg-red-50 dark:bg-red-900/10" : "border-green-200 bg-green-50 dark:bg-green-900/10"}>
                        <CardHeader>
                             <CardTitle className="flex justify-between">
                                <span>They Give</span>
                                <span>${theirTotal.toFixed(2)}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 mb-4">
                                {theirOffer.map(card => (
                                    <div key={card.id} className="flex justify-between items-center text-sm">
                                        <span>{card.name}</span>
                                        <div className="flex items-center gap-2">
                                            <span>${card.price}</span>
                                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => removeFromTheirOffer(card.id)}>×</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                             <div className="pt-4 border-t space-y-2">
                                <p className="text-sm font-medium">Add their card (manual):</p>
                                <div className="flex gap-2">
                                    <Input placeholder="Card Name" value={manualName} onChange={e => setManualName(e.target.value)} className="flex-1" />
                                    <Input placeholder="Price" type="number" value={manualPrice} onChange={e => setManualPrice(e.target.value)} className="w-24" />
                                    <Button onClick={addToTheirOffer}>Add</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                 </div>

                 <div className="mt-6 text-center">
                     <div className="text-xl font-bold">
                         {Math.abs(diff) < 0.5 ? (
                             <span className="text-green-600">Fair Trade!</span>
                         ) : (
                             <span>
                                 Difference: <span className={diff > 0 ? "text-red-500" : "text-green-500"}>
                                     ${Math.abs(diff).toFixed(2)}
                                 </span>
                                 {diff > 0 ? " (You are losing value)" : " (You are gaining value)"}
                             </span>
                         )}
                     </div>
                 </div>
            </TabsContent>
        </Tabs>
    </div>
  );
}

