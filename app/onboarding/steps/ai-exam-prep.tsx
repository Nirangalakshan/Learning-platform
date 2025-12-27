"use client";

import { motion } from "framer-motion";
import { Zap, Target, BookOpen, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIExamPrepStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function AIExamPrepStep({
  onNext,
  onBack,
}: AIExamPrepStepProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-10 max-w-4xl mx-auto py-8 text-center">
      <div className="space-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 mb-6"
        >
          <Zap className="w-8 h-8 fill-current" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold"
        >
          Master your Exams with AI
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground max-w-lg mx-auto"
        >
          Stop wasting time on general study. Our AI identifies your weak spots
          and crafts the perfect strategy for your A/L exams.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {[
          {
            icon: Target,
            title: "Precision Focus",
            desc: "Targeted practice for high-yield topics.",
            color: "text-red-500",
          },
          {
            icon: BookOpen,
            title: "Smart Notes",
            desc: "AI-generated summaries of complex chapters.",
            color: "text-blue-500",
          },
          {
            icon: LineChart,
            title: "Predictive Analytics",
            desc: "See your projected score and how to improve it.",
            color: "text-emerald-500",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="p-6 bg-card border rounded-2xl space-y-3 hover:border-primary/50 transition-colors"
          >
            <item.icon className={`w-8 h-8 ${item.color} mx-auto`} />
            <h4 className="font-semibold">{item.title}</h4>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-center space-x-4 pt-4"
      >
        <Button variant="ghost" onClick={onBack} size="lg">
          Back
        </Button>
        <Button
          onClick={onNext}
          size="lg"
          className="px-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white border-none shadow-lg shadow-orange-500/20"
        >
          Tell me more
        </Button>
      </motion.div>
    </div>
  );
}
