"use client";

import { motion } from "framer-motion";
import { Brain, FlaskConical, GraduationCap, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface FeaturesStepProps {
  onNext: () => void;
  onBack: () => void;
}

const features = [
  {
    title: "AI Smart Tutor",
    description:
      "Ask anything and get instant, structured explanations tailored to your level.",
    icon: Brain,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Virtual Science Lab",
    description:
      "Experiment with physics and chemistry in a safe, interactive 3D environment.",
    icon: FlaskConical,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Exam Preparation",
    description:
      "Generate custom quizzes and study plans based on your target exam year.",
    icon: GraduationCap,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your study sessions and see your improvement over time.",
    icon: Clock,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
];

export default function FeaturesStep({ onNext, onBack }: FeaturesStepProps) {
  return (
    <div className="flex flex-col items-center space-y-8 max-w-4xl mx-auto py-8">
      <div className="text-center space-y-4">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold"
        >
          Everything you need to excel
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground max-w-lg"
        >
          Our platform combines cutting-edge AI with pedagogical science to help
          you learn faster and retain more.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <Card className="h-full border-none shadow-md bg-card/50 backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300">
              <CardContent className="p-6 flex items-start space-x-4">
                <div
                  className={`p-3 rounded-2xl ${feature.bg} ${feature.color}`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex items-center space-x-4 pt-4"
      >
        <Button variant="ghost" onClick={onBack} size="lg">
          Back
        </Button>
        <Button onClick={onNext} size="lg" className="px-8 rounded-full">
          Continue
        </Button>
      </motion.div>
    </div>
  );
}
