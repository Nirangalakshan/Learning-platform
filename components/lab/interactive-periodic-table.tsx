"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Element {
  symbol: string;
  name: string;
  number: number;
  mass: number;
  category: string;
  electrons: number[];
  color: string;
  description: string;
}

const elements: Element[] = [
  {
    symbol: "H",
    name: "Hydrogen",
    number: 1,
    mass: 1.008,
    category: "nonmetal",
    electrons: [1],
    color: "#FFD93D",
    description: "The lightest and most abundant element in the universe.",
  },
  {
    symbol: "He",
    name: "Helium",
    number: 2,
    mass: 4.003,
    category: "noble-gas",
    electrons: [2],
    color: "#C9B1FF",
    description: "Noble gas used in balloons and as a coolant.",
  },
  {
    symbol: "Li",
    name: "Lithium",
    number: 3,
    mass: 6.941,
    category: "alkali",
    electrons: [2, 1],
    color: "#FF6B6B",
    description: "Soft alkali metal used in batteries.",
  },
  {
    symbol: "Be",
    name: "Beryllium",
    number: 4,
    mass: 9.012,
    category: "alkaline",
    electrons: [2, 2],
    color: "#FFA94D",
    description: "Lightweight metal used in aerospace.",
  },
  {
    symbol: "B",
    name: "Boron",
    number: 5,
    mass: 10.81,
    category: "metalloid",
    electrons: [2, 3],
    color: "#69DB7C",
    description: "Metalloid used in glass and ceramics.",
  },
  {
    symbol: "C",
    name: "Carbon",
    number: 6,
    mass: 12.01,
    category: "nonmetal",
    electrons: [2, 4],
    color: "#FFD93D",
    description: "The basis of all organic life.",
  },
  {
    symbol: "N",
    name: "Nitrogen",
    number: 7,
    mass: 14.01,
    category: "nonmetal",
    electrons: [2, 5],
    color: "#FFD93D",
    description: "Makes up 78% of Earth's atmosphere.",
  },
  {
    symbol: "O",
    name: "Oxygen",
    number: 8,
    mass: 16.0,
    category: "nonmetal",
    electrons: [2, 6],
    color: "#FFD93D",
    description: "Essential for respiration and combustion.",
  },
  {
    symbol: "F",
    name: "Fluorine",
    number: 9,
    mass: 19.0,
    category: "halogen",
    electrons: [2, 7],
    color: "#A9E34B",
    description: "Most reactive element, used in toothpaste.",
  },
  {
    symbol: "Ne",
    name: "Neon",
    number: 10,
    mass: 20.18,
    category: "noble-gas",
    electrons: [2, 8],
    color: "#C9B1FF",
    description: "Noble gas used in neon signs.",
  },
  {
    symbol: "Na",
    name: "Sodium",
    number: 11,
    mass: 22.99,
    category: "alkali",
    electrons: [2, 8, 1],
    color: "#FF6B6B",
    description: "Highly reactive metal, component of table salt.",
  },
  {
    symbol: "Mg",
    name: "Magnesium",
    number: 12,
    mass: 24.31,
    category: "alkaline",
    electrons: [2, 8, 2],
    color: "#FFA94D",
    description: "Essential mineral for biological processes.",
  },
  {
    symbol: "Al",
    name: "Aluminum",
    number: 13,
    mass: 26.98,
    category: "metal",
    electrons: [2, 8, 3],
    color: "#74C0FC",
    description: "Lightweight metal used in cans and foils.",
  },
  {
    symbol: "Si",
    name: "Silicon",
    number: 14,
    mass: 28.09,
    category: "metalloid",
    electrons: [2, 8, 4],
    color: "#69DB7C",
    description: "Basis of computer chips and semiconductors.",
  },
  {
    symbol: "P",
    name: "Phosphorus",
    number: 15,
    mass: 30.97,
    category: "nonmetal",
    electrons: [2, 8, 5],
    color: "#FFD93D",
    description: "Essential for DNA and bones.",
  },
  {
    symbol: "S",
    name: "Sulfur",
    number: 16,
    mass: 32.07,
    category: "nonmetal",
    electrons: [2, 8, 6],
    color: "#FFD93D",
    description: "Yellow element used in fertilizers.",
  },
  {
    symbol: "Cl",
    name: "Chlorine",
    number: 17,
    mass: 35.45,
    category: "halogen",
    electrons: [2, 8, 7],
    color: "#A9E34B",
    description: "Used in water purification and bleach.",
  },
  {
    symbol: "Ar",
    name: "Argon",
    number: 18,
    mass: 39.95,
    category: "noble-gas",
    electrons: [2, 8, 8],
    color: "#C9B1FF",
    description: "Inert gas used in light bulbs.",
  },
  {
    symbol: "K",
    name: "Potassium",
    number: 19,
    mass: 39.1,
    category: "alkali",
    electrons: [2, 8, 8, 1],
    color: "#FF6B6B",
    description: "Essential for nerve function.",
  },
  {
    symbol: "Ca",
    name: "Calcium",
    number: 20,
    mass: 40.08,
    category: "alkaline",
    electrons: [2, 8, 8, 2],
    color: "#FFA94D",
    description: "Essential for bones and teeth.",
  },
];

