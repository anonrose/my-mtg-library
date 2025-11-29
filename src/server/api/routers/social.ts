import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const socialRouter = createTRPCRouter({
  // Set username for custom profile URL
  setUsername: protectedProcedure
    .input(z.object({ username: z.string().min(3).max(20) }))
    .mutation(async ({ ctx, input }) => {
      // Check if username is already taken
      const existing = await ctx.db.user.findUnique({
        where: { username: input.username },
      });

      if (existing && existing.id !== ctx.session.user.id) {
        throw new Error("Username already taken");
      }

      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { username: input.username },
      });
    }),

  // Get public profile
  getPublicProfile: protectedProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { username: input.username },
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      });

      if (!user) throw new Error("User not found");

      const tradableCards = await ctx.db.card.findMany({
        where: {
          createdById: user.id,
          isTradable: true,
        },
        select: {
          id: true,
          name: true,
          set: true,
          price: true,
          imageUrl: true,
        },
      });

      return {
        user,
        tradableCards,
      };
    }),

  // Wishlist management
  addToWishlist: protectedProcedure
    .input(
      z.object({
        cardName: z.string(),
        set: z.string().optional(),
        maxPrice: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.wishlist.create({
        data: {
          userId: ctx.session.user.id,
          cardName: input.cardName,
          set: input.set,
          maxPrice: input.maxPrice,
        },
      });
    }),

  getWishlist: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.wishlist.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),

  removeFromWishlist: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.wishlist.delete({
        where: { id: input.id },
      });
    }),

  // Auto-match: find users who have cards on my wishlist
  findMatches: protectedProcedure.query(async ({ ctx }) => {
    const myWishlist = await ctx.db.wishlist.findMany({
      where: { userId: ctx.session.user.id },
    });

    const matches = [];

    for (const wish of myWishlist) {
      const matchingCards = await ctx.db.card.findMany({
        where: {
          name: { contains: wish.cardName, mode: "insensitive" },
          isTradable: true,
          createdById: { not: ctx.session.user.id },
        },
        include: {
          createdBy: {
            select: { id: true, name: true, username: true },
          },
        },
        take: 5,
      });

      if (matchingCards.length > 0) {
        matches.push({
          wishlistItem: wish,
          cards: matchingCards,
        });
      }
    }

    return matches;
  }),
});

