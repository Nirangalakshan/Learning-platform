"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Beaker, Droplets, Flame, Sparkles, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Chemical {
  id: string;
  name: string;
  formula: string;
  color: string;
  type: "acid" | "base" | "salt" | "metal" | "indicator" | "organic";
}

interface Reaction {
  reactants: string[];
  products: string;
  description: string;
  animation:
    | "fizz"
    | "color-change"
    | "precipitate"
    | "explosion"
    | "flame"
    | "gas";
  resultColor: string;
}

const chemicals: Chemical[] = [
  {
    id: "hcl",
    name: "Hydrochloric Acid",
    formula: "HCl",
    color: "#FFEB3B",
    type: "acid",
  },
  {
    id: "naoh",
    name: "Sodium Hydroxide",
    formula: "NaOH",
    color: "#E3F2FD",
    type: "base",
  },
  {
    id: "h2so4",
    name: "Sulfuric Acid",
    formula: "H₂SO₄",
    color: "#FFF9C4",
    type: "acid",
  },
  {
    id: "na",
    name: "Sodium Metal",
    formula: "Na",
    color: "#B0BEC5",
    type: "metal",
  },
  {
    id: "cuso4",
    name: "Copper Sulfate",
    formula: "CuSO₄",
    color: "#2196F3",
    type: "salt",
  },
  {
    id: "phenol",
    name: "Phenolphthalein",
    formula: "C₂₀H₁₄O₄",
    color: "#FCE4EC",
    type: "indicator",
  },
  {
    id: "nacl",
    name: "Sodium Chloride",
    formula: "NaCl",
    color: "#FAFAFA",
    type: "salt",
  },
  {
    id: "ca",
    name: "Calcium Metal",
    formula: "Ca",
    color: "#CFD8DC",
    type: "metal",
  },
  {
    id: "agno3",
    name: "Silver Nitrate",
    formula: "AgNO₃",
    color: "#E0E0E0",
    type: "salt",
  },
  {
    id: "koh",
    name: "Potassium Hydroxide",
    formula: "KOH",
    color: "#E8F5E9",
    type: "base",
  },
  {
    id: "ch3cooh",
    name: "Acetic Acid",
    formula: "CH₃COOH",
    color: "#FFFDE7",
    type: "organic",
  },
  {
    id: "nahco3",
    name: "Baking Soda",
    formula: "NaHCO₃",
    color: "#FAFAFA",
    type: "salt",
  },
];

const reactions: Reaction[] = [
  {
    reactants: ["hcl", "naoh"],
    products: "NaCl + H₂O (Salt + Water)",
    description:
      "Neutralization reaction! Acid + Base → Salt + Water. This is an exothermic reaction.",
    animation: "color-change",
    resultColor: "#E0F7FA",
  },
  {
    reactants: ["na", "hcl"],
    products: "NaCl + H₂ (Salt + Hydrogen Gas)",
    description:
      "Sodium reacts vigorously with acid, producing hydrogen gas bubbles!",
    animation: "fizz",
    resultColor: "#ECEFF1",
  },
  {
    reactants: ["cuso4", "naoh"],
    products: "Cu(OH)₂ + Na₂SO₄ (Blue precipitate)",
    description:
      "Double displacement reaction forming blue copper hydroxide precipitate!",
    animation: "precipitate",
    resultColor: "#1E88E5",
  },
  {
    reactants: ["phenol", "naoh"],
    products: "Pink Color (Basic indicator)",
    description:
      "Phenolphthalein turns pink in basic solution - it's an indicator!",
    animation: "color-change",
    resultColor: "#E91E63",
  },
  {
    reactants: ["agno3", "nacl"],
    products: "AgCl + NaNO₃ (White precipitate)",
    description:
      "Silver chloride precipitate forms - a classic precipitation reaction!",
    animation: "precipitate",
    resultColor: "#ECEFF1",
  },
  {
    reactants: ["ch3cooh", "nahco3"],
    products: "CH₃COONa + H₂O + CO₂ (Fizzing)",
    description:
      "Vinegar + Baking soda = Carbon dioxide bubbles! Classic volcano reaction!",
    animation: "fizz",
    resultColor: "#FFF8E1",
  },
  {
    reactants: ["h2so4", "na"],
    products: "Na₂SO₄ + H₂ (Vigorous reaction)",
    description:
      "⚠️ Extremely vigorous reaction! Hydrogen gas produced rapidly!",
    animation: "explosion",
    resultColor: "#FFEB3B",
  },
  {
    reactants: ["ca", "hcl"],
    products: "CaCl₂ + H₂ (Bubbling reaction)",
    description:
      "Calcium reacts with hydrochloric acid producing hydrogen bubbles!",
    animation: "fizz",
    resultColor: "#F5F5F5",
  },
];

