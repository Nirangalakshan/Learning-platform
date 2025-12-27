"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ruler,
  Maximize2,
  MoveRight,
  ChevronRight,
  Info,
  Search,
  MoveVertical,
  Target,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function VernierCalipers() {
  const [position, setPosition] = useState(0); // 0 to 100 mm
  const [objectSize, setObjectSize] = useState(25); // size of the object to measure
  const [showReading, setShowReading] = useState(false);

  const mmToPixel = 4;

  const calculateReading = () => {
    const mainScaleValue = Math.floor(position);
    const vernierCoincidence = Math.round((position - mainScaleValue) * 10);
    return {
      mainScale: mainScaleValue,
      vernier: (vernierCoincidence * 0.1).toFixed(1),
      total: position.toFixed(1),
    };
  };

  const reading = calculateReading();

  return (
    <div className="space-y-6">
      <div className="relative bg-slate-900/60 rounded-2xl border border-white/10 h-[300px] overflow-hidden flex items-center justify-start p-12">
        <div className="absolute top-1/2 -translate-y-1/2 flex items-center">
          <div
            className="h-20 bg-slate-400/20 border-y border-r border-white/20 rounded-r-lg relative"
            style={{ width: 600 }}
          >
            {Array.from({ length: 151 }).map((_, i) => (
              <div
                key={i}
                className={`absolute bottom-0 w-px bg-white/40 ${
                  i % 10 === 0 ? "h-8" : i % 5 === 0 ? "h-6" : "h-4"
                }`}
                style={{ left: i * mmToPixel }}
              >
                {i % 10 === 0 && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white/60">
                    {i / 10}
                  </span>
                )}
              </div>
            ))}
            <div
              className="absolute left-0 top-0 w-8 h-40 bg-slate-400 rounded-bl-3xl border border-white/20"
              style={{ transform: "translateY(-60%)" }}
            />
          </div>

          <motion.div
            className="absolute left-8 top-1/2 -translate-y-1/2 bg-amber-500/80 rounded-sm border border-amber-400 z-10"
            style={{
              width: objectSize * mmToPixel,
              height: 40,
              boxShadow: "0 0 15px rgba(245, 158, 11, 0.3)",
            }}
          />

          <motion.div
            className="absolute top-1/2 -translate-y-1/2 z-20"
            animate={{ x: position * mmToPixel }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
          >
            <div className="h-24 w-48 bg-slate-500/30 backdrop-blur-md rounded-lg border border-white/20 relative">
              <div
                className="absolute left-0 top-0 w-8 h-40 bg-slate-400 rounded-br-3xl border border-white/20"
                style={{ transform: "translateY(-60%)" }}
              />
              <div className="absolute bottom-0 left-0 w-full h-12">
                {Array.from({ length: 11 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute bottom-0 w-px bg-cyan-400 h-6"
                    style={{ left: i * 0.9 * mmToPixel }}
                  >
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] text-cyan-300">
                      {i}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-4 left-4 flex gap-4">
          <Badge variant="outline" className="text-white/60">
            Least Count: 0.1mm
          </Badge>
          <Badge variant="outline" className="text-white/60">
            Slide to measure
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-900 shadow-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <Ruler className="w-5 h-5" />
              Caliper Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Position</span>
                <span className="text-cyan-400 font-medium">
                  {position.toFixed(2)} mm
                </span>
              </div>
              <Slider
                value={[position]}
                onValueChange={(v) => setPosition(v[0])}
                min={0}
                max={100}
                step={0.05}
              />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Object Size</span>
                <span className="text-amber-400 font-medium">
                  {objectSize} mm
                </span>
              </div>
              <Slider
                value={[objectSize]}
                onValueChange={(v) => setObjectSize(v[0])}
                min={5}
                max={80}
                step={1}
              />
            </div>
            <Button
              className="w-full"
              variant={showReading ? "outline" : "default"}
              onClick={() => setShowReading(!showReading)}
            >
              {showReading ? "Hide Reading" : "Check Reading"}
            </Button>
          </CardContent>
        </Card>

        <AnimatePresence>
          {showReading && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Card className="bg-slate-900 border-cyan-500/30 h-full">
                <CardHeader>
                  <CardTitle className="text-cyan-400 text-sm">
                    Measurement Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4 text-sm">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/60">
                      Main Scale Reading (MSR)
                    </span>
                    <span className="font-bold">{reading.mainScale} mm</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-white/60">
                      Vernier Coincidence (VSC)
                    </span>
                    <span className="font-bold">
                      {Math.round((position - Math.floor(position)) * 10)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-4">
                    <span className="text-cyan-400 font-black uppercase">
                      Total Reading
                    </span>
                    <span className="text-3xl font-black text-white">
                      {reading.total} mm
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function MicrometerScrewGauge() {
  const [rotation, setRotation] = useState(0);

  const pitch = 0.5;
  const circularDivisions = 50;
  const leastCount = pitch / circularDivisions;
  const mmPosition = (rotation / 360) * pitch;

  const calculateReading = () => {
    const linearScale = Math.floor(mmPosition * 2) / 2;
    const circularReading = Math.round((mmPosition - linearScale) / leastCount);
    return {
      linear: linearScale.toFixed(2),
      circular: circularReading,
      total: mmPosition.toFixed(2),
    };
  };

  const reading = calculateReading();

  return (
    <div className="space-y-6">
      <div className="relative bg-slate-900 rounded-2xl border border-white/10 h-[400px] flex items-center justify-center overflow-hidden">
        <div className="relative w-80 h-48 border-[12px] border-slate-600 rounded-l-full flex items-center">
          <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-8 h-12 bg-slate-500 rounded-r-sm" />
          <div className="absolute left-32 top-1/2 -translate-y-1/2 flex items-center">
            <div
              className="w-12 h-12 rounded-full bg-slate-200 shadow-inner z-10"
              style={{
                transform: `translateX(${-48 + mmPosition * 20}px)`,
                visibility: mmPosition < 2.4 ? "visible" : "hidden",
              }}
            />
            <div className="w-48 h-10 bg-slate-400 border border-white/20 relative z-0">
              {Array.from({ length: 41 }).map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-[1px] bg-slate-800 ${
                    i % 2 === 0 ? "h-4 bottom-1/2" : "h-4 top-1/2"
                  }`}
                  style={{ left: i * 5 }}
                >
                  {i % 10 === 0 && (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-bold">
                      {i / 2}
                    </span>
                  )}
                </div>
              ))}
              <div className="absolute top-1/2 w-full h-[2px] bg-slate-800 -translate-y-1/2" />
            </div>
            <motion.div className="z-20 flex" animate={{ x: mmPosition * 10 }}>
              <div className="w-24 h-16 bg-gradient-to-b from-slate-300 via-slate-500 to-slate-300 rounded-lg border border-white/20 flex items-center justify-end relative overflow-hidden">
                <div className="absolute right-0 w-full h-full flex flex-col justify-around py-4">
                  {Array.from({ length: 11 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-end pr-2 gap-2"
                    >
                      <span className="text-[8px] font-mono font-bold text-slate-800">
                        {(Math.round(reading.circular / 5) * 5 -
                          10 +
                          i * 2 +
                          50) %
                          50}
                      </span>
                      <div className="w-4 h-[1px] bg-slate-800" />
                    </div>
                  ))}
                </div>
                <div className="w-32 h-12 bg-slate-600 rounded-r-lg border-l border-white/20 opacity-80" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-900 border-white/10">
          <CardHeader>
            <CardTitle className="text-orange-400 text-sm">
              Thimble Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Slider
              value={[rotation]}
              onValueChange={(v) => setRotation(v[0])}
              min={0}
              max={3600}
              step={1}
            />
            <div className="flex gap-2">
              <Button
                className="flex-1"
                variant="outline"
                onClick={() => setRotation(Math.max(0, rotation - 45))}
              >
                Roll Back
              </Button>
              <Button
                className="flex-1"
                variant="outline"
                onClick={() => setRotation(Math.min(3600, rotation + 45))}
              >
                Roll Forward
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-orange-500/30">
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-white/60">Linear Reading</span>
              <span className="font-bold">{reading.linear} mm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Circular Reading</span>
              <span className="font-bold">{reading.circular} div</span>
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-baseline">
              <span className="text-orange-400 font-black">TOTAL</span>
              <span className="text-3xl font-black text-white">
                {reading.total} mm
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function TravellingMicroscope() {
  const [hPos, setHPos] = useState(40);
  const [vPos, setVPos] = useState(10);
  const specimenX = 45.2;
  const specimenY = 12.8;
  const dist = Math.sqrt((hPos - specimenX) ** 2 + (vPos - specimenY) ** 2);
  const blur = Math.max(0, dist * 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative bg-slate-900 rounded-2xl border border-white/10 h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute top-12 left-0 right-0 h-16 bg-slate-800 border-y border-white/10">
            {Array.from({ length: 11 }).map((_, i) => (
              <div
                key={i}
                className="absolute bottom-0 w-px bg-white/20 h-4"
                style={{ left: `${i * 10}%` }}
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white/40">
                  {i * 10}
                </span>
              </div>
            ))}
            <motion.div
              className="absolute top-0 bottom-0 w-12 bg-slate-400/20 border-x border-white/40 backdrop-blur-sm shadow-xl"
              animate={{ left: `${(hPos - 40) * 10}%` }}
              style={{ marginLeft: "-24px" }}
            />
          </div>
          <div className="absolute top-0 bottom-0 right-12 w-16 bg-slate-800 border-x border-white/10">
            {Array.from({ length: 11 }).map((_, i) => (
              <div
                key={i}
                className="absolute right-0 h-[1px] bg-white/20 w-4"
                style={{ bottom: `${i * 10}%` }}
              >
                <span className="absolute -right-6 top-1/2 -translate-y-1/2 text-[10px] text-white/40">
                  {i * 10}
                </span>
              </div>
            ))}
            <motion.div
              className="absolute left-0 right-0 h-12 bg-slate-400/20 border-y border-white/40 backdrop-blur-sm"
              animate={{ bottom: `${(vPos - 10) * 10}%` }}
              style={{ marginBottom: "-24px" }}
            />
          </div>
          <div className="relative w-64 h-64 rounded-full border-8 border-slate-700 bg-black overflow-hidden shadow-2xl z-20">
            <motion.div
              className="absolute w-[400px] h-[400px]"
              animate={{
                x: (specimenX - hPos) * 20 - 200 + 128,
                y: (vPos - specimenY) * 20 - 200 + 128,
                filter: `blur(${blur}px)`,
              }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-1 h-80 bg-cyan-400/30 border-x border-cyan-400/50" />
                <div className="w-20 h-1 bg-white/20" />
              </div>
            </motion.div>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-red-500/80 shadow-[0_0_5px_red]" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-red-500/80 shadow-[0_0_5px_red]" />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <Card className="bg-slate-900 border-white/10">
            <CardHeader>
              <CardTitle className="text-xs uppercase tracking-widest text-white/40">
                Telescope Position
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span>H-POS</span>
                  <span className="text-blue-400">{hPos.toFixed(3)} mm</span>
                </div>
                <Slider
                  value={[hPos]}
                  onValueChange={(v) => setHPos(v[0])}
                  min={40}
                  max={50}
                  step={0.001}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span>V-POS</span>
                  <span className="text-purple-400">{vPos.toFixed(3)} mm</span>
                </div>
                <Slider
                  value={[vPos]}
                  onValueChange={(v) => setVPos(v[0])}
                  min={10}
                  max={20}
                  step={0.001}
                />
              </div>
            </CardContent>
          </Card>
          <Card
            className={`bg-slate-900 border-2 transition-all ${
              dist < 0.05
                ? "border-green-500 bg-green-500/10"
                : "border-white/10"
            }`}
          >
            <CardContent className="pt-6 flex items-center gap-4">
              <Target
                className={dist < 0.05 ? "text-green-400" : "text-white/20"}
              />
              <div>
                <h4 className="font-bold text-white">Specimen Focus</h4>
                <p className="text-sm text-white/40">
                  {dist < 0.05
                    ? "Target centered! Reading ready."
                    : "Adjust sliders to align crosshair."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function Spherometer() {
  const [screwPosition, setScrewPosition] = useState(0);

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900 border-white/10 overflow-hidden">
        <div className="h-[400px] flex flex-col items-center justify-center relative bg-slate-900">
          <div className="absolute bottom-24 flex gap-48">
            <div className="w-4 h-24 bg-slate-500 rounded-full origin-top rotate-[20deg]" />
            <div className="w-4 h-24 bg-slate-500 rounded-full origin-top -rotate-[20deg]" />
          </div>
          <div className="w-56 h-4 bg-slate-600 rounded-full relative z-20">
            <div className="absolute left-1/2 -translate-x-12 bottom-0 w-8 h-48 bg-slate-400 border-x border-slate-500">
              {Array.from({ length: 21 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 w-3 h-[1px] bg-slate-800"
                  style={{ bottom: i * 10 }}
                >
                  <span className="absolute left-4 -translate-y-1/2 text-[8px] font-bold">
                    {i - 10}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <motion.div
            className="flex flex-col items-center relative z-30"
            animate={{ y: -screwPosition * 10 }}
          >
            <div className="w-6 h-12 bg-slate-700 rounded-t-lg" />
            <div className="w-64 h-8 bg-gradient-to-r from-slate-500 via-slate-300 to-slate-500 rounded-full shadow-xl relative overflow-hidden flex items-center justify-center">
              <div className="text-[10px] font-bold text-slate-800">
                {Math.round(((screwPosition % 1) * 100 + 100) % 100)} div
              </div>
            </div>
            <div className="w-4 h-64 bg-slate-400 border-x border-slate-500 flex items-end">
              <div className="w-full h-8 bg-slate-700 rounded-b-lg" />
            </div>
          </motion.div>
          <div className="absolute bottom-0 w-full h-24 bg-blue-900/10 border-t border-white/5" />
        </div>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-900 border-white/10">
          <CardHeader>
            <CardTitle className="text-indigo-400 text-sm">
              Screw Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Slider
              value={[screwPosition]}
              onValueChange={(v) => setScrewPosition(v[0])}
              min={-5}
              max={5}
              step={0.01}
            />
            <div className="flex gap-2">
              <Button
                className="flex-1"
                variant="secondary"
                onClick={() => setScrewPosition(0)}
              >
                Reset
              </Button>
              <Button
                className="flex-1"
                variant="secondary"
                onClick={() => setScrewPosition(2.5)}
              >
                Max Curvature
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-indigo-500/30">
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-white/40">Least Count</span>
              <span>0.01 mm</span>
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-baseline">
              <span className="text-indigo-400 font-black">READING</span>
              <span className="text-4xl font-black text-white">
                {screwPosition.toFixed(2)} mm
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
