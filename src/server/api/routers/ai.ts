import { z } from "zod";
import OpenAI from "openai";
import { env } from "~/env";
import { premiumProcedure, createTRPCRouter } from "~/server/api/trpc";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const aiRouter = createTRPCRouter({
  gradeCard: premiumProcedure
    .input(z.object({ image: z.string() }))
    .mutation(async ({ input }) => {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this Magic: The Gathering card's condition. Look for: edge wear, corner damage, surface scratches, whitening on edges/corners, centering issues. Provide a grade (NM, LP, MP, HP, DMG) and explanation.",
              },
              {
                type: "image_url",
                image_url: { url: input.image },
              },
            ],
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "card_grading",
            schema: {
              type: "object",
              properties: {
                grade: {
                  type: "string",
                  enum: ["NM", "LP", "MP", "HP", "DMG"],
                  description: "Card condition grade",
                },
                confidence: {
                  type: "number",
                  description: "Confidence score 0-100",
                },
                issues: {
                  type: "array",
                  items: { type: "string" },
                  description: "List of condition issues detected",
                },
                explanation: {
                  type: "string",
                  description: "Detailed explanation of the grade",
                },
              },
              required: ["grade", "confidence", "issues", "explanation"],
              additionalProperties: false,
            },
            strict: true,
          },
        },
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error("Failed to grade card");

      return JSON.parse(content) as {
        grade: string;
        confidence: number;
        issues: string[];
        explanation: string;
      };
    }),

  detectArtVariation: premiumProcedure
    .input(z.object({ image: z.string(), cardName: z.string() }))
    .mutation(async ({ input }) => {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Identify the art variation for "${input.cardName}". Detect: Foil, Extended Art, Borderless, Showcase, Full Art, Etched Foil, Prerelease, Promo Pack, etc.`,
              },
              {
                type: "image_url",
                image_url: { url: input.image },
              },
            ],
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "art_variation",
            schema: {
              type: "object",
              properties: {
                variation: {
                  type: "string",
                  description: "Art variation type",
                },
                isFinish: {
                  type: "string",
                  enum: ["nonfoil", "foil", "etched"],
                },
                treatment: {
                  type: "array",
                  items: { type: "string" },
                  description: "Special treatments like extended art, borderless",
                },
              },
              required: ["variation", "isFinish", "treatment"],
              additionalProperties: false,
            },
            strict: true,
          },
        },
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error("Failed to detect variation");

      return JSON.parse(content) as {
        variation: string;
        isFinish: string;
        treatment: string[];
      };
    }),
});

