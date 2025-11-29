import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const priceHistoryRouter = createTRPCRouter({
  // Fetch historical prices for a card
  getHistory: protectedProcedure
    .input(z.object({ cardId: z.number(), days: z.number().default(30) }))
    .query(async ({ ctx, input }) => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - input.days);

      const history = await ctx.db.priceHistory.findMany({
        where: {
          cardId: input.cardId,
          createdAt: { gte: startDate },
        },
        orderBy: { createdAt: "asc" },
      });

      return history;
    }),

  // Update prices for all cards (cron job endpoint)
  updatePrices: protectedProcedure.mutation(async ({ ctx }) => {
    // This should ideally be a server-side cron job or API route
    // For now, we'll create a stub that updates a few cards
    const cards = await ctx.db.card.findMany({
      where: { scryfallId: { not: null } },
      take: 50, // Limit to avoid rate limiting
    });

    const updates = [];

    for (const card of cards) {
      if (!card.scryfallId) continue;

      try {
        const res = await fetch(
          `https://api.scryfall.com/cards/${card.scryfallId}`
        );
        if (res.ok) {
          const data = (await res.json()) as any;
          const newPrice = data.prices?.usd ?? data.prices?.usd_foil;

          if (newPrice) {
            // Update card price
            await ctx.db.card.update({
              where: { id: card.id },
              data: { price: newPrice },
            });

            // Create price history entry
            await ctx.db.priceHistory.create({
              data: {
                cardId: card.id,
                price: newPrice,
                source: "scryfall",
                currency: "USD",
              },
            });

            updates.push({ cardId: card.id, newPrice });
          }
        }
      } catch (e) {
        console.error(`Failed to update price for card ${card.id}`, e);
      }
    }

    return { updated: updates.length, cards: updates };
  }),
});

