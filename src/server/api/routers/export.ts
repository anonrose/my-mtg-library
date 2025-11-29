import { z } from "zod";
import { premiumProcedure, createTRPCRouter } from "~/server/api/trpc";

export const exportRouter = createTRPCRouter({
  exportToCSV: premiumProcedure.query(async ({ ctx }) => {
    const cards = await ctx.db.card.findMany({
      where: { createdById: ctx.session.user.id },
      orderBy: { name: "asc" },
    });

    // CSV Header
    const headers = [
      "Name",
      "Set",
      "Price",
      "Condition",
      "Quantity",
      "Foil",
      "Type",
      "Scanned Date",
    ];

    // CSV Rows
    const rows = cards.map((card) => [
      `"${card.name.replace(/"/g, '""')}"`,
      card.set || "",
      card.price || "",
      card.condition || "NM",
      "1",
      "No",
      card.typeLine || "",
      card.scannedAt.toISOString().split("T")[0],
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return {
      csv,
      filename: `mtg-collection-${new Date().toISOString().split("T")[0]}.csv`,
      count: cards.length,
    };
  }),

  exportDeckToText: premiumProcedure
    .input(z.object({ deckId: z.number() }))
    .query(async ({ ctx, input }) => {
      const deck = await ctx.db.deck.findUnique({
        where: { id: input.deckId },
        include: { cards: true },
      });

      if (!deck) throw new Error("Deck not found");

      const text = deck.cards.map((c) => `1 ${c.name}`).join("\n");

      return {
        text,
        filename: `${deck.name.replace(/\s+/g, "_")}.txt`,
        count: deck.cards.length,
      };
    }),
});

