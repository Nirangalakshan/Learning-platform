"use client";

import { motion } from "framer-motion";
import { CheckCircle2, PartyPopper, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FinishStepProps {
  onComplete: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

export default function FinishStep({
  onComplete,
  onBack,
  isLoading,
}: FinishStepProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-2xl mx-auto py-12">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2,
        }}
        className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center"
      >
        <CheckCircle2 className="w-12 h-12 text-green-500" />
      </motion.div>

      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2 text-primary font-semibold uppercase tracking-wider text-sm"
        >
          <PartyPopper className="w-4 h-4" />
          You're all set!
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-bold"
        >
          Ready to start your journey?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground text-lg"
        >
          Your personalized dashboard is ready. We've configured everything
          based on your preferences.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col items-center gap-4 w-full"
      >
        <Button
          size="lg"
          onClick={onComplete}
          disabled={isLoading}
          className="h-14 px-12 text-lg rounded-full group w-full sm:w-auto"
        >
          {isLoading ? (
            "Setting up..."
          ) : (
            <>
              Enter Dashboard
              <LayoutDashboard className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            </>
          )}
        </Button>
        {!isLoading && (
          <Button variant="ghost" onClick={onBack}>
            Correction? Go back
          </Button>
        )}
      </motion.div>

      <div className="pt-8 grid grid-cols-2 gap-4 w-full text-sm text-muted-foreground">
        <div className="p-4 border rounded-2xl bg-card/50">
          <div className="font-semibold text-foreground mb-1">Backup Sync</div>
          Your data is safely stored in Supabase Cloud.
        </div>
        <div className="p-4 border rounded-2xl bg-card/50">
          <div className="font-semibold text-foreground mb-1">Quick Guide</div>
          You can change these settings anytime in your profile.
        </div>
      </div>
    </div>
  );
}
