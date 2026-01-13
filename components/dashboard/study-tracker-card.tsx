"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Play, Square, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

export function StudyTrackerCard() {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const supabase = createClient();

  useEffect(() => {
    // Mark as mounted first to prevent hydration mismatch
    setMounted(true);

    // Check for active session in localStorage on mount
    const storedStartTime = localStorage.getItem("study_session_start");
    if (storedStartTime) {
      const start = parseInt(storedStartTime, 10);
      startTimeRef.current = start;
      setIsActive(true);

      // Calculate elapsed time immediately to avoid 0 jump
      const now = Date.now();
      setSeconds(Math.floor((now - start) / 1000));
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const now = Date.now();
          setSeconds(Math.floor((now - startTimeRef.current) / 1000));
        }
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  const toggleTimer = async () => {
    if (!isActive) {
      // START
      const now = Date.now();
      startTimeRef.current = now;
      localStorage.setItem("study_session_start", now.toString());
      setIsActive(true);
      setSeconds(0);
      toast.success("Study session started! Good luck.");
    } else {
      // STOP
      setLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          toast.error("You must be logged in to save sessions.");
          return;
        }

        if (!startTimeRef.current) return;

        const endTime = new Date();
        const startTime = new Date(startTimeRef.current);
        const duration = Math.floor(
          (endTime.getTime() - startTime.getTime()) / 1000
        );

        // Don't save very short sessions (< 5 seconds)
        if (duration < 5) {
          toast.info("Session too short, not saved.");
          // Reset
          setIsActive(false);
          setSeconds(0);
          startTimeRef.current = null;
          localStorage.removeItem("study_session_start");
          setLoading(false);
          return;
        }

        const { error } = await supabase.from("user_sessions").insert({
          user_id: user.id,
          session_start: startTime.toISOString(),
          session_end: endTime.toISOString(),
          duration_seconds: duration,
        });

        if (error) throw error;

        toast.success(
          `Session saved! You studied for ${formatTime(duration)}.`
        );

        // Reset
        setIsActive(false);
        setSeconds(0);
        startTimeRef.current = null;
        localStorage.removeItem("study_session_start");

        // Refresh page to update graph (optional, or use router.refresh)
        window.location.reload();
      } catch (error) {
        console.error("Error saving session:", error);
        toast.error("Failed to save session.");
      } finally {
        setLoading(false);
      }
    }
  };

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    if (h > 0) return `${h}h ${m}m ${s}s`;
    return `${m}m ${s}s`;
  };

  const displayTime = () => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  return (
    <Card
      className={`glass border-border/50 rounded-2xl transition-all duration-300 ${
        isActive
          ? "border-primary/50 shadow-[0_0_20px_rgba(var(--primary),0.2)]"
          : ""
      }`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">
              {isActive ? "Current Session" : "Track Study Time"}
            </p>
            <div
              className={`text-2xl font-bold font-mono transition-colors duration-300 ${
                isActive ? "text-primary" : "text-foreground"
              }`}
            >
              {displayTime()}
            </div>
            <p className="text-xs text-muted-foreground mt-1 min-h-[1.25rem]">
              {isActive ? "Keep going!" : "Ready to focus?"}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              size="icon"
              className={`rounded-xl w-12 h-12 transition-all duration-300 ${
                isActive
                  ? "bg-destructive hover:bg-destructive/90"
                  : "bg-primary hover:bg-primary/90"
              }`}
              onClick={toggleTimer}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isActive ? (
                <Square className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
