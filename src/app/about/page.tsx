"use client";

import { Heart, Target, Users, Zap } from "lucide-react";
import { Navbar } from "../_components/marketing/navbar";
import { Footer } from "../_components/marketing/footer";
import { CTASection } from "../_components/marketing/cta-section";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Player First",
      description:
        "We're MTG players ourselves. Every feature is designed with the player experience in mind.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "Leveraging cutting-edge AI and technology to solve real problems for collectors.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Building tools that bring players together and make the game more accessible.",
    },
    {
      icon: Target,
      title: "Accuracy",
      description:
        "Committed to providing the most accurate card recognition and pricing data available.",
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
              Built by Players,
              <span className="block bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 bg-clip-text text-transparent">
                For Players
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              We're on a mission to make MTG collection management easier,
              smarter, and more accessible for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                MTG Library was born from a simple frustration: managing a Magic
                collection shouldn't be this hard. As long-time players, we've
                experienced the pain of manually cataloging thousands of cards,
                tracking prices across multiple platforms, and struggling to
                remember what we own when building decks or making trades.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                We knew there had to be a better way. Combining our passion for
                Magic with expertise in AI and software development, we set out
                to build the collection management tool we always wished we had.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                Today, MTG Library serves thousands of players worldwide,
                helping them organize collections, make smarter trading
                decisions, and spend less time on inventory management and more
                time playing the game they love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-xl text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
              To empower Magic: The Gathering players with the best tools for
              managing, tracking, and growing their collections.
            </p>

            <div className="bg-gradient-to-br from-purple-600 via-violet-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Why It Matters
              </h3>
              <p className="text-lg text-purple-100 mb-4">
                For many players, their MTG collection represents years of
                memories, significant financial investment, and countless hours
                of joy. Yet most players struggle with basic questions like:
              </p>
              <ul className="space-y-2 text-purple-100 mb-6">
                <li>• "Do I already own this card?"</li>
                <li>• "What's my collection actually worth?"</li>
                <li>• "Which cards have increased in value?"</li>
                <li>• "What do I need to complete my deck?"</li>
              </ul>
              <p className="text-lg text-purple-100">
                We believe every player deserves instant, accurate answers to
                these questions. That's why we're building MTG Library with
                cutting-edge technology, player-focused design, and unwavering
                commitment to your experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Powered by Advanced Technology
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
              We leverage state-of-the-art AI and machine learning to deliver
              the most accurate card recognition in the industry.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Computer Vision AI
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Our neural networks are trained on millions of card images to
                  instantly recognize cards from photos.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Real-Time Data Sync
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Cloud infrastructure ensures your collection is always
                  up-to-date across all devices.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Market Analysis</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Aggregating price data from multiple sources to provide
                  accurate market insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Have questions, feedback, or just want to say hi? We'd love to
              hear from you.
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
        title="Join Our Community"
        description="Be part of the growing community of players managing their collections smarter."
        primaryButton={{
          text: "Start Free Today",
          href: "/api/auth/signin",
        }}
        secondaryButton={{
          text: "View Features",
          href: "/features",
        }}
      />

      <Footer />
    </div>
  );
}

