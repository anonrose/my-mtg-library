import { z } from "zod";
import OpenAI from "openai";
import { env } from "~/env";
import { TRPCError } from "@trpc/server";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const cardRouter = createTRPCRouter({
  identify: protectedProcedure
    .input(z.object({ image: z.string() }))
    .mutation(async ({ input }) => {
      // 1. Identify with OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Identify this Magic: The Gathering card. Return the exact card name and the set code (3-4 characters) if visible. If the set is not clearly visible, return null for set.",
              },
              {
                type: "image_url",
                image_url: {
                  url: input.image,
                },
              },
            ],
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "card_identification",
            schema: {
              type: "object",
              properties: {
                name: { type: "string", description: "The name of the card" },
                set: { type: "string", nullable: true, description: "The set code of the card if visible" },
              },
              required: ["name", "set"],
              additionalProperties: false,
            },
            strict: true,
          },
        },
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error("Failed to identify card");
      }

      const identified = JSON.parse(content) as { name: string; set: string | null };

      // 2. Enrich with Scryfall
      let scryfallUrl = `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(identified.name)}`;
      if (identified.set) {
        scryfallUrl += `&set=${encodeURIComponent(identified.set)}`;
      }

      const scryfallRes = await fetch(scryfallUrl);

      if (!scryfallRes.ok) {
          // Fallback to just name search if set search fails
          if (identified.set) {
             const fallbackUrl = `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(identified.name)}`;
             const fallbackRes = await fetch(fallbackUrl);
             if (fallbackRes.ok) {
                 const data = await fallbackRes.json() as any;
                 return {
                     name: data.name,
                     set: data.set,
                     price: data.prices?.usd ?? data.prices?.usd_foil ?? "N/A",
                     imageUrl: data.image_uris?.normal ?? data.image_uris?.large,
                     scryfallId: data.id,
                     oracleText: data.oracle_text,
                     typeLine: data.type_line,
                     colorIdentity: JSON.stringify(data.color_identity),
                 };
             }
          }
          // If both fail, return what we have from OpenAI
          return {
              name: identified.name,
              set: identified.set,
              price: null,
              imageUrl: null,
              scryfallId: null,
              oracleText: null,
              typeLine: null,
              colorIdentity: null,
          };
      }

      const data = await scryfallRes.json() as any;

      return {
        name: data.name,
        set: data.set,
        price: data.prices?.usd ?? data.prices?.usd_foil ?? "N/A",
        imageUrl: data.image_uris?.normal ?? data.image_uris?.large ?? null,
        scryfallId: data.id,
        oracleText: data.oracle_text,
        typeLine: data.type_line,
        colorIdentity: JSON.stringify(data.color_identity),
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        set: z.string().nullable(),
        price: z.string().nullable(),
        imageUrl: z.string().nullable(),
        scryfallId: z.string().nullable().optional(),
        oracleText: z.string().nullable().optional(),
        typeLine: z.string().nullable().optional(),
        colorIdentity: z.string().nullable().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check card limit for free users
      const subscription = await ctx.db.subscription.findUnique({
        where: { userId: ctx.session.user.id },
      });

      const isPremium = subscription?.status === "active";

      if (!isPremium) {
        const cardCount = await ctx.db.card.count({
          where: { createdById: ctx.session.user.id },
        });

        if (cardCount >= 500) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message:
              "Free users are limited to 500 cards. Upgrade to Premium for unlimited cards.",
          });
        }
      }

      return ctx.db.card.create({
        data: {
          name: input.name,
          set: input.set,
          price: input.price,
          imageUrl: input.imageUrl,
          scryfallId: input.scryfallId,
          oracleText: input.oracleText,
          typeLine: input.typeLine,
          colorIdentity: input.colorIdentity,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.card.findMany({
      orderBy: { scannedAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  toggleTradable: protectedProcedure
    .input(z.object({ id: z.number(), isTradable: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.card.update({
        where: { id: input.id },
        data: { isTradable: input.isTradable },
      });
    }),
});
