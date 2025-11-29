import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const analyticsRouter = createTRPCRouter({
  getStats: protectedProcedure.query(async ({ ctx }) => {
    const cards = await ctx.db.card.findMany({
      where: { createdBy: { id: ctx.session.user.id } },
      select: {
        price: true,
        set: true,
        colorIdentity: true,
      },
    });

    let totalValue = 0;
    const setDistribution: Record<string, number> = {};
    const colorDistribution: Record<string, number> = {};

    for (const card of cards) {
      // Calculate Total Value
      if (card.price) {
        const price = parseFloat(card.price);
        if (!isNaN(price)) {
          totalValue += price;
        }
      }

      // Calculate Set Distribution (by Count)
      if (card.set) {
        const setCode = card.set.toUpperCase();
        setDistribution[setCode] = (setDistribution[setCode] ?? 0) + 1;
      } else {
        setDistribution.Unknown = (setDistribution.Unknown ?? 0) + 1;
      }

      // Calculate Color Distribution
      // colorIdentity comes from Scryfall as ["W", "U"] etc. We'll assume it's stored as stringified JSON or CSV.
      // For simplicity, let's treat it as a single string if it's just one color, or "Multicolor" / "Colorless".
      // Since we haven't populated it yet, this will be a placeholder logic.
      let colorKey = "Colorless";
      if (card.colorIdentity) {
          // Check if array or string
          try {
              const colors = JSON.parse(card.colorIdentity) as string[];
              if (colors.length === 0) colorKey = "Colorless";
              else if (colors.length === 1) colorKey = colors[0]!;
              else colorKey = "Multicolor";
          } catch (e) {
              // Fallback if simple string
              colorKey = card.colorIdentity || "Colorless";
          }
      }
      colorDistribution[colorKey] = (colorDistribution[colorKey] ?? 0) + 1;
    }

    return {
      totalValue: totalValue.toFixed(2),
      totalCards: cards.length,
      setDistribution: Object.entries(setDistribution).map(([name, value]) => ({
        name,
        value,
      })),
      colorDistribution: Object.entries(colorDistribution).map(([name, value]) => ({
        name,
        value,
      })),
    };
  }),
});

