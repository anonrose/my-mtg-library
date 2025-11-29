"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/react";

export function OfflineSync() {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  const syncOffline = async () => {
    setSyncing(true);

    try {
      // In production, this would:
      // 1. Open IndexedDB
      // 2. Store all collection data locally
      // 3. Register service worker for offline access

      // Mock implementation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setLastSync(new Date());
      alert("Collection synced for offline use!");
    } catch (error) {
      console.error("Sync error:", error);
      alert("Failed to sync. Please try again.");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Offline Mode</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Download your collection for offline access at conventions or areas with poor connectivity.
        </p>

        <Button onClick={syncOffline} disabled={syncing} className="w-full">
          <Download className="w-4 h-4 mr-2" />
          {syncing ? "Syncing..." : "Sync for Offline"}
        </Button>

        {lastSync && (
          <p className="text-xs text-muted-foreground text-center">
            Last synced: {lastSync.toLocaleString()}
          </p>
        )}

        <div className="mt-4 p-3 bg-muted rounded text-xs text-muted-foreground">
          <p className="font-medium mb-1">Premium Feature</p>
          <p>
            Full offline mode with IndexedDB and Service Workers will be implemented in production.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

