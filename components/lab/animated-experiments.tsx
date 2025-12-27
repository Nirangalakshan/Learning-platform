"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  RotateCcw,
  ChevronRight,
  Check,
  FlaskConical,
  Flame,
  Droplets,
  Beaker,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Experiment {
  id: string;
  title: string;
  category: "organic" | "inorganic" | "physical";
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: string;
  steps: ExperimentStep[];
}

interface ExperimentStep {
  instruction: string;
  animation: "pour" | "heat" | "stir" | "observe" | "collect" | "measure";
  result?: string;
  color?: string;
}

const experiments: Experiment[] = [
  {
    id: "titration",
    title: "Acid-Base Titration",
    category: "inorganic",
    description: "Watch the color change as acid neutralizes base!",
    difficulty: "Medium",
    duration: "5 min",
    steps: [
      {
        instruction: "Fill burette with NaOH solution",
        animation: "pour",
        color: "#E3F2FD",
      },
      {
        instruction: "Add HCl to conical flask",
        animation: "pour",
        color: "#FFEB3B",
      },
      {
        instruction: "Add phenolphthalein indicator",
        animation: "pour",
        color: "#FCE4EC",
      },
      {
        instruction: "Slowly add NaOH from burette",
        animation: "pour",
        color: "#E91E63",
      },
      {
        instruction: "Observe the endpoint!",
        animation: "observe",
        result: "Solution turns pink at endpoint!",
        color: "#E91E63",
      },
    ],
  },
  {
    id: "crystallization",
    title: "Crystallization of CuSO₄",
    category: "inorganic",
    description: "Grow beautiful blue copper sulfate crystals!",
    difficulty: "Easy",
    duration: "8 min",
    steps: [
      {
        instruction: "Dissolve CuSO₄ in hot water",
        animation: "stir",
        color: "#2196F3",
      },
      { instruction: "Heat the solution", animation: "heat", color: "#2196F3" },
      {
        instruction: "Filter the saturated solution",
        animation: "pour",
        color: "#1E88E5",
      },
      {
        instruction: "Let the solution cool slowly",
        animation: "observe",
        color: "#1565C0",
      },
      {
        instruction: "Watch crystals form!",
        animation: "observe",
        result: "Beautiful blue crystals appear!",
        color: "#0D47A1",
      },
    ],
  },
  {
    id: "esterification",
    title: "Making Esters (Fruity Smell)",
    category: "organic",
    description: "Create sweet-smelling esters through organic synthesis!",
    difficulty: "Hard",
    duration: "10 min",
    steps: [
      {
        instruction: "Add ethanol to flask",
        animation: "pour",
        color: "#ECEFF1",
      },
      {
        instruction: "Carefully add acetic acid",
        animation: "pour",
        color: "#FFF9C4",
      },
      {
        instruction: "Add concentrated H₂SO₄ catalyst",
        animation: "pour",
        color: "#FFEB3B",
      },
      {
        instruction: "Heat gently with water bath",
        animation: "heat",
        color: "#FFE0B2",
      },
      {
        instruction: "Smell the fruity ester!",
        animation: "observe",
        result: "Ethyl acetate formed - smells like pear drops!",
        color: "#FFCC80",
      },
    ],
  },
  {
    id: "flame-test",
    title: "Flame Test Analysis",
    category: "inorganic",
    description: "Identify metals by their flame colors!",
    difficulty: "Easy",
    duration: "4 min",
    steps: [
      { instruction: "Dip wire in HCl", animation: "pour", color: "#FFEB3B" },
      { instruction: "Pick up salt sample", animation: "collect" },
      {
        instruction: "Hold in bunsen flame",
        animation: "heat",
        color: "#FFC107",
      },
      {
        instruction: "Observe the color!",
        animation: "observe",
        result: "Each metal gives a unique color!",
        color: "#FF9800",
      },
    ],
  },
  {
    id: "saponification",
    title: "Making Soap",
    category: "organic",
    description: "Learn how soap is made from oils!",
    difficulty: "Medium",
    duration: "12 min",
    steps: [
      {
        instruction: "Add vegetable oil to beaker",
        animation: "pour",
        color: "#FFF59D",
      },
      {
        instruction: "Add NaOH solution carefully",
        animation: "pour",
        color: "#E3F2FD",
      },
      {
        instruction: "Heat and stir continuously",
        animation: "heat",
        color: "#FFECB3",
      },
      { instruction: "Add salt solution", animation: "pour", color: "#FAFAFA" },
      {
        instruction: "Collect the soap!",
        animation: "collect",
        result: "Soap precipitates out of solution!",
        color: "#F5F5F5",
      },
    ],
  },
  {
    id: "electrolysis",
    title: "Electrolysis of Water",
    category: "physical",
    description: "Split water into hydrogen and oxygen!",
    difficulty: "Medium",
    duration: "8 min",
    steps: [
      {
        instruction: "Fill container with water",
        animation: "pour",
        color: "#E3F2FD",
      },
      { instruction: "Add dilute H₂SO₄", animation: "pour", color: "#FFF9C4" },
      { instruction: "Connect electrodes to power", animation: "observe" },
      {
        instruction: "Observe gas bubbles!",
        animation: "observe",
        result: "H₂ at cathode, O₂ at anode - 2:1 ratio!",
        color: "#B3E5FC",
      },
    ],
  },
];