export function VirtualChemistryLab() {
  const [beakerContents, setBeakerContents] = useState<Chemical[]>([]);
  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [isReacting, setIsReacting] = useState(false);
  const [draggedChemical, setDraggedChemical] = useState<Chemical | null>(null);
  const beakerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (chemical: Chemical) => {
    setDraggedChemical(chemical);
  };

  const handleDragEnd = () => {
    setDraggedChemical(null);
  };

  const handleDrop = () => {
    if (draggedChemical && beakerContents.length < 2) {
      if (!beakerContents.find((c) => c.id === draggedChemical.id)) {
        const newContents = [...beakerContents, draggedChemical];
        setBeakerContents(newContents);

        if (newContents.length === 2) {
          checkReaction(newContents);
        }
      }
    }
    setDraggedChemical(null);
  };

  const checkReaction = (contents: Chemical[]) => {
    const ids = contents.map((c) => c.id).sort();
    const foundReaction = reactions.find((r) => {
      const reactantIds = [...r.reactants].sort();
      return ids[0] === reactantIds[0] && ids[1] === reactantIds[1];
    });

    if (foundReaction) {
      setIsReacting(true);
      setReaction(foundReaction);
    } else {
      setReaction({
        reactants: ids,
        products: "No Reaction",
        description:
          "These chemicals don't react with each other. Try a different combination!",
        animation: "color-change",
        resultColor: "#9E9E9E",
      });
    }
  };

  const resetLab = () => {
    setBeakerContents([]);
    setReaction(null);
    setIsReacting(false);
  };

  return (
    <div className="w-full space-y-6">
      {/* Chemical Shelf */}
      <div className="bg-gradient-to-r from-amber-900/20 to-amber-800/20 rounded-xl p-4 border border-amber-500/20">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Beaker className="w-5 h-5 text-amber-500" />
          Chemical Shelf - Drag to Beaker
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {chemicals.map((chemical) => (
            <motion.div
              key={chemical.id}
              draggable
              onDragStart={() => handleDragStart(chemical)}
              onDragEnd={handleDragEnd}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-grab active:cursor-grabbing"
            >
              <div
                className="relative p-3 rounded-lg border-2 border-white/20 shadow-lg transition-all hover:border-white/40"
                style={{ backgroundColor: chemical.color + "40" }}
              >
                {/* Test Tube Shape */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-6 h-12 rounded-b-full relative overflow-hidden"
                    style={{
                      background: `linear-gradient(180deg, ${chemical.color}00 0%, ${chemical.color} 100%)`,
                      border: `2px solid ${chemical.color}`,
                      borderTop: "none",
                    }}
                  >
                    <motion.div
                      className="absolute bottom-0 left-0 right-0"
                      style={{ backgroundColor: chemical.color }}
                      initial={{ height: "60%" }}
                      animate={{ height: ["60%", "65%", "60%"] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </div>
                  <div
                    className="w-8 h-2 -mt-0.5 rounded-t-sm"
                    style={{ backgroundColor: chemical.color }}
                  />
                </div>
                <div className="mt-2 text-center">
                  <div className="text-xs font-bold">{chemical.formula}</div>
                  <div className="text-[10px] text-muted-foreground truncate">
                    {chemical.name}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lab Bench */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
        {/* Beaker Area */}
        <div
          ref={beakerRef}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="relative"
        >
          <motion.div
            className={`relative w-48 h-64 rounded-b-3xl border-4 border-t-0 transition-colors ${
              draggedChemical
                ? "border-green-500 shadow-lg shadow-green-500/30"
                : "border-white/30"
            }`}
            style={{
              background:
                isReacting && reaction
                  ? reaction.resultColor + "80"
                  : beakerContents.length > 0
                  ? `linear-gradient(180deg, transparent 30%, ${beakerContents
                      .map((c) => c.color)
                      .join(", ")} 100%)`
                  : "linear-gradient(180deg, transparent 30%, rgba(200,200,255,0.2) 100%)",
            }}
          >
            {/* Beaker Rim */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-52 h-3 border-2 border-b-0 border-white/30 rounded-t-xl" />

            {/* Measurement Lines */}
            {[100, 200, 300, 400].map((ml, i) => (
              <div
                key={ml}
                className="absolute right-2 text-[10px] text-white/50"
                style={{ bottom: `${20 + i * 20}%` }}
              >
                {ml}ml —
              </div>
            ))}

            {/* Reaction Animations */}
            <AnimatePresence>
              {isReacting && reaction && (
                <>
                  {reaction.animation === "fizz" && <FizzAnimation />}
                  {reaction.animation === "precipitate" && (
                    <PrecipitateAnimation color={reaction.resultColor} />
                  )}
                  {reaction.animation === "explosion" && <ExplosionAnimation />}
                  {reaction.animation === "color-change" && (
                    <ColorChangeAnimation color={reaction.resultColor} />
                  )}
                </>
              )}
            </AnimatePresence>

            {/* Contents Labels */}
            <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-1">
              {beakerContents.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-2 py-0.5 rounded bg-black/50 text-[10px] text-white"
                >
                  {c.formula}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bunsen Burner */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
            <div className="w-20 h-4 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded-full" />
            <div className="w-8 h-6 bg-gradient-to-b from-gray-500 to-gray-700 mx-auto rounded-b-lg" />
          </div>

          {/* Drop Hint */}
          {draggedChemical && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-green-500/10 rounded-3xl border-2 border-dashed border-green-500"
            >
              <div className="text-green-400 text-sm font-medium flex items-center gap-2">
                <Droplets className="w-5 h-5" />
                Drop Here!
              </div>
            </motion.div>
          )}
        </div>

        {/* Result Panel */}
        <div className="w-full md:w-80">
          <AnimatePresence mode="wait">
            {reaction ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 border border-white/10"
              >
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  Reaction Result
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-white/60">Products:</div>
                    <div className="text-xl font-semibold text-green-400">
                      {reaction.products}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60">What happened:</div>
                    <div className="text-white/90">{reaction.description}</div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-800/50 rounded-xl p-5 border border-white/10 text-center"
              >
                <Beaker className="w-12 h-12 mx-auto mb-3 text-white/30" />
                <p className="text-white/50">
                  Drag two chemicals into the beaker to see the reaction!
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            onClick={resetLab}
            variant="outline"
            className="w-full mt-4 gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Lab
          </Button>
        </div>
      </div>
    </div>
  );
}

// Animation Components
function FizzAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: "100%",
            x: Math.random() * 100 + "%",
            opacity: 0.8,
          }}
          animate={{
            y: "-20%",
            opacity: 0,
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          className="absolute w-2 h-2 rounded-full bg-white/80"
        />
      ))}
    </div>
  );
}

function PrecipitateAnimation({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: "0%",
            x: Math.random() * 100 + "%",
            opacity: 1,
          }}
          animate={{
            y: "120%",
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
          className="absolute w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

function ExplosionAnimation() {
  return (
    <>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.8, 1] }}
        transition={{ duration: 0.3, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-t from-orange-500 to-yellow-400 rounded-b-3xl"
      />
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 1],
              opacity: [1, 0],
              x: (Math.random() - 0.5) * 100,
              y: (Math.random() - 0.5) * 100,
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: Math.random() * 0.5,
            }}
            className="absolute top-1/2 left-1/2 w-4 h-4"
          >
            <Flame className="text-orange-500" />
          </motion.div>
        ))}
      </div>
    </>
  );
}

function ColorChangeAnimation({ color }: { color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 rounded-b-3xl"
      style={{
        background: `linear-gradient(180deg, transparent 20%, ${color} 100%)`,
      }}
    />
  );
}
