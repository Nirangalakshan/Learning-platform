"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Dna, FlaskConical, Atom, Calculator } from "lucide-react";
import { motion } from "framer-motion";

const subjects = [
  {
    icon: Dna,
    name: "Biology",
    emoji: "🧬",
    description: "Explore life sciences from cells to ecosystems",
    chapters: 24,
  },
  {
    icon: FlaskConical,
    name: "Chemistry",
    emoji: "🧪",
    description: "Master organic, inorganic, and physical chemistry",
    chapters: 20,
  },
  {
    icon: Atom,
    name: "Physics",
    emoji: "⚛️",
    description: "Understand mechanics, waves, and modern physics",
    chapters: 18,
  },
  {
    icon: Calculator,
    name: "Combined Maths",
    emoji: "🔢",
    description: "Excel in pure and applied mathematics",
    chapters: 22,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function SubjectsSection() {
  return (
    <section id="subjects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
            Choose Your{" "}
            <span className="text-secondary text-glow-gold">Subjects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete coverage for all A/L Science stream subjects
          </p>
        </motion.div>

        {/* Subjects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {subjects.map((subject, index) => (
            <motion.div key={index} variants={cardVariants}>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="glass border-border/50 rounded-2xl group hover:glow-green cursor-pointer transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="text-4xl mb-4"
                      animate={{
                        y: [0, -8, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }}
                    >
                      {subject.emoji}
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      {subject.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {subject.description}
                    </p>
                    <div className="text-xs text-primary font-medium">
                      {subject.chapters} Chapters
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
