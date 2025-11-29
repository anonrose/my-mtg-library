import { cardRouter } from "~/server/api/routers/card";
import { analyticsRouter } from "~/server/api/routers/analytics";
import { deckRouter } from "~/server/api/routers/deck";
import { alertRouter } from "~/server/api/routers/alert";
import { subscriptionRouter } from "~/server/api/routers/subscription";
import { priceHistoryRouter } from "~/server/api/routers/price-history";
import { premiumAnalyticsRouter } from "~/server/api/routers/premium-analytics";
import { aiRouter } from "~/server/api/routers/ai";
import { exportRouter } from "~/server/api/routers/export";
import { gameRouter } from "~/server/api/routers/game";
import { socialRouter } from "~/server/api/routers/social";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  card: cardRouter,
  analytics: analyticsRouter,
  deck: deckRouter,
  alert: alertRouter,
  subscription: subscriptionRouter,
  priceHistory: priceHistoryRouter,
  premiumAnalytics: premiumAnalyticsRouter,
  ai: aiRouter,
  export: exportRouter,
  game: gameRouter,
  social: socialRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
