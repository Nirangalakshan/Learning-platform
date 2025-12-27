"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Weight,
  ArrowDown,
  ArrowUp,
  RotateCcw,
  Scale,
  Waves,
  FlaskConical,
  Activity,
  Maximize2,
  Play,
  Pause,
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

export function ParallelogramOfForces() {
  const [f1, setF1] = useState(10); // Force 1 in N
  const [f2, setF2] = useState(15); // Force 2 in N
  const [angle, setAngle] = useState(60); // Angle in degrees

  const rad = (angle * Math.PI) / 180;
  const resultant = Math.sqrt(f1 ** 2 + f2 ** 2 + 2 * f1 * f2 * Math.cos(rad));
  const beta =
    Math.atan2(f2 * Math.sin(rad), f1 + f2 * Math.cos(rad)) * (180 / Math.PI);

  const scale = 8; // pixels per Newton

  return (
    <div className="space-y-6">
      <div className="relative bg-slate-900 border border-white/10 rounded-2xl h-[450px] overflow-hidden flex items-center justify-center">
        {/* Drawing Board Background */}
        <div className="absolute inset-4 bg-white/5 rounded-lg border border-white/5" />

        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="0"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
            </marker>
          </defs>

          <g transform="translate(400, 225)">
            {/* Force 1 Vector */}
            <motion.line
              x1="0"
              y1="0"
              x2={f1 * scale}
              y2="0"
              stroke="#3b82f6"
              strokeWidth="3"
              markerEnd="url(#arrowhead)"
              className="text-blue-500"
            />
            <text
              x={f1 * scale + 10}
              y="5"
              fill="#3b82f6"
              className="text-xs font-bold"
            >
              F1 = {f1}N
            </text>

            {/* Force 2 Vector */}
            <motion.line
              x1="0"
              y1="0"
              x2={f2 * scale * Math.cos(-rad)}
              y2={f2 * scale * Math.sin(-rad)}
              stroke="#ef4444"
              strokeWidth="3"
              markerEnd="url(#arrowhead)"
              className="text-red-500"
            />
            <text
              x={f2 * scale * Math.cos(-rad) + 5}
              y={f2 * scale * Math.sin(-rad) - 10}
              fill="#ef4444"
              className="text-xs font-bold"
            >
              F2 = {f2}N
            </text>

            {/* Parallelogram Guidelines */}
            <line
              x1={f1 * scale}
              y1="0"
              x2={f1 * scale + f2 * scale * Math.cos(-rad)}
              y2={f2 * scale * Math.sin(-rad)}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              strokeDasharray="4"
            />
            <line
              x1={f2 * scale * Math.cos(-rad)}
              y1={f2 * scale * Math.sin(-rad)}
              x2={f1 * scale + f2 * scale * Math.cos(-rad)}
              y2={f2 * scale * Math.sin(-rad)}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              strokeDasharray="4"
            />

            {/* Resultant Vector */}
            <motion.line
              x1="0"
              y1="0"
              x2={f1 * scale + f2 * scale * Math.cos(-rad)}
              y2={f2 * scale * Math.sin(-rad)}
              stroke="#10b981"
              strokeWidth="4"
              markerEnd="url(#arrowhead)"
              className="text-green-500"
            />
            <text
              x={f1 * scale + f2 * scale * Math.cos(-rad) + 10}
              y={f2 * scale * Math.sin(-rad) + 20}
              fill="#10b981"
              className="text-sm font-black"
            >
              R = {resultant.toFixed(2)}N
            </text>
          </g>
        </svg>

        <div className="absolute top-8 left-8">
          <Badge variant="outline" className="text-white/40 mb-2">
            Law of Parallelogram
          </Badge>
          <h3 className="text-2xl font-black text-white">FORCE VECTOR LAB</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900/40 border-white/10">
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-3">
              <label className="text-xs text-blue-400 font-bold uppercase">
                Force 1 (Horizontal)
              </label>
              <Slider
                value={[f1]}
                onValueChange={(v) => setF1(v[0])}
                min={5}
                max={30}
                step={1}
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs text-red-400 font-bold uppercase">
                Force 2
              </label>
              <Slider
                value={[f2]}
                onValueChange={(v) => setF2(v[0])}
                min={5}
                max={30}
                step={1}
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs text-green-400 font-bold uppercase">
                Angle (θ)
              </label>
              <Slider
                value={[angle]}
                onValueChange={(v) => setAngle(v[0])}
                min={0}
                max={180}
                step={1}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-slate-900/40 border-green-500/20">
          <CardHeader>
            <CardTitle className="text-green-400 text-sm">
              Calculated Resultant
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <p className="text-sm text-white/40">Magnitude (R)</p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-black text-white">
                  {resultant.toFixed(2)}
                </p>
                <span className="text-white/40 font-bold">Newtons</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-white/40">Direction (β)</p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-black text-white">
                  {beta.toFixed(1)}°
                </p>
                <span className="text-white/40 font-bold">from F1</span>
              </div>
            </div>
            <div className="col-span-2 p-3 bg-white/5 rounded-lg text-xs font-mono text-green-400">
              Formula: R² = F₁² + F₂² + 2F₁F₂ cos(θ)
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function PrincipleOfMoments() {
  const [m1, setM1] = useState(100); // Mass 1 in g
  const [d1, setD1] = useState(40); // Distance 1 in cm
  const [m2, setM2] = useState(200); // Mass 2 in g
  const [d2, setD2] = useState(20); // Distance 2 in cm

  const leftMoment = m1 * d1;
  const rightMoment = m2 * d2;
  const tilt = (rightMoment - leftMoment) / 500; // tilt factor

  return (
    <div className="space-y-6">
      <div className="relative bg-slate-900 border border-white/10 rounded-2xl h-[400px] overflow-hidden flex items-center justify-center">
        {/* Support Pivot */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-8 h-32 bg-slate-700 rounded-t-lg z-0" />
        <div className="absolute bottom-52 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-400 rounded-full z-20 border-2 border-slate-900" />

        {/* Meter Rule */}
        <motion.div
          className="relative w-[600px] h-4 bg-slate-200 rounded-sm z-10 shadow-xl border border-slate-400 flex items-center justify-between px-2"
          animate={{ rotate: Math.max(-15, Math.min(15, tilt * 10)) }}
          transition={{ type: "spring", stiffness: 50, damping: 10 }}
        >
          {/* Scale marks */}
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-[1px] h-2 bg-slate-800" />
              <span className="text-[8px] font-bold text-slate-800">
                {i * 10}
              </span>
            </div>
          ))}

          {/* Mass 1 (Left) */}
          <motion.div
            className="absolute flex flex-col items-center"
            style={{ left: ((50 - d1) / 100) * 600 - 15, bottom: 4 }}
          >
            <div className="w-[2px] h-8 bg-slate-600" />
            <div className="w-10 h-8 bg-amber-600 rounded-sm flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
              {m1}g
            </div>
          </motion.div>

          {/* Mass 2 (Right) */}
          <motion.div
            className="absolute flex flex-col items-center"
            style={{ left: ((50 + d2) / 100) * 600 - 15, bottom: 4 }}
          >
            <div className="w-[2px] h-8 bg-slate-600" />
            <div className="w-10 h-8 bg-blue-600 rounded-sm flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
              {m2}g
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute top-8 left-8">
          <Badge className="bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-2">
            Principle of Moments
          </Badge>
          <h3 className="text-2xl font-black text-white">EQUILIBRIUM LAB</h3>
        </div>

        {/* Equilibrium Indicator */}
        <div className="absolute top-8 right-8 flex flex-col items-center">
          <div
            className={`text-sm font-bold p-2 px-4 rounded-full border ${
              Math.abs(leftMoment - rightMoment) < 50
                ? "bg-green-500/20 text-green-400 border-green-500/30"
                : "bg-red-500/20 text-red-400 border-red-500/30"
            }`}
          >
            {Math.abs(leftMoment - rightMoment) < 50
              ? "System Balanced"
              : "Unbalanced"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-900/40 border-white/10">
          <CardHeader className="py-4">
            <CardTitle className="text-sm">
              Left Mass (m₁) & Distance (d₁)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Slider
              value={[m1]}
              onValueChange={(v) => setM1(v[0])}
              min={50}
              max={500}
              step={10}
            />
            <Slider
              value={[d1]}
              onValueChange={(v) => setD1(v[0])}
              min={5}
              max={45}
              step={1}
            />
            <div className="flex justify-between text-amber-400 font-bold">
              <span>Moment = {leftMoment} g-cm</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/40 border-white/10">
          <CardHeader className="py-4">
            <CardTitle className="text-sm">
              Right Mass (m₂) & Distance (d₂)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Slider
              value={[m2]}
              onValueChange={(v) => setM2(v[0])}
              min={50}
              max={500}
              step={10}
            />
            <Slider
              value={[d2]}
              onValueChange={(v) => setD2(v[0])}
              min={5}
              max={45}
              step={1}
            />
            <div className="flex justify-between text-blue-400 font-bold">
              <span>Moment = {rightMoment} g-cm</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function FluidDensityLab() {
  const [activeTool, setActiveTool] = useState<"utube" | "hare" | "tube">(
    "utube"
  );
  const [fluidDensity, setFluidDensity] = useState(0.8); // Density relative to water (1.0)
  const [h1, setH1] = useState(10); // height of water column cm

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {["utube", "hare", "tube"].map((t) => (
          <Button
            key={t}
            variant={activeTool === t ? "default" : "outline"}
            onClick={() => setActiveTool(t as any)}
            className="capitalize"
          >
            {t === "utube"
              ? "U-Tube"
              : t === "hare"
              ? "Hare's Apparatus"
              : "Weighted Tube"}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 relative bg-slate-900 rounded-2xl border border-white/10 h-[500px] flex items-center justify-center p-8">
          <AnimatePresence mode="wait">
            {activeTool === "utube" && (
              <motion.div
                key="utube"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="relative flex flex-col items-center"
              >
                {/* Glass U-Tube */}
                <svg width="200" height="300" viewBox="0 0 200 300">
                  <path
                    d="M 50,50 L 50,250 A 50,50 0 0 0 150,250 L 150,50"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="30"
                    strokeLinecap="round"
                  />

                  {/* Water (Left side + Bottom) */}
                  <motion.path
                    d={`M 50,150 L 50,250 A 50,50 0 0 0 150,250 L 150,200`}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="24"
                    strokeLinecap="round"
                  />

                  {/* Unknown Liquid (Right side) */}
                  <motion.path
                    d={`M 150,${200 - h1 / fluidDensity} L 150,200`}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="24"
                    strokeLinecap="round"
                  />

                  {/* Ruler Line */}
                  <line
                    x1="20"
                    y1="200"
                    x2="180"
                    y2="200"
                    stroke="white"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />
                </svg>

                <div className="mt-8 flex gap-8">
                  <div className="flex flex-col items-center">
                    <Badge variant="outline" className="text-blue-400">
                      Water (h₁)
                    </Badge>
                    <span className="text-2xl font-bold">10 cm</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Badge variant="outline" className="text-amber-400">
                      Liquid (h₂)
                    </Badge>
                    <span className="text-2xl font-bold">
                      {(10 / fluidDensity).toFixed(1)} cm
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTool === "hare" && (
              <motion.div
                key="hare"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-12"
              >
                {/* Beaker Water */}
                <div className="relative">
                  <div className="w-24 h-32 border-2 border-white/20 rounded-b-lg flex items-end">
                    <div className="w-full h-24 bg-blue-500/40 relative">
                      {/* Tube 1 */}
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2 h-64 border-x border-white/30">
                        <motion.div
                          className="absolute bottom-0 w-full bg-blue-500/60"
                          animate={{ height: 200 }}
                        />
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="mt-4 w-full justify-center"
                  >
                    Ref: Water
                  </Badge>
                </div>

                {/* Central Valve */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white/40" />
                  </div>
                </div>

                {/* Beaker Liquid */}
                <div className="relative">
                  <div className="w-24 h-32 border-2 border-white/20 rounded-b-lg flex items-end">
                    <div className="w-full h-24 bg-amber-500/40 relative">
                      {/* Tube 2 */}
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2 h-64 border-x border-white/30">
                        <motion.div
                          className="absolute bottom-0 w-full bg-amber-500/60"
                          animate={{ height: 200 / fluidDensity }}
                        />
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="mt-4 w-full justify-center text-amber-500"
                  >
                    Test Liquid
                  </Badge>
                </div>
              </motion.div>
            )}

            {activeTool === "tube" && (
              <motion.div
                key="tube"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <div className="w-64 h-80 bg-blue-500/10 border-2 border-white/10 rounded-b-3xl relative flex items-center justify-center overflow-hidden">
                  <div
                    className="absolute bottom-0 w-full bg-blue-500/30"
                    style={{ height: "70%" }}
                  />

                  {/* Floating Test Tube */}
                  <motion.div
                    className="w-10 h-64 bg-slate-300/40 border-2 border-white/20 rounded-b-full relative flex flex-col items-center"
                    animate={{ y: (1 / fluidDensity) * 50 - 40 }}
                    transition={{ type: "spring", stiffness: 30, damping: 5 }}
                  >
                    {/* Weights inside */}
                    <div className="absolute bottom-2 space-y-1">
                      <div className="w-6 h-6 bg-slate-700 rounded-full" />
                      <div className="w-6 h-6 bg-slate-700 rounded-full opacity-60" />
                    </div>
                    {/* Scale on tube */}
                    <div className="absolute inset-x-0 top-8 flex flex-col items-center gap-4">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <div key={i} className="w-full h-px bg-white/40" />
                      ))}
                    </div>
                  </motion.div>
                </div>
                <p className="mt-6 text-sm text-white/40 text-center max-w-xs italic">
                  Depth of immersion is inversely proportional to the density of
                  the liquid.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Card className="bg-slate-900/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-sm">Fluid Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/40">Liquid Density Range</span>
                <span>{fluidDensity.toFixed(2)} ρ_w</span>
              </div>
              <Slider
                value={[fluidDensity]}
                onValueChange={(v) => setFluidDensity(v[0])}
                min={0.5}
                max={1.5}
                step={0.01}
              />
            </div>

            <div className="bg-white/5 p-4 rounded-lg border border-white/10 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  ρ₁
                </div>
                <div>
                  <p className="text-[10px] text-white/40 font-bold uppercase">
                    Fluid 1 (Reference)
                  </p>
                  <p className="font-bold">Water (1000 kg/m³)</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                  ρ₂
                </div>
                <div>
                  <p className="text-[10px] text-white/40 font-bold uppercase">
                    Fluid 2 (Test)
                  </p>
                  <p className="font-bold">
                    Unknown ({(fluidDensity * 1000).toFixed(0)} kg/m³)
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-white/40 leading-relaxed italic">
                {activeTool === "utube"
                  ? "Law used: Pressure at the same level in a continuous static fluid is equal. ρ₁h₁ = ρ₂h₂"
                  : "Hare's apparatus uses suction to lift fluids. Lift depends on density."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function SimplePendulumLab() {
  const [length, setLength] = useState(1.0); // meters
  const [gravity, setGravity] = useState(9.81); // m/s^2
  const [theta0, setTheta0] = useState(10); // degrees
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((t) => t + 0.05);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const period = 2 * Math.PI * Math.sqrt(length / gravity);
  const currentTheta = theta0 * Math.cos((2 * Math.PI * time) / period);

  return (
    <div className="space-y-6">
      <div className="relative bg-slate-900 rounded-2xl border border-white/10 h-[450px] overflow-hidden flex flex-col items-center p-12">
        {/* Support */}
        <div className="w-48 h-2 bg-slate-700 rounded-full" />

        {/* Pendulum */}
        <motion.div
          className="relative origin-top flex flex-col items-center"
          style={{ height: length * 150 }}
          animate={{ rotate: currentTheta }}
          transition={{ type: "tween", ease: "linear" }}
        >
          <div className="w-[1px] h-full bg-white/40 shadow-[0_0_10px_white]" />
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 shadow-xl border border-white/20 -mt-1" />
        </motion.div>

        <div className="absolute top-8 left-8">
          <Badge variant="outline" className="text-white/40 mb-2">
            Gravity Lab
          </Badge>
          <h3 className="text-2xl font-black text-white">SIMPLE PENDULUM</h3>
        </div>

        <div className="absolute bottom-8 right-8 flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] text-white/40 font-bold uppercase">
              Measured Period (T)
            </p>
            <p className="text-3xl font-black text-white">
              {period.toFixed(3)}s
            </p>
          </div>
          <Button
            size="icon"
            className="w-16 h-16 rounded-full"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? <Pause /> : <Play />}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900 border-white/10">
          <CardHeader>
            <CardTitle className="text-xs uppercase">String Length</CardTitle>
          </CardHeader>
          <CardContent>
            <Slider
              value={[length]}
              onValueChange={(v) => setLength(v[0])}
              min={0.5}
              max={2.0}
              step={0.1}
            />
            <p className="mt-4 text-center font-bold text-blue-400">
              {length} meters
            </p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-white/10">
          <CardHeader>
            <CardTitle className="text-xs uppercase">Gravity (g)</CardTitle>
          </CardHeader>
          <CardContent>
            <Slider
              value={[gravity]}
              onValueChange={(v) => setGravity(v[0])}
              min={1.62}
              max={20}
              step={0.1}
            />
            <p className="mt-4 text-center font-bold text-orange-400">
              {gravity} m/s²
            </p>
            <div className="flex justify-center gap-2 mt-2">
              <Badge
                className="cursor-pointer"
                onClick={() => setGravity(9.81)}
              >
                Earth
              </Badge>
              <Badge
                className="cursor-pointer"
                onClick={() => setGravity(1.62)}
              >
                Moon
              </Badge>
              <Badge
                className="cursor-pointer"
                onClick={() => setGravity(24.79)}
              >
                Jupiter
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-green-500/20">
          <CardHeader>
            <CardTitle className="text-xs uppercase">Theory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-3 bg-white/5 rounded-lg border border-white/10 font-mono text-xs text-green-400 text-center">
              g = 4π²(L / T²)
            </div>
            <p className="mt-4 text-[10px] text-white/40 leading-relaxed italic">
              For small angles, the period depends only on length and gravity.
              Adjust length to see how T changes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
