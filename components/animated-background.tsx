"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  size: number;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
  xOffset: number;
}

interface Dot {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dots, setDots] = useState<Dot[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Generate random values only on the client side to avoid hydration mismatch
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
        xOffset: Math.random() * 50 - 25,
      }))
    );
    setDots(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      }))
    );
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-background" />

      {/* Animated Grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #00FF99 1px, transparent 1px),
                           linear-gradient(to bottom, #00FF99 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "50px 50px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Large Gradient Orbs */}
      <motion.div
        className="absolute top-0 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #00FF99 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #FFD166 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, #00FF99 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, particle.xOffset, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating Dots Pattern */}
      {mounted && (
        <div className="absolute inset-0 opacity-[0.02]">
          {dots.map((dot) => (
            <motion.div
              key={dot.id}
              className="absolute w-1 h-1 rounded-full bg-primary"
              style={{
                left: `${dot.left}%`,
                top: `${dot.top}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: dot.duration,
                repeat: Infinity,
                delay: dot.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Scan Line Effect */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #00FF99 50%, transparent 100%)",
          height: "200px",
        }}
        animate={{
          y: ["-200px", "100vh"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
