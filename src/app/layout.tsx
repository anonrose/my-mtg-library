import "~/styles/globals.css";

import { type Viewport } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { createMetadata } from "~/lib/metadata";

export const metadata = createMetadata({
  title: "MTG Library",
  description:
    "Manage your Magic: The Gathering collection with AI-powered card recognition. Track prices, build decks, and organize your cards effortlessly.",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
