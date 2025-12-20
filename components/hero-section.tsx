"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[#0B0C0E]">
        {/* Sri Lanka map outline - subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[800px] opacity-[0.03]">
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
        </div>

        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-secondary/10 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-primary/5 blur-2xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">
            Powered by AI for A/L Students
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
          <span className="text-foreground">Learn Smarter with </span>
          <span className="text-primary text-green">AI</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
          Your complete A/L Science companion — notes, quizzes, past papers & AI
          mock exams.
        </p>

        {/* Search Input */}
        <div className="max-w-xl mx-auto mb-8">
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
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-primary">
              15+
            </div>
            <div className="text-sm text-muted-foreground">Years of Papers</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-secondary">
              1000+
            </div>
            <div className="text-sm text-muted-foreground">Quiz Questions</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-primary">4</div>
            <div className="text-sm text-muted-foreground">Subjects</div>
          </div>
        </div>
      </div>
    </section>
  );
}
