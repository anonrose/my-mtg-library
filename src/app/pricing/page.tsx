"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import { Navbar } from "../_components/marketing/navbar";
import { Footer } from "../_components/marketing/footer";

const tiers = [
  {
    name: "Free",
    id: "free",
    price: "$0",
    priceId: null,
    description: "Perfect for getting started",
    features: [
      "Scan up to 500 cards",
      "Basic analytics",
      "Deck builder",
      "Trade calculator",
    ],
    cta: "Current Plan",
    highlighted: false,
  },
  {
    name: "Premium",
    id: "premium",
    price: "$9.99",
    priceId: "price_premium_monthly", // Replace with actual Stripe price ID
    description: "Unlock all premium features",
    features: [
      "Unlimited card scanning",
      "Historical price tracking",
      "Portfolio performance",
      "Arbitrage finder",
      "AI card grading",
      "Art variation detection",
      "CSV/Spreadsheet export",
      "LGS event locator",
      "Custom profile URL",
      "Life counter & game tracking",
      "Priority support",
    ],
    cta: "Upgrade to Premium",
    highlighted: true,
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const { data: status } = api.subscription.getStatus.useQuery();
  const createCheckout = api.subscription.createCheckoutSession.useMutation();

  const handleSubscribe = async (priceId: string | null) => {
    if (!priceId) return;

    setLoading(priceId);
    try {
      const { url } = await createCheckout.mutateAsync({ priceId });
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      
      <div className="pt-32 pb-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Choose Your
              <span className="block bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Start free, upgrade when you need more power
            </p>
          </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier) => (
            <Card
              key={tier.id}
              className={
                tier.highlighted
                  ? "border-primary shadow-lg relative"
                  : "border-border"
              }
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.priceId && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={tier.highlighted ? "default" : "outline"}
                  disabled={
                    loading === tier.priceId ||
                    (!tier.priceId && true) ||
                    (status?.isPremium && tier.highlighted)
                  }
                  onClick={() => handleSubscribe(tier.priceId)}
                >
                  {loading === tier.priceId
                    ? "Loading..."
                    : status?.isPremium && tier.highlighted
                    ? "Current Plan"
                    : tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

          <div className="mt-12 text-center text-sm text-slate-600 dark:text-slate-400">
            <p>All plans include secure payment processing via Stripe.</p>
            <p className="mt-2">Cancel anytime. No hidden fees.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