const categoryColors: Record<string, string> = {
  alkali: "from-red-500 to-red-600",
  alkaline: "from-orange-500 to-orange-600",
  metal: "from-blue-500 to-blue-600",
  metalloid: "from-green-500 to-green-600",
  nonmetal: "from-yellow-500 to-yellow-600",
  halogen: "from-lime-500 to-lime-600",
  "noble-gas": "from-purple-500 to-purple-600",
};

export function InteractivePeriodicTable() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  return (
    <div className="w-full">
      {/* Periodic Table Grid */}
      <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5 sm:gap-2">
        {elements.map((element, index) => (
          <motion.button
            key={element.symbol}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ scale: 1.1, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedElement(element)}
            className={`relative p-2 sm:p-3 rounded-lg bg-gradient-to-br ${
              categoryColors[element.category]
            } 
                       shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
          >
            <div className="text-[10px] sm:text-xs text-white/80">
              {element.number}
            </div>
            <div className="text-lg sm:text-2xl font-bold text-white">
              {element.symbol}
            </div>
            <div className="text-[8px] sm:text-[10px] text-white/70 truncate">
              {element.name}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        {Object.entries(categoryColors).map(([category, gradient]) => (
          <div key={category} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded bg-gradient-to-br ${gradient}`} />
            <span className="text-xs text-muted-foreground capitalize">
              {category.replace("-", " ")}
            </span>
          </div>
        ))}
      </div>

      {/* Atom Visualization Modal */}
      <AnimatePresence>
        {selectedElement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setSelectedElement(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-2xl border border-white/10"
            >
              <button
                onClick={() => setSelectedElement(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Atom Visualization */}
                <div className="relative w-64 h-64 flex-shrink-0">
                  <AtomVisualization element={selectedElement} />
                </div>

                {/* Element Info */}
                <div className="flex-1 text-white">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-5xl font-bold">
                      {selectedElement.symbol}
                    </span>
                    <span className="text-2xl text-white/70">
                      {selectedElement.number}
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">
                    {selectedElement.name}
                  </h2>
                  <p className="text-white/70 mb-4">
                    {selectedElement.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-sm text-white/60">Atomic Mass</div>
                      <div className="text-xl font-semibold">
                        {selectedElement.mass}
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-sm text-white/60">Category</div>
                      <div className="text-xl font-semibold capitalize">
                        {selectedElement.category.replace("-", " ")}
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 col-span-2">
                      <div className="text-sm text-white/60">
                        Electron Configuration
                      </div>
                      <div className="text-xl font-semibold">
                        {selectedElement.electrons.map((e, i) => (
                          <span key={i}>
                            {i > 0 && ", "}Shell {i + 1}: {e}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AtomVisualization({ element }: { element: Element }) {
  const shellRadii = [40, 70, 100, 130];

  return (
    <div className="relative w-full h-full">
      {/* Nucleus */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full"
        style={{
          background: `radial-gradient(circle, ${element.color}, ${element.color}88)`,
          boxShadow: `0 0 30px ${element.color}66`,
        }}
      >
        <div className="w-full h-full flex items-center justify-center text-lg font-bold text-white">
          {element.number}
        </div>
      </motion.div>

      {/* Electron Shells */}
      {element.electrons.map((electronCount, shellIndex) => (
        <div key={shellIndex}>
          {/* Shell Ring */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: shellIndex * 0.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
            style={{
              width: shellRadii[shellIndex] * 2,
              height: shellRadii[shellIndex] * 2,
            }}
          />

          {/* Electrons */}
          {Array.from({ length: electronCount }).map((_, electronIndex) => {
            const angle = (electronIndex / electronCount) * 360;
            return (
              <motion.div
                key={electronIndex}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  rotate: [angle, angle + 360],
                }}
                transition={{
                  opacity: { delay: shellIndex * 0.2 + electronIndex * 0.05 },
                  rotate: {
                    duration: 3 + shellIndex,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: shellRadii[shellIndex] * 2,
                  height: shellRadii[shellIndex] * 2,
                  marginLeft: -shellRadii[shellIndex],
                  marginTop: -shellRadii[shellIndex],
                }}
              >
                <motion.div
                  className="absolute w-3 h-3 rounded-full bg-cyan-400 shadow-lg"
                  style={{
                    top: 0,
                    left: "50%",
                    marginLeft: -6,
                    marginTop: -6,
                    boxShadow: "0 0 10px #22d3ee, 0 0 20px #22d3ee44",
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
