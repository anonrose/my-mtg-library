"use client";

import { Navbar } from "../_components/marketing/navbar";
import { Footer } from "../_components/marketing/footer";
import { FAQAccordion } from "../_components/marketing/faq-accordion";
import { CTASection } from "../_components/marketing/cta-section";

export default function FAQPage() {
  const generalFAQs = [
    {
      question: "What is MTG Library?",
      answer:
        "MTG Library is a comprehensive collection management tool for Magic: The Gathering players. It uses AI-powered card recognition to help you scan, organize, track, and analyze your card collection. Whether you're a casual player or serious collector, MTG Library provides tools to manage your cards effortlessly.",
    },
    {
      question: "Is MTG Library free to use?",
      answer:
        "Yes! We offer a free tier that includes scanning up to 500 cards, basic analytics, deck builder, and trade calculator. Our Premium plan ($9.99/month) unlocks unlimited scanning, advanced features like historical price tracking, AI card grading, and more.",
    },
    {
      question: "Do I need to download an app?",
      answer:
        "No app download required! MTG Library works directly in your web browser on any device - desktop, laptop, tablet, or smartphone. Your collection syncs automatically across all devices, so you can access it anywhere.",
    },
  ];

  const scanningFAQs = [
    {
      question: "How does the card scanner work?",
      answer:
        "Our AI-powered scanner uses advanced computer vision technology to recognize cards from photos. Simply take a picture of your card with your device's camera, and our AI instantly identifies the card name, set, edition, and can even estimate condition. The process takes less than a second per card.",
    },
    {
      question: "How accurate is the card recognition?",
      answer:
        "Our AI achieves 99% accuracy in recognizing cards. It can identify cards even from partial images, different angles, and various lighting conditions. For rare cases where automatic recognition isn't confident, you can manually confirm or select the correct card.",
    },
    {
      question: "Can I scan multiple cards at once?",
      answer:
        "Currently, the scanner works best with one card at a time for maximum accuracy. However, the process is very fast - you can easily scan dozens of cards per minute. Batch scanning features are planned for future updates.",
    },
    {
      question: "Does it work with foreign language cards?",
      answer:
        "Yes! Our AI recognizes cards in all languages. The system uses visual recognition of the card art and layout rather than text recognition, so language isn't a barrier.",
    },
  ];

  const pricingFAQs = [
    {
      question: "How does price tracking work?",
      answer:
        "We aggregate real-time pricing data from major MTG retailers and marketplaces. Prices update every 24 hours, and Premium users can view historical price charts to track value changes over time. You'll also receive notifications when cards in your collection have significant price movements.",
    },
    {
      question: "Can I cancel my Premium subscription anytime?",
      answer:
        "Absolutely! You can cancel your Premium subscription at any time with no penalties or fees. Your Premium features will remain active until the end of your current billing period. Even after canceling, you can still access your collection with the free tier features.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express, Discover) through our secure payment processor, Stripe. Your payment information is encrypted and never stored on our servers.",
    },
  ];

  const dataFAQs = [
    {
      question: "Is my collection data private and secure?",
      answer:
        "Yes, absolutely. Your collection data is private by default and only visible to you. We use industry-standard encryption for data transmission and storage. You control what information you share - you can make your profile and trade binder public while keeping your full collection private.",
    },
    {
      question: "Can I export my collection data?",
      answer:
        "Premium users can export their collection in multiple formats including CSV, Excel, and various deck list formats (TXT, .dek). This ensures you always have a backup and can use your data with other tools if needed.",
    },
    {
      question: "What happens if I delete my account?",
      answer:
        "If you delete your account, all your collection data will be permanently removed from our servers within 30 days. Before deletion, we recommend exporting your collection data for your records.",
    },
  ];

  const featureFAQs = [
    {
      question: "Can I build decks from my collection?",
      answer:
        "Yes! Our deck builder lets you create unlimited decks and automatically shows which cards you own. It includes format legality checking, mana curve analysis, and card type distribution. You can also import decks from popular formats and export them to various deck list formats.",
    },
    {
      question: "How does the trade calculator work?",
      answer:
        "The trade calculator helps you evaluate fair trades by comparing current market values of cards. Simply add cards to each side of the trade, and we'll show you the total value difference based on real-time prices and card conditions.",
    },
    {
      question: "Does it support all MTG sets and formats?",
      answer:
        "Yes! MTG Library includes every Magic: The Gathering set ever released, from Alpha to the latest releases. We support all formats including Standard, Modern, Commander, Legacy, Vintage, and more.",
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
              Frequently Asked
              <span className="block bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Everything you need to know about MTG Library
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* General */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              General Questions
            </h2>
            <FAQAccordion items={generalFAQs} />
          </div>

          {/* Scanning */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Card Scanning
            </h2>
            <FAQAccordion items={scanningFAQs} />
          </div>

          {/* Pricing */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Pricing & Billing
            </h2>
            <FAQAccordion items={pricingFAQs} />
          </div>

          {/* Data & Privacy */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Data & Privacy
            </h2>
            <FAQAccordion items={dataFAQs} />
          </div>

          {/* Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
            <FAQAccordion items={featureFAQs} />
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Can't find the answer you're looking for? Our support team is here
              to help.
            </p>
            <a
              href="mailto:support@mtglibrary.com"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Get Started?"
        description="Join thousands of players already managing their collections with MTG Library."
        primaryButton={{
          text: "Start Free Today",
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
