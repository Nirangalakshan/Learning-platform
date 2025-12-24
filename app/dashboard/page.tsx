import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
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
} from "lucide-react";
import { AIAssistant } from "@/components/dashboard/ai-assistant";

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
            title="Chapters Completed"
            value={42}
            icon={BookOpen}
            trend="8 this week"
            trendUp={true}
          />
          <StatsCard
            title="Quiz Accuracy"
            value="78%"
            icon={Target}
            trend="+5% from last week"
            trendUp={true}
          />
          <StatsCard
            title="Study Time"
            value="24h"
            icon={Clock}
            trend="This month"
          />
          <StatsCard
            title="Current Streak"
            value="7 days"
            icon={TrendingUp}
            trend="Personal best!"
            trendUp={true}
          />
        </div>

        <div className="mb-6 sm:mb-8 lg:mb-10">
          <AIAssistant />
        </div>

        {/* Main Content Grid - Enhanced Responsiveness */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Subject Progress */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                Subject Progress
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
              {subjects.map((subject) => (
                <SubjectProgressCard key={subject.name} {...subject} />
              ))}
            </div>
          </div>

          {/* Study Plan & AI Suggestion */}
          <div className="space-y-4 sm:space-y-5">
            <StudyPlanCard />

            {/* AI Suggestion Card - Enhanced */}
            <Card className="glass border-border/50 rounded-2xl lg:rounded-3xl border-primary/30 hover:border-primary/50 transition-all duration-300">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                  AI Suggestion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                  Based on your progress, focus on Chemistry Chapter 12: Organic
                  Reactions for better exam preparation.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full bg-transparent hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                >
                  Start Lesson
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
