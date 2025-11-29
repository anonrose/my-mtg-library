"use client";

import { api } from "~/trpc/react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Loader2 } from "lucide-react";

export default function PublicProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const { data: profile, isLoading } = api.social.getPublicProfile.useQuery(
    { username },
    { enabled: !!username }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4">
      <div className="container mx-auto max-w-6xl">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-4">
              {profile.user.image && (
                <img
                  src={profile.user.image}
                  alt={profile.user.name || "User"}
                  className="w-16 h-16 rounded-full"
                />
              )}
              <div>
                <CardTitle className="text-2xl">{profile.user.name}</CardTitle>
                <p className="text-muted-foreground">@{profile.user.username}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <h2 className="text-xl font-bold mb-4">
          Trade Binder ({profile.tradableCards.length} cards)
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {profile.tradableCards.map((card) => (
            <Card key={card.id} className="overflow-hidden">
              <div className="aspect-[2.5/3.5] w-full bg-muted relative">
                {card.imageUrl ? (
                  <img
                    src={card.imageUrl}
                    alt={card.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground p-2 text-center text-sm">
                    {card.name}
                  </div>
                )}
              </div>
              <CardContent className="p-3">
                <h3 className="truncate font-semibold text-sm" title={card.name}>
                  {card.name}
                </h3>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <Badge variant="outline">{card.set?.toUpperCase() ?? "-"}</Badge>
                  <span className="font-medium text-green-600">
                    {card.price ? `$${card.price}` : "N/A"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {profile.tradableCards.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No cards available for trade</p>
          </div>
        )}
      </div>
    </div>
  );
}

