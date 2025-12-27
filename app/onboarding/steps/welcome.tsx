"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeStepProps {
  onNext: () => void;
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-2xl mx-auto py-12">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mb-4"
      >
        <Sparkles className="w-12 h-12 text-primary animate-pulse" />
      </motion.div>

      <div className="space-y-4">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70"
        >
          Welcome to the Future of Learning
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xl text-muted-foreground"
        >
          Your personalized companion for mastering subjects with AI-powered
          tools, interactive labs, and tailored study plans.
        </motion.p>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Button
          size="lg"
          onClick={onNext}
          className="h-14 px-8 text-lg rounded-full group"
        >
          Let's Get Started
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="grid grid-cols-3 gap-8 w-full pt-12"
      >
        {[
          { label: "AI Tutor", desc: "Smarter way to learn" },
          { label: "Virtual Labs", desc: "Practice anywhere" },
          { label: "Smart Prep", desc: "Ace your exams" },
        ].map((item, i) => (
          <div key={i} className="text-center p-4">
            <div className="font-semibold text-foreground">{item.label}</div>
            <div className="text-sm text-muted-foreground">{item.desc}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
