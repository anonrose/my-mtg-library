"use client";

import {
  Camera,
  Layers,
  BarChart3,
  TrendingUp,
  Calculator,
  MapPin,
  Sparkles,
  Zap,
  FileSpreadsheet,
  Palette,
  Heart,
  Shield,
  Smartphone,
  Cloud,
} from "lucide-react";
import { Navbar } from "../_components/marketing/navbar";
import { Footer } from "../_components/marketing/footer";
import { FeatureCard } from "../_components/marketing/feature-card";
import { CTASection } from "../_components/marketing/cta-section";

export default function FeaturesPage() {
  const coreFeatures = [
    {
      icon: Camera,
      title: "AI-Powered Card Scanner",
      description:
        "Our advanced computer vision technology recognizes cards instantly from photos. Simply point your camera at a card and let our AI do the rest. Identifies card name, set, edition, and even condition automatically.",
    },
    {
      icon: Layers,
      title: "Complete Collection Management",
      description:
        "Organize your entire MTG collection in one place. Track quantities, conditions, foil status, and languages. Filter and search through thousands of cards in seconds with our powerful search engine.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics Dashboard",
      description:
        "Visualize your collection with beautiful charts and graphs. See your most valuable cards, color distribution, format legality, and collection completion percentages at a glance.",
    },
    {
      icon: TrendingUp,
      title: "Real-Time Price Tracking",
      description:
        "Stay on top of the market with live price updates from major retailers. Get notifications when cards spike or drop in value. Historical price charts help you make informed trading decisions.",
    },
  ];

  const tradingFeatures = [
    {
      icon: Calculator,
      title: "Intelligent Trade Calculator",
      description:
        "Calculate fair trade values instantly. Compare cards side by side with current market prices. Our algorithm accounts for condition, edition, and market trends to ensure fair trades.",
    },
    {
      icon: Heart,
      title: "Digital Trade Binder",
      description:
        "Create and share your trade binder online. Generate QR codes for easy sharing at events. Mark cards as for trade, wanted, or protected from your collection.",
    },
  ];

  const deckFeatures = [
    {
      icon: Zap,
      title: "Advanced Deck Builder",
      description:
        "Build and save unlimited decks. Check format legality automatically. View mana curve analysis and card type distributions. Import and export decks in various formats.",
    },
    {
      icon: Heart,
      title: "Life Counter & Game Tracker",
      description:
        "Track life totals, commander damage, poison counters, and energy. Record game statistics and track your win rate by deck and opponent.",
    },
  ];

  const premiumFeatures = [
    {
      icon: Sparkles,
      title: "AI Card Grading",
      description:
        "Get instant condition assessments using AI. Our machine learning model analyzes photos for wear, edge damage, and surface quality to estimate card condition.",
    },
    {
      icon: Palette,
      title: "Art Variation Detection",
      description:
        "Automatically identify alternate arts, borderless variants, extended art, and special treatments. Never miss a valuable variant in your collection.",
    },
    {
      icon: FileSpreadsheet,
      title: "Export & Backup",
      description:
        "Export your collection to CSV, Excel, or various deck formats. Automatic cloud backups ensure your collection data is always safe and accessible.",
    },
    {
      icon: MapPin,
      title: "Local Game Store Finder",
      description:
        "Find LGS locations near you with integrated maps. View store ratings, event calendars, and get directions. Connect with your local MTG community.",
    },
  ];

  const technicalFeatures = [
    {
      icon: Cloud,
      title: "Cloud Sync",
      description:
        "Access your collection from any device. Changes sync instantly across web, mobile, and tablet. Your data is encrypted and securely stored.",
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description:
        "Fully responsive design works perfectly on phones and tablets. Scan cards on the go and update your collection anywhere.",
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description:
        "Your collection data is private by default. Share only what you want. Industry-standard encryption protects your account and data.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Powerful Features for
              <span className="block bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 bg-clip-text text-transparent">
                Serious Collectors
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              Everything you need to manage, track, and grow your MTG collection
              in one comprehensive platform
            </p>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Core Features
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Essential tools every MTG collector needs
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {coreFeatures.map((feature, index) => (
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

      {/* Trading Features */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Trading & Social
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Make better trades and connect with other collectors
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {tradingFeatures.map((feature, index) => (
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

      {/* Deck Building & Play */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Deck Building & Play
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Build better decks and track your games
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {deckFeatures.map((feature, index) => (
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

      {/* Premium Features */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-violet-50 to-blue-50 dark:from-purple-950/20 dark:via-violet-950/20 dark:to-blue-950/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Premium Features
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Unlock advanced capabilities with Premium
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumFeatures.map((feature, index) => (
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

      {/* Technical Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Built for Reliability
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Enterprise-grade infrastructure you can trust
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {technicalFeatures.map((feature, index) => (
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

      {/* CTA Section */}
      <CTASection
        title="Ready to Experience These Features?"
        description="Start with our free plan and upgrade anytime to unlock premium features."
        primaryButton={{
          text: "Get Started Free",
          href: "/api/auth/signin",
        }}
        secondaryButton={{
          text: "View Pricing",
          href: "/pricing",
        }}
      />

      <Footer />
    </div>
  );
}
