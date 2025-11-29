import Link from "next/link";
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { AppShell } from "./_components/app-shell";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold tracking-tight">MTG Scanner</h1>
            {session && (
              <Link
                href="/api/auth/signout"
                className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
              >
                Sign out
              </Link>
            )}
          </div>

          {session?.user ? (
            <AppShell />
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <p className="text-center text-lg text-slate-600 dark:text-slate-400">
                Sign in to start scanning your collection.
              </p>
              <Link
                href="/api/auth/signin"
                className="rounded-full bg-slate-900 px-10 py-3 font-semibold text-white no-underline transition hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </main>
    </HydrateClient>
  );
}
