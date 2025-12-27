import { SupabaseClient } from "@supabase/supabase-js";

export const startSession = async (
  supabase: SupabaseClient,
  userId: string
): Promise<void> => {
  try {
    const now = new Date();
    // 1. Create new session
    const { data, error } = await supabase
      .from("user_sessions")
      .insert({
        user_id: userId,
        session_start: now.toISOString(),
        duration_seconds: 0,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Error starting session:", error);
      return;
    }

    // 2. Store session ID in localStorage
    if (typeof window !== "undefined" && data) {
      localStorage.setItem("current_session_id", data.id);
      localStorage.setItem("current_session_start", now.getTime().toString());
    }
  } catch (err) {
    console.error("Unexpected error starting session:", err);
  }
};

export const endSession = async (supabase: SupabaseClient): Promise<void> => {
  try {
    // 1. Get session ID from localStorage
    if (typeof window === "undefined") return;

    const sessionId = localStorage.getItem("current_session_id");
    if (!sessionId) return;

    const startTimeStr = localStorage.getItem("current_session_start");
    const startTime = startTimeStr ? parseInt(startTimeStr) : null;
    const now = new Date();

    let duration = 0;
    if (startTime) {
      duration = Math.floor((now.getTime() - startTime) / 1000);
    }

    // 2. Update session in Supabase
    await supabase
      .from("user_sessions")
      .update({
        session_end: now.toISOString(),
        duration_seconds: duration,
      })
      .eq("id", sessionId);

    // 3. Clear localStorage
    localStorage.removeItem("current_session_id");
    localStorage.removeItem("current_session_start");
  } catch (err) {
    console.error("Error ending session:", err);
  }
};
