"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Bot, User } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function TypingText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setShowCursor(false);
        }
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, isInView]);

  return (
    <span ref={ref}>
      {displayedText}
      {showCursor && (
        <motion.span
          className="inline-block w-0.5 h-4 bg-primary ml-0.5"
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      )}
    </span>
  );
}

export function AIPreviewSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
            Your AI <span className="text-primary">Study Assistant</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get instant answers in English or Sinhala
          </p>
        </motion.div>

        {/* Chat Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <Card className="glass border-border/50 rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              {/* Chat Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="px-6 py-4 border-b border-border/50 flex items-center gap-3"
              >
                <motion.div
                  className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(0, 255, 153, 0.4)",
                      "0 0 0 10px rgba(0, 255, 153, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                >
                  <Bot className="w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <div className="font-medium text-foreground">
                    AI Learn Assistant
                  </div>
                  <div className="text-xs text-primary">Online</div>
                </div>
              </motion.div>

              {/* Chat Messages */}
              <div className="p-6 space-y-6">
                {/* User Message */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex justify-end"
                >
                  <div className="flex items-start gap-3 max-w-md">
                    <div className="bg-primary/20 rounded-2xl rounded-tr-sm px-4 py-3">
                      <p className="text-sm text-foreground">
                        Explain photosynthesis in Sinhala
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </motion.div>

                {/* AI Response */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start gap-3 max-w-md">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-card rounded-2xl rounded-tl-sm px-4 py-3 border border-border/50">
                      <p className="text-sm text-foreground mb-2">
                        <span className="text-primary font-medium">
                          <TypingText text="ප්‍රභාසංශ්ලේෂණය" delay={1000} />
                        </span>{" "}
                        <TypingText
                          text="යනු ශාක මගින් ආලෝක ශක්තිය රසායනික ශක්තිය බවට පරිවර්තනය කිරීමේ ක්‍රියාවලියයි."
                          delay={1500}
                        />
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <TypingText
                          text="6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂"
                          delay={3500}
                        />
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Input Area (Mock) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="px-6 py-4 border-t border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-input rounded-xl px-4 py-3 text-sm text-muted-foreground">
                    Type your question...
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5 text-primary-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h14M12 5l7 7-7 7"
                      />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
