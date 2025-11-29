import { createTRPCRouter, protectedProcedure, premiumProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const premiumAnalyticsRouter = createTRPCRouter({
  // Portfolio performance over time
  getPortfolioPerformance: premiumProcedure
    .input(z.object({ days: z.number().default(30) }))
    .query(async ({ ctx, input }) => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - input.days);

      // Get all user's cards
      const cards = await ctx.db.card.findMany({
        where: { createdById: ctx.session.user.id },
        include: {
          priceHistory: {
            where: { createdAt: { gte: startDate } },
            orderBy: { createdAt: "asc" },
          },
        },
      });

      // Calculate total portfolio value over time
      const dateMap = new Map<string, number>();

      for (const card of cards) {
        for (const history of card.priceHistory) {
          const dateKey = history.createdAt.toISOString().split("T")[0];
          const price = parseFloat(history.price) || 0;
          dateMap.set(dateKey!, (dateMap.get(dateKey!) || 0) + price);
        }
      }

      const performance = Array.from(dateMap.entries())
        .map(([date, value]) => ({ date, value: value.toFixed(2) }))
        .sort((a, b) => a.date.localeCompare(b.date));

      return performance;
    }),

  // Arbitrage finder: cards with significant price differences
  getArbitrageOpportunities: premiumProcedure.query(async ({ ctx }) => {
    // This is a simplified version - in production, you'd compare multiple sources
    const cards = await ctx.db.card.findMany({
      where: {
        createdById: ctx.session.user.id,
        price: { not: null },
      },
      take: 100,
    });

    const opportunities = [];

    for (const card of cards) {
      if (!card.scryfallId) continue;

      try {
        // Fetch from Scryfall
        const res = await fetch(
          `https://api.scryfall.com/cards/${card.scryfallId}`
        );
        if (res.ok) {
          const data = (await res.json()) as any;
          const scryfallPrice = parseFloat(data.prices?.usd ?? "0");
          const currentPrice = parseFloat(card.price ?? "0");
          const diff = scryfallPrice - currentPrice;
          const percentDiff = currentPrice > 0 ? (diff / currentPrice) * 100 : 0;

          // Show significant differences (>10%)
          if (Math.abs(percentDiff) > 10) {
            opportunities.push({
              cardId: card.id,
              name: card.name,
              currentPrice,
              scryfallPrice,
              difference: diff,
              percentDiff: percentDiff.toFixed(1),
            });
          }
        }
      } catch (e) {
        console.error(`Failed to check arbitrage for ${card.name}`, e);
      }
    }

    return opportunities.sort((a, b) => Math.abs(b.percentDiff as any) - Math.abs(a.percentDiff as any)).slice(0, 20);
  }),

  // Currency conversion
  convertCurrency: premiumProcedure
    .input(
      z.object({
        amount: z.number(),
        from: z.string().default("USD"),
        to: z.string(),
      })
    )
    .query(async ({ input }) => {
      // In production, use a real API like exchangerate-api.com
      // For now, mock some conversions
      const rates: Record<string, number> = {
        USD: 1,
        EUR: 0.92,
        GBP: 0.79,
        JPY: 148.5,
      };

      const fromRate = rates[input.from] || 1;
      const toRate = rates[input.to] || 1;
      const converted = (input.amount / fromRate) * toRate;

      return {
        amount: input.amount,
        from: input.from,
        to: input.to,
        converted: converted.toFixed(2),
        rate: (toRate / fromRate).toFixed(4),
      };
    }),
});

