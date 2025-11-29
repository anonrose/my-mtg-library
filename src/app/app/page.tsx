import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { AppShell } from "../_components/app-shell";

export default async function AppDashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return <AppShell />;
}

