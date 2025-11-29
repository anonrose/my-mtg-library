"use client";

import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";

interface StoreResult {
  name: string;
  address: string;
  distance: string;
  rating?: number;
  events?: string[];
}

export function LGSLocator() {
  const [location, setLocation] = useState("");
  const [searching, setSearching] = useState(false);
  const [stores, setStores] = useState<StoreResult[]>([]);

  const searchStores = async () => {
    setSearching(true);

    // In production, this would call Google Places API
    // For now, mock some results
    setTimeout(() => {
      setStores([
        {
          name: "Magic Haven Games",
          address: "123 Main St, City, ST 12345",
          distance: "0.5 mi",
          rating: 4.8,
          events: ["Commander tonight 7pm", "Modern FNM"],
        },
        {
          name: "Card Kingdom",
          address: "456 Oak Ave, City, ST 12345",
          distance: "1.2 mi",
          rating: 4.9,
          events: ["Draft tonight 6pm"],
        },
        {
          name: "Game Grid",
          address: "789 Elm St, City, ST 12345",
          distance: "2.1 mi",
          rating: 4.6,
          events: ["Legacy on Saturday"],
        },
      ]);
      setSearching(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Enter location or zip code"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchStores()}
        />
        <Button onClick={searchStores} disabled={searching || !location}>
          {searching ? "..." : <Search className="w-4 h-4" />}
        </Button>
      </div>

      {stores.length > 0 && (
        <div className="space-y-4">
          {stores.map((store, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{store.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{store.address}</span>
                    </div>
                  </div>
                  <Badge variant="secondary">{store.distance}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {store.rating && (
                  <div className="text-sm mb-2">
                    ⭐ {store.rating}/5.0
                  </div>
                )}
                {store.events && store.events.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">Upcoming Events:</p>
                    {store.events.map((event, i) => (
                      <Badge key={i} variant="outline" className="mr-2">
                        {event}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!searching && stores.length === 0 && location && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No stores found. Try a different location.</p>
        </div>
      )}

      <div className="mt-8 p-4 bg-muted rounded-lg text-sm text-muted-foreground">
        <p className="font-medium mb-2">Premium Feature</p>
        <p>
          This feature uses Google Places API in production. The current version
          shows mock data for demonstration purposes.
        </p>
      </div>
    </div>
  );
}

