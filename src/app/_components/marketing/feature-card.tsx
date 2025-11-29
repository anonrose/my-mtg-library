"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="h-full border-2 hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
        <CardContent className="p-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 via-violet-600 to-blue-600 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-slate-600 dark:text-slate-400">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

