import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const alertRouter = createTRPCRouter({
  setPriceAlert: protectedProcedure
    .input(z.object({ cardId: z.number(), priceThreshold: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.card.update({
        where: { id: input.cardId },
        data: { priceAlertThreshold: input.priceThreshold },
      });
    }),

  checkAlerts: protectedProcedure.mutation(async ({ ctx }) => {
    // This would typically be a background job (Cron)
    // For now, we'll just fetch all cards with alerts and log them
    const watchedCards = await ctx.db.card.findMany({
      where: {
        priceAlertThreshold: { not: null },
        createdBy: { id: ctx.session.user.id },
      },
    });

    const alertsTriggered = [];

    for (const card of watchedCards) {
      if (!card.price || !card.priceAlertThreshold) continue;
      const currentPrice = parseFloat(card.price);

      // Simple logic: If current price is below threshold (Target Buy Price reached)
      if (currentPrice <= card.priceAlertThreshold) {
        alertsTriggered.push({
          cardId: card.id,
          name: card.name,
          currentPrice,
          targetPrice: card.priceAlertThreshold,
        });
      }
    }

    return { triggered: alertsTriggered.length, details: alertsTriggered };
  }),
});

