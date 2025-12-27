"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  MoveHorizontal,
  Wind,
  Activity,
  Play,
  Pause,
  RotateCcw,
  Settings2,
  Ruler,
  Maximize2,
  FlaskConical,
  Scale,
  Waves,
  Search,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  VernierCalipers,
  MicrometerScrewGauge,
  Spherometer,
  TravellingMicroscope,
  ParallelogramOfForces,
  PrincipleOfMoments,
  FluidDensityLab,
  SimplePendulumLab,
} from "./index";

interface PhysicsExperiment {
  id: string;
  title: string;
  category: "measurement" | "mechanics" | "fluids" | "waves" | "electricity";
  difficulty: "Easy" | "Medium" | "Hard";
  component: React.ReactNode;
  description: string;
}

export function PhysicsLab() {
  const [selectedExpId, setSelectedExpId] = useState<string | null>(null);

  const physicsExperiments: PhysicsExperiment[] = [
    {
      id: "vernier",
      title: "Vernier Calipers",
      category: "measurement",
      difficulty: "Easy",
      component: <VernierCalipers />,
      description:
        "Measure small external and internal lengths with 0.1mm precision.",
    },
    {
      id: "micrometer",
      title: "Micrometer Screw Gauge",
      category: "measurement",
      difficulty: "Medium",
      component: <MicrometerScrewGauge />,
      description:
        "High precision measurement of diameter and thickness with 0.01mm precision.",
    },
    {
      id: "spherometer",
      title: "Spherometer",
      category: "measurement",
      difficulty: "Hard",
      component: <Spherometer />,
      description:
        "Measure the curvature of spherical surfaces and thickness of plates.",
    },
    {
      id: "microscope",
      title: "Travelling Microscope",
      category: "measurement",
      difficulty: "Hard",
      component: <TravellingMicroscope />,
      description:
        "Measure vertical and horizontal distances of small objects with high magnification.",
    },
    {
      id: "forces",
      title: "Law of Parallelogram",
      category: "mechanics",
      difficulty: "Medium",
      component: <ParallelogramOfForces />,
      description:
        "Verify the addition of vector forces and find the resultant magnitude.",
    },
    {
      id: "moments",
      title: "Principle of Moments",
      category: "mechanics",
      difficulty: "Medium",
      component: <PrincipleOfMoments />,
      description:
        "Identify the unknown mass of an object using rotational equilibrium.",
    },
    {
      id: "fluids",
      title: "Hydrostatics Lab",
      category: "fluids",
      difficulty: "Medium",
      component: <FluidDensityLab />,
      description:
        "Experiments with U-Tubes, Hare's Apparatus, and Floating Tubes to determine liquid density.",
    },
    {
      id: "pendulum",
      title: "Gravity (Simple Pendulum)",
      category: "mechanics",
      difficulty: "Easy",
      component: <SimplePendulumLab />,
      description:
        "Determine acceleration due to gravity (g) using small-angle oscillations.",
    },
  ];

  const selectedExp = useMemo(
    () => physicsExperiments.find((exp) => exp.id === selectedExpId),
    [selectedExpId]
  );

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "measurement":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "mechanics":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "fluids":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="w-full space-y-6">
      <AnimatePresence mode="wait">
        {!selectedExpId ? (
          <motion.div
            key="library"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {physicsExperiments.map((exp) => (
              <motion.div
                key={exp.id}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedExpId(exp.id)}
                className="group cursor-pointer bg-slate-900 border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all shadow-xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <Badge
                    variant="outline"
                    className={getCategoryColor(exp.category)}
                  >
                    {exp.category}
                  </Badge>
                  <span className="text-[10px] uppercase font-bold text-white/40">
                    {exp.difficulty}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {exp.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed mb-6 h-10 overflow-hidden line-clamp-2">
                  {exp.description}
                </p>
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  Launch Simulation{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="simulation"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setSelectedExpId(null)}
                className="group"
              >
                <RotateCcw className="mr-2 h-4 w-4 group-hover:-rotate-45 transition-transform" />
                Back to Lab Library
              </Button>
              <div className="flex items-center gap-4">
                <Badge
                  className={getCategoryColor(selectedExp?.category || "")}
                >
                  {selectedExp?.category}
                </Badge>
                <h2 className="text-xl font-black text-white">
                  {selectedExp?.title}
                </h2>
              </div>
            </div>

            {selectedExp?.component}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
