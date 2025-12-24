import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { SubjectProgressCard } from "@/components/dashboard/subject-progress-card"
import { StudyPlanCard } from "@/components/dashboard/study-plan-card"
import { BookOpen, Target, Clock, TrendingUp, ArrowRight, Sparkles } from "lucide-react"
import { AISidebarWidget } from "@/components/dashboard/ai-sidebar-widget"

const subjects = [
  { name: "Biology", emoji: "🧬", progress: 68, chapters: 24, completedChapters: 16 },
  { name: "Chemistry", emoji: "🧪", progress: 45, chapters: 20, completedChapters: 9 },
  { name: "Physics", emoji: "⚛️", progress: 52, chapters: 18, completedChapters: 9 },
  { name: "Combined Maths", emoji: "🔢", progress: 35, chapters: 22, completedChapters: 8 },
]

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
      {/* Welcome Banner */}
      <div className="relative mb-8 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-background to-secondary/20" />
        <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Welcome back, Nira 👋</h1>
              <p className="text-muted-foreground">{"You've completed 3 lessons this week. Keep up the momentum!"}</p>
            </div>
            <Button className="shrink-0">
              Continue Learning
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Chapters Completed" value={42} icon={BookOpen} trend="8 this week" trendUp={true} />
        <StatsCard title="Quiz Accuracy" value="78%" icon={Target} trend="+5% from last week" trendUp={true} />
        <StatsCard title="Study Time" value="24h" icon={Clock} trend="This month" />
        <StatsCard title="Current Streak" value="7 days" icon={TrendingUp} trend="Personal best!" trendUp={true} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject Progress */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Subject Progress</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subjects.map((subject) => (
              <SubjectProgressCard key={subject.name} {...subject} />
            ))}
          </div>
        </div>

        {/* Sidebar with Study Plan and AI Widget */}
        <div className="space-y-4">
          <StudyPlanCard />

          <AISidebarWidget />

          {/* AI Suggestion Card */}
          <Card className="glass border-border/50 rounded-2xl border-primary/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                AI Suggestion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Based on your progress, focus on Chemistry Chapter 12: Organic Reactions for better exam preparation.
              </p>
              <Button size="sm" variant="outline" className="w-full bg-transparent">
                Start Lesson
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
