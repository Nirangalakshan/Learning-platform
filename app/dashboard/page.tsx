import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { SubjectProgressCard } from "@/components/dashboard/subject-progress-card";
import { StudyPlanCard } from "@/components/dashboard/study-plan-card";
import {
  BookOpen,
  Target,
  Clock,
  TrendingUp,
  ArrowRight,
  Sparkles,
  FileText,
  Calendar,
  ListChecks,
} from "lucide-react";
import { AIAssistant } from "@/components/dashboard/ai-assistant";
import { ActivityGraph } from "@/components/dashboard/activity-graph";

const subjects = [
  {
    name: "Biology",
    emoji: "🧬",
    progress: 68,
    chapters: 24,
    completedChapters: 16,
  },
  {
    name: "Chemistry",
    emoji: "🧪",
    progress: 45,
    chapters: 20,
    completedChapters: 9,
  },
  {
    name: "Physics",
    emoji: "⚛️",
    progress: 52,
    chapters: 18,
    completedChapters: 9,
  },
  {
    name: "Combined Maths",
    emoji: "🔢",
    progress: 35,
    chapters: 22,
    completedChapters: 8,
  },
];

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profile && !profile.onboarding_completed) {
    return redirect("/onboarding");
  }

  const { data: sessions } = await supabase
    .from("user_sessions")
    .select("*")
    .eq("user_id", user.id)
    .order("session_start", { ascending: false });

  // Fetch quizzes count and data
  const { count: quizCount, data: recentQuizzes } = await supabase
    .from("ai_quizzes")
    .select("*", { count: "exact" })
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  // Fetch study plans count and data
  const { count: planCount, data: recentPlans } = await supabase
    .from("user_study_plans")
    .select("*", { count: "exact" })
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  // Fetch short notes count and data
  const { count: notesCount, data: recentNotes } = await supabase
    .from("user_short_notes")
    .select("*", { count: "exact" })
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  // Calculate today's study time
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaySessions =
    sessions?.filter((s) => new Date(s.session_start) >= today) || [];
  const totalMinutes = todaySessions.reduce((acc, s) => {
    if (s.session_end) {
      const start = new Date(s.session_start).getTime();
      const end = new Date(s.session_end).getTime();
      return acc + (end - start) / (1000 * 60);
    }
    return acc;
  }, 0);

  const formatTime = (minutes: number) => {
    if (minutes < 1) return "0m";
    if (minutes < 60) return `${Math.round(minutes)}m`;
    const h = Math.floor(minutes / 60);
    const m = Math.round(minutes % 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="relative min-h-screen">
      {/* Main Container with Responsive Padding */}
      <div className="p-4 sm:p-6 lg:p-8 xl:p-10 pt-20 sm:pt-24 lg:pt-8">
        {/* Welcome Banner - Enhanced Responsiveness */}
        <div className="relative mb-6 sm:mb-8 lg:mb-10 rounded-2xl lg:rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-muted/50 to-secondary/10" />
          <div className="absolute top-4 right-4 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative p-5 sm:p-6 md:p-8 lg:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
              <div className="flex-1">
                <p>
                  {profile?.exam_year}
                  {"\n"}
                  {profile?.district} A/L Exam
                </p>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  Welcome back, {profile?.full_name || "Student"} 👋
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {
                    "You've completed 3 lessons this week. Keep up the momentum!"
                  }
                </p>
              </div>
              <Button className="green shrink-0 w-full sm:w-auto">
                Continue Learning
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid - Enhanced Responsiveness */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-6 sm:mb-8 lg:mb-10">
          <StatsCard
            title="Generated Quizzes"
            value={quizCount || 0}
            icon={ListChecks}
            trend="Total created"
            trendUp={true}
          />
          <StatsCard
            title="Study Plans"
            value={planCount || 0}
            icon={Calendar}
            trend="Total generated"
            trendUp={true}
          />
          <StatsCard
            title="Study Time"
            value={formatTime(totalMinutes)}
            icon={Clock}
            trend="Today"
          />
          <StatsCard
            title="Short Notes"
            value={notesCount || 0}
            icon={FileText}
            trend="Total sets"
            trendUp={true}
          />
        </div>

        <div className="mb-6 sm:mb-8 lg:mb-10">
          <AIAssistant />
        </div>

        {/* Activity Graph Section */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <ActivityGraph sessions={sessions || []} />
        </div>

        {/* Main Content Grid - Enhanced Responsiveness */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Recent Quizzes */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
                <ListChecks className="w-5 h-5 text-primary" />
                Recent Quizzes
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80 transition-colors"
                asChild
              >
                <Link href="/dashboard/quizzes">View All</Link>
              </Button>
            </div>
            <div className="space-y-3">
              {recentQuizzes?.length ? (
                recentQuizzes.map((quiz) => (
                  <Card
                    key={quiz.id}
                    className="glass border-border/50 hover:border-primary/50 transition-all p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">
                          {quiz.subject}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {quiz.question_count} questions • {quiz.difficulty} •{" "}
                          {new Date(quiz.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/quizzes">View</Link>
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center p-8 border border-dashed rounded-xl border-border/50 text-muted-foreground">
                  No quizzes generated yet.
                </div>
              )}
            </div>
          </div>

          {/* Recent Study Plans */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Recent Study Plans
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80 transition-colors"
                asChild
              >
                <Link href="/dashboard/assistant">View All</Link>
              </Button>
            </div>
            <div className="space-y-3">
              {recentPlans?.length ? (
                recentPlans.map((plan) => (
                  <Card
                    key={plan.id}
                    className="glass border-border/50 hover:border-primary/50 transition-all p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">
                          {plan.subject}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {plan.total_weeks} weeks •{" "}
                          {new Date(plan.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/assistant">View</Link>
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center p-8 border border-dashed rounded-xl border-border/50 text-muted-foreground">
                  No study plans generated yet.
                </div>
              )}
            </div>
          </div>

          {/* Recent Short Notes - Spanning full width below */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Recent Short Notes
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80 transition-colors"
                asChild
              >
                <Link href="/dashboard/assistant">View All</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentNotes?.length ? (
                recentNotes.slice(0, 4).map((note) => (
                  <Card
                    key={note.id}
                    className="glass border-border/50 hover:border-primary/50 transition-all p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1 mr-4">
                        <h3 className="font-medium text-foreground truncate">
                          {note.topic}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {note.subject} •{" "}
                          {new Date(note.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/assistant">View</Link>
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="md:col-span-2 text-center p-8 border border-dashed rounded-xl border-border/50 text-muted-foreground">
                  No short notes generated yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
