"use client";

import Link from "next/link";
import {
  Camera,
  BarChart3,
  Layers,
  TrendingUp,
  Calculator,
  MapPin,
  Sparkles,
  Zap,
} from "lucide-react";
import { Hero } from "./_components/marketing/hero";
import { FeatureCard } from "./_components/marketing/feature-card";
import { StatsSection } from "./_components/marketing/stats-section";
import { CTASection } from "./_components/marketing/cta-section";
import { Navbar } from "./_components/marketing/navbar";
import { Footer } from "./_components/marketing/footer";

export default function HomePage() {
  const features = [
    {
      icon: Camera,
      title: "AI-Powered Scanner",
      description:
        "Scan your cards with cutting-edge AI recognition. Instantly identify cards, editions, and conditions with 99% accuracy.",
    },
    {
      icon: Layers,
      title: "Collection Management",
      description:
        "Organize your entire collection with ease. Track quantities, conditions, and values in one centralized hub.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Visualize your collection's performance with detailed charts and insights. Track portfolio growth over time.",
    },
    {
      icon: TrendingUp,
      title: "Real-Time Price Tracking",
      description:
        "Stay updated with live market prices. Get alerts when your cards gain or lose value significantly.",
    },
    {
      icon: Calculator,
      title: "Trade Calculator",
      description:
        "Make fair trades with our intelligent trade calculator. Compare values instantly and confidently.",
    },
    {
      icon: MapPin,
      title: "LGS Locator",
      description:
        "Find local game stores and events near you. Connect with the MTG community in your area.",
    },
    {
      icon: Sparkles,
      title: "Art Detection",
      description:
        "Automatically detect art variations and special editions. Never miss valuable alternate arts.",
    },
    {
      icon: Zap,
      title: "Deck Builder",
      description:
        "Build and optimize decks from your collection. Get format legality checks and mana curve analysis.",
    },
  ];

  const stats = [
    { value: "500000+", label: "Cards Scanned" },
    { value: "99", label: "Recognition Accuracy", suffix: "%" },
    { value: "5000+", label: "Active Users" },
    { value: "24", label: "Price Updates Daily", suffix: "/7" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to Manage Your Collection
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              From scanning to trading, we&apos;ve built the ultimate toolkit for MTG
              collectors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* How It Works Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Start Organizing in Minutes
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Three simple steps to manage your collection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up Free</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Create your account in seconds. No credit card required to get
                started.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Scan Your Cards</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Use our AI scanner to quickly add cards to your collection with
                a single photo.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Track & Trade</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Monitor values, build decks, and make informed trading
                decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Start free, upgrade when you need more features
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-bold mb-4">
                $0<span className="text-lg text-slate-500">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Scan up to 500 cards
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Basic analytics
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Deck builder
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Trade calculator
                </li>
              </ul>
              <Link
                href="/api/auth/signin"
                className="block text-center px-6 py-3 rounded-lg border-2 border-slate-300 dark:border-slate-700 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Get Started
              </Link>
            </div>

            <div className="border-2 border-purple-500 rounded-2xl p-8 relative bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <div className="text-4xl font-bold mb-4">
                $9.99<span className="text-lg text-slate-500">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Unlimited card scanning
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Historical price tracking
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Portfolio analytics
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> AI card grading
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span> Priority support
                </li>
              </ul>
              <Link
                href="/pricing"
                className="block text-center px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-700 hover:to-blue-700 transition-colors"
              >
                Upgrade to Premium
              </Link>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/pricing"
              className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
            >
              View full pricing details →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <CTASection
        title="Ready to Transform Your Collection?"
        description="Join thousands of MTG players who are already managing their collections smarter."
        primaryButton={{
          text: "Start Scanning Free",
          href: "/api/auth/signin",
        }}
        secondaryButton={{
          text: "Explore Features",
          href: "/features",
        }}
      />

      <Footer />
    </div>
  );
}
