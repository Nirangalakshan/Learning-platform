"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

interface HeroParticle {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

function AnimatedWords({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className="inline-block relative min-w-[200px] text-left">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-primary inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const statsVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.8 + custom * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function HeroSection() {
  const [heroParticles, setHeroParticles] = useState<HeroParticle[]>([]);

  useEffect(() => {
    // Generate random particles on client side only to prevent hydration mismatch
    setHeroParticles(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 5 + 3,
        delay: Math.random() * 3,
      }))
    );
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-background">
        {/* Animated gradient waves */}
        <motion.div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(0, 255, 153, 0.2) 0%, transparent 50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, rgba(255, 209, 102, 0.2) 0%, transparent 50%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Floating particles specific to hero */}
        {heroParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -100, -200],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Glowing geometric shapes */}
        <motion.div
          className="absolute top-1/4 left-1/3 w-20 h-20 border border-primary/20 rounded-lg"
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute bottom-1/3 right-1/3 w-16 h-16 border border-secondary/20"
          style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
          animate={{
            rotate: [0, -360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Animated lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
          <motion.line
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="url(#lineGradient1)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.line
            x1="50%"
            y1="0"
            x2="50%"
            y2="100%"
            stroke="url(#lineGradient2)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <defs>
            <linearGradient
              id="lineGradient1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#00FF99" stopOpacity="0" />
              <stop offset="50%" stopColor="#00FF99" stopOpacity="1" />
              <stop offset="100%" stopColor="#00FF99" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="lineGradient2"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFD166" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFD166" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFD166" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Sri Lanka map outline - subtle glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.03, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[800px]"
        >
          <svg viewBox="0 0 100 150" className="w-full h-full">
            <path
              d="M50 10 C30 20 25 40 20 60 C15 80 20 100 30 120 C40 135 50 140 60 135 C70 130 80 110 75 90 C70 70 65 50 60 30 C55 20 50 10 50 10"
              fill="none"
              stroke="url(#mapGradient)"
              strokeWidth="0.5"
            />
            <defs>
              <linearGradient
                id="mapGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#00FF99" />
                <stop offset="100%" stopColor="#FFD166" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-secondary/10 blur-3xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -15, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-primary/5 blur-2xl"
          animate={{
            y: [0, -15, 0],
            x: [0, 15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">
            Powered by AI for A/L Students
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance"
        >
          <span className="text-foreground">Learn </span>
          <AnimatedWords words={["Smarter", "Faster", "Better"]} />
          <span className="text-foreground"> with </span>
          <span className="text-[#009966] dark:text-[#00FF99]">AI</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty"
        >
          Your complete A/L Science companion — notes, quizzes, past papers & AI
          mock exams.
        </motion.p>

        {/* Search Input */}
        <motion.div variants={itemVariants} className="max-w-xl mx-auto mb-8">
          <div className="relative group">
            <div className="absolute  rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Enter a topic or chapter..."
                className="pl-12 pr-4 py-6 rounded-2xl bg-card border-border/50 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/signup">
            <Button
              size="lg"
              className="glow-green px-8 py-6 text-base font-medium"
            >
              Start Learning now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/login">
            {/* <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-base font-medium "
            >
              Login
            </Button> */}
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          <motion.div
            custom={0}
            variants={statsVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="text-2xl sm:text-3xl font-bold text-primary">
              15+
            </div>
            <div className="text-sm text-muted-foreground">Years of Papers</div>
          </motion.div>
          <motion.div
            custom={1}
            variants={statsVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="text-2xl sm:text-3xl font-bold text-secondary">
              1000+
            </div>
            <div className="text-sm text-muted-foreground">Quiz Questions</div>
          </motion.div>
          <motion.div
            custom={2}
            variants={statsVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="text-2xl sm:text-3xl font-bold text-primary">4</div>
            <div className="text-sm text-muted-foreground">Subjects</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
