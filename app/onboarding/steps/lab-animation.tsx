"use client";

import { motion } from "framer-motion";
import { FlaskConical, Beaker, Thermometer, Microscope } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LabAnimationStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function LabAnimationStep({
  onNext,
  onBack,
}: LabAnimationStepProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-12 max-w-4xl mx-auto py-8">
      <div className="text-center space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold"
        >
          Interactive Virtul Labs
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground"
        >
          Experience science like never before. Perform experiments and
          visualize abstract concepts in 3D.
        </motion.p>
      </div>

      <div className="relative w-full aspect-video max-w-2xl bg-linear-to-br from-primary/5 to-primary/20 rounded-3xl overflow-hidden flex items-center justify-center">
        {/* Abstract animated elements representing a lab */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 -translate-y-1/2"
        >
          <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
            <FlaskConical className="w-16 h-16 text-primary" />
          </div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-1/3 right-1/4 -translate-y-1/2"
        >
          <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
            <Beaker className="w-12 h-12 text-blue-400" />
          </div>
        </motion.div>

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-48 h-48 bg-primary/20 rounded-full blur-3xl absolute"
        />

        <div className="z-10 text-center">
          <div className="flex items-center space-x-4 mb-4">
            <Thermometer className="w-8 h-8 text-orange-400 animate-bounce" />
            <Microscope className="w-10 h-10 text-emerald-400" />
          </div>
          <div className="text-primary font-mono text-sm font-bold tracking-widest uppercase">
            Simulation Engine Ready
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center space-x-4"
      >
        <Button variant="ghost" onClick={onBack} size="lg">
          Back
        </Button>
        <Button onClick={onNext} size="lg" className="px-8 rounded-full">
          Cool, What's next?
        </Button>
      </motion.div>
    </div>
  );
}
