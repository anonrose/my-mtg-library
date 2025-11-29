import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const deckRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), format: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.deck.create({
        data: {
          name: input.name,
          format: input.format,
          user: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.deck.findMany({
      where: { userId: ctx.session.user.id },
      include: { _count: { select: { cards: true } } },
      orderBy: { updatedAt: "desc" },
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.deck.findUnique({
        where: { id: input.id },
        include: { cards: true },
      });
    }),

  addCard: protectedProcedure
    .input(z.object({ deckId: z.number(), cardId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.card.update({
        where: { id: input.cardId },
        data: { deckId: input.deckId },
      });
    }),

  removeCard: protectedProcedure
    .input(z.object({ cardId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.card.update({
        where: { id: input.cardId },
        data: { deckId: null },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // First remove all cards from deck (set deckId to null)
      await ctx.db.card.updateMany({
        where: { deckId: input.id },
        data: { deckId: null },
      });

      return ctx.db.deck.delete({
        where: { id: input.id },
      });
    }),
});

