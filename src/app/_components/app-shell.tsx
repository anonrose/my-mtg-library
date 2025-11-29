"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Scanner } from "./scanner";
import { CardResult } from "./card-result";
import { Collection } from "./collection";
import { Dashboard } from "./dashboard";
import { DeckList } from "./deck-list";
import { TradeCalculator } from "./trade-calculator";
import { PlayTab } from "./play-tab";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { api } from "~/trpc/react";

export function AppShell() {
  const [activeTab, setActiveTab] = useState("collection");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const utils = api.useUtils();

  const handleIdentify = (data: any) => {
    if (data) {
        setIsScanning(false);
        setScanResult(data);
    } else {
        // Batch mode finished or cancelled
        setIsScanning(false);
        void utils.card.getAll.invalidate();
        void utils.analytics.getStats.invalidate();
    }
  };

  const handleSave = async () => {
    setScanResult(null);
    await utils.card.getAll.invalidate();
    await utils.analytics.getStats.invalidate();
  };

  return (
    <div className="relative min-h-[calc(100vh-100px)]">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-4">
          <TabsTrigger value="dashboard">Dash</TabsTrigger>
          <TabsTrigger value="collection">Cards</TabsTrigger>
          <TabsTrigger value="decks">Decks</TabsTrigger>
          <TabsTrigger value="trade">Trade</TabsTrigger>
          <TabsTrigger value="play">Play</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <Dashboard />
        </TabsContent>

        <TabsContent value="collection">
          <Collection />
        </TabsContent>

        <TabsContent value="decks">
          <DeckList />
        </TabsContent>

        <TabsContent value="trade">
          <TradeCalculator />
        </TabsContent>

        <TabsContent value="play">
          <PlayTab />
        </TabsContent>
      </Tabs>

      {/* Floating Action Button - Only show on Collection or Decks to avoid clutter */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={() => setIsScanning(true)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Scanner Modal */}
      {isScanning && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black">
          <div className="relative flex-1">
            <Scanner onIdentify={handleIdentify} />
            <Button
              variant="ghost"
              className="absolute top-4 right-4 text-white hover:bg-white/20 z-50"
              onClick={() => setIsScanning(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Result Modal (Single Scan) */}
      {scanResult && (
        <CardResult
          result={scanResult}
          onSave={handleSave}
          onCancel={() => setScanResult(null)}
        />
      )}
    </div>
  );
}