export function AnimatedExperiments() {
  const [selectedExperiment, setSelectedExperiment] =
    useState<Experiment | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);

  const startExperiment = (exp: Experiment) => {
    setSelectedExperiment(exp);
    setCurrentStep(0);
    setIsPlaying(false);
    setCompleted(false);
  };

  const playStep = () => {
    if (!selectedExperiment) return;

    setIsPlaying(true);

    if (currentStep < selectedExperiment.steps.length - 1) {
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setIsPlaying(false);
      }, 2000);
    } else {
      setTimeout(() => {
        setCompleted(true);
        setIsPlaying(false);
      }, 2000);
    }
  };

  const resetExperiment = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setCompleted(false);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "organic":
        return "from-green-500 to-emerald-600";
      case "inorganic":
        return "from-blue-500 to-indigo-600";
      case "physical":
        return "from-purple-500 to-violet-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getCategoryBadgeColor = (cat: string) => {
    switch (cat) {
      case "organic":
        return "bg-green-500/20 text-green-400";
      case "inorganic":
        return "bg-blue-500/20 text-blue-400";
      case "physical":
        return "bg-purple-500/20 text-purple-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!selectedExperiment ? (
          // Experiment Selection
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {experiments.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => startExperiment(exp)}
                className={`cursor-pointer rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br ${getCategoryColor(
                  exp.category
                )} shadow-lg hover:shadow-xl transition-all`}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getCategoryBadgeColor(exp.category)}>
                      {exp.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-white/80 border-white/30"
                    >
                      {exp.difficulty}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    {exp.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">
                      ⏱️ {exp.duration}
                    </span>
                    <div className="flex items-center gap-1 text-white/80 text-sm">
                      Watch <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Experiment Viewer
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setSelectedExperiment(null)}
              >
                ← Back to Experiments
              </Button>
              <Badge
                className={getCategoryBadgeColor(selectedExperiment.category)}
              >
                {selectedExperiment.category}
              </Badge>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">{selectedExperiment.title}</h2>
              <p className="text-muted-foreground">
                {selectedExperiment.description}
              </p>
            </div>

            {/* Experiment Animation Area */}
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
              {/* Lab Visualization */}
              <div className="relative w-full max-w-md aspect-square bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-white/10">
                <ExperimentAnimation
                  step={selectedExperiment.steps[currentStep]}
                  isPlaying={isPlaying}
                  completed={completed}
                />

                {/* Progress */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex gap-1">
                    {selectedExperiment.steps.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          idx < currentStep
                            ? "bg-green-500"
                            : idx === currentStep
                            ? "bg-primary"
                            : "bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Step Info */}
              <div className="w-full max-w-sm space-y-4">
                <div className="bg-slate-800/50 rounded-xl p-5 border border-white/10">
                  <div className="text-sm text-muted-foreground mb-1">
                    Step {currentStep + 1} of {selectedExperiment.steps.length}
                  </div>
                  <p className="text-lg font-medium text-white">
                    {selectedExperiment.steps[currentStep].instruction}
                  </p>

                  {completed &&
                    selectedExperiment.steps[currentStep].result && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-3 bg-green-500/20 rounded-lg border border-green-500/30"
                      >
                        <div className="flex items-center gap-2 text-green-400">
                          <Check className="w-5 h-5" />
                          <span className="font-medium">Result:</span>
                        </div>
                        <p className="text-green-300 mt-1">
                          {selectedExperiment.steps[currentStep].result}
                        </p>
                      </motion.div>
                    )}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={playStep}
                    disabled={isPlaying || completed}
                    className="flex-1 gap-2"
                  >
                    {completed ? (
                      <>
                        <Check className="w-4 h-4" />
                        Completed!
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        {currentStep === selectedExperiment.steps.length - 1
                          ? "Finish"
                          : "Next Step"}
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={resetExperiment}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ExperimentAnimation({
  step,
  isPlaying,
  completed,
}: {
  step: ExperimentStep;
  isPlaying: boolean;
  completed: boolean;
}) {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      {/* Lab Equipment */}
      <div className="relative">
        {/* Beaker */}
        <motion.div
          className="relative w-40 h-52 rounded-b-3xl border-4 border-t-0 border-white/30"
          style={{
            background: step.color
              ? `linear-gradient(180deg, transparent 30%, ${step.color} 100%)`
              : "linear-gradient(180deg, transparent 30%, rgba(200,200,255,0.2) 100%)",
          }}
        >
          {/* Beaker Rim */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-44 h-2 border-2 border-b-0 border-white/30 rounded-t-xl" />

          {/* Pour Animation */}
          {isPlaying && step.animation === "pour" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100%", opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute bottom-0 left-0 right-0 rounded-b-3xl"
              style={{ backgroundColor: step.color }}
            />
          )}

          {/* Heat Animation */}
          {isPlaying && step.animation === "heat" && (
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 1, 0], y: -30 }}
                  transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                  className="absolute"
                  style={{ left: `${(i - 2) * 15}px` }}
                >
                  <Flame className="w-6 h-6 text-orange-500" />
                </motion.div>
              ))}
            </div>
          )}

          {/* Stir Animation */}
          {isPlaying && step.animation === "stir" && (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="w-1 h-24 bg-gray-400 rounded-full" />
            </motion.div>
          )}

          {/* Bubbles */}
          {(isPlaying || completed) && (
            <div className="absolute inset-0 overflow-hidden rounded-b-3xl">
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: "100%", x: `${10 + i * 8}%`, opacity: 0.6 }}
                  animate={{ y: "-20%", opacity: 0 }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                  className="absolute w-2 h-2 rounded-full bg-white/60"
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Stand */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-48 h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full" />
      </div>

      {/* Completed Overlay */}
      {completed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/40"
        >
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-10 h-10 text-white" />
          </div>
        </motion.div>
      )}
    </div>
  );
}
