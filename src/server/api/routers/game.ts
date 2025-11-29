import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const gameRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        deckId: z.number().optional(),
        format: z.string().optional(),
        players: z.array(
          z.object({
            playerName: z.string(),
            startingLife: z.number().default(20),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const game = await ctx.db.game.create({
        data: {
          userId: ctx.session.user.id,
          deckId: input.deckId,
          format: input.format,
          players: {
            create: input.players.map((p) => ({
              playerName: p.playerName,
              startingLife: p.startingLife,
              finalLife: p.startingLife,
            })),
          },
        },
        include: { players: true },
      });

      return game;
    }),

  end: protectedProcedure
    .input(
      z.object({
        gameId: z.number(),
        winner: z.string().optional(),
        notes: z.string().optional(),
        players: z.array(
          z.object({
            id: z.number(),
            finalLife: z.number(),
            isWinner: z.boolean(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Update game
      await ctx.db.game.update({
        where: { id: input.gameId },
        data: {
          endedAt: new Date(),
          winner: input.winner,
          notes: input.notes,
        },
      });

      // Update players
      for (const player of input.players) {
        await ctx.db.gamePlayer.update({
          where: { id: player.id },
          data: {
            finalLife: player.finalLife,
            isWinner: player.isWinner,
          },
        });
      }

      return { success: true };
    }),

  getHistory: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.game.findMany({
      where: { userId: ctx.session.user.id },
      include: { players: true, deck: true },
      orderBy: { startedAt: "desc" },
      take: 50,
    });
  }),

  getStats: protectedProcedure
    .input(z.object({ deckId: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      const where = {
        userId: ctx.session.user.id,
        ...(input.deckId && { deckId: input.deckId }),
        endedAt: { not: null },
      };

      const games = await ctx.db.game.findMany({
        where,
        include: { players: true },
      });

      const wins = games.filter((g) =>
        g.players.some((p) => p.isWinner && p.playerName === "You")
      ).length;

      const winRate = games.length > 0 ? (wins / games.length) * 100 : 0;

      return {
        totalGames: games.length,
        wins,
        losses: games.length - wins,
        winRate: winRate.toFixed(1),
      };
    }),
});

