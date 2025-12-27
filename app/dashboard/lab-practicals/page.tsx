"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Atom, FlaskConical, Beaker, Sparkles, Zap } from "lucide-react";
import { InteractivePeriodicTable } from "@/components/lab/interactive-periodic-table";
import { VirtualChemistryLab } from "@/components/lab/virtual-chemistry-lab";
import { AnimatedExperiments } from "@/components/lab/animated-experiments";
import { PhysicsLab } from "@/components/lab/physics-lab";

export default function LabPracticalsPage() {
  const [activeTab, setActiveTab] = useState("experiments");

  return (
    <div className="min-h-screen p-4 sm:p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Atom className="w-10 h-10 text-cyan-400" />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-bold text-green-500">
            Virtual Science Lab
          </h1>
          <motion.div
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <FlaskConical className="w-10 h-10 text-emerald-400" />
          </motion.div>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore atoms, mix chemicals, and master physics through interactive
          simulations! 🧪⚡✨
        </p>
      </motion.div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 max-w-2xl mx-auto h-auto gap-2 bg-transparent p-0">
          <TabsTrigger
            value="experiments"
            className="gap-2 text-xs sm:text-sm py-3 rounded-xl data-[state=active]:bg-primary/20 data-[state=active]:text-primary border border-white/5"
          >
            <FlaskConical className="w-4 h-4" />
            <span>Chemistry Exp</span>
          </TabsTrigger>
          <TabsTrigger
            value="physics"
            className="gap-2 text-xs sm:text-sm py-3 rounded-xl data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400 border border-white/5"
          >
            <Zap className="w-4 h-4" />
            <span>Physics Lab</span>
          </TabsTrigger>
          <TabsTrigger
            value="virtual-lab"
            className="gap-2 text-xs sm:text-sm py-3 rounded-xl data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 border border-white/5"
          >
            <Beaker className="w-4 h-4" />
            <span>Mix & React</span>
          </TabsTrigger>
          <TabsTrigger
            value="periodic-table"
            className="gap-2 text-xs sm:text-sm py-3 rounded-xl data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 border border-white/5"
          >
            <Atom className="w-4 h-4" />
            <span>Period Table</span>
          </TabsTrigger>
        </TabsList>

        {/* Physics Lab Tab */}
        <TabsContent value="physics" className="mt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 text-orange-400" />
                Physics Simulations
              </h2>
              <p className="text-muted-foreground text-sm">
                Interactive physics experiments with real-time variables
              </p>
            </div>
            <PhysicsLab />
          </motion.div>
        </TabsContent>

        {/* Experiments Tab */}
        <TabsContent value="experiments" className="mt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Interactive Experiments
              </h2>
              <p className="text-muted-foreground text-sm">
                Watch step-by-step animations of real chemistry experiments
              </p>
            </div>
            <AnimatedExperiments />
          </motion.div>
        </TabsContent>

        {/* Virtual Lab Tab */}
        <TabsContent value="virtual-lab" className="mt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold flex items-center justify-center gap-2">
                <Beaker className="w-5 h-5 text-blue-400" />
                Drag & Drop Chemistry Lab
              </h2>
              <p className="text-muted-foreground text-sm">
                Mix chemicals and see real reactions with animations!
              </p>
            </div>
            <VirtualChemistryLab />
          </motion.div>
        </TabsContent>

        {/* Periodic Table Tab */}
        <TabsContent value="periodic-table" className="mt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold flex items-center justify-center gap-2">
                <Atom className="w-5 h-5 text-cyan-400" />
                Interactive Periodic Table
              </h2>
              <p className="text-muted-foreground text-sm">
                Click any element to see its atomic structure with orbiting
                electrons!
              </p>
            </div>
            <InteractivePeriodicTable />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
