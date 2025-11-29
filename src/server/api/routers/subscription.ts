import Stripe from "stripe";
import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-11-17.clover",
});

export const subscriptionRouter = createTRPCRouter({
  getStatus: protectedProcedure.query(async ({ ctx }) => {
    const subscription = await ctx.db.subscription.findUnique({
      where: { userId: ctx.session.user.id },
    });

    return {
      isPremium: subscription?.status === "active",
      subscription,
    };
  }),

  createCheckoutSession: protectedProcedure
    .input(z.object({ priceId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const subscription = await ctx.db.subscription.findUnique({
        where: { userId: ctx.session.user.id },
      });

      if (subscription?.stripeCustomerId) {
        const session = await stripe.billingPortal.sessions.create({
          customer: subscription.stripeCustomerId,
          return_url: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/dashboard`,
        });

        return { url: session.url };
      }

      const session = await stripe.checkout.sessions.create({
        customer_email: ctx.session.user.email ?? undefined,
        billing_address_collection: "auto",
        line_items: [
          {
            price: input.priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/dashboard?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/pricing?canceled=true`,
        metadata: {
          userId: ctx.session.user.id,
        },
      });

      return { url: session.url };
    }),

  createPortalSession: protectedProcedure.mutation(async ({ ctx }) => {
    const subscription = await ctx.db.subscription.findUnique({
      where: { userId: ctx.session.user.id },
    });

    if (!subscription?.stripeCustomerId) {
      throw new Error("No subscription found");
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/dashboard`,
    });

    return { url: session.url };
  }),
});

