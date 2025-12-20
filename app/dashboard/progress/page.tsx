import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Target, Clock, Award, Calendar, BarChart3 } from "lucide-react"

const weeklyData = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 3 },
  { day: "Wed", hours: 1.5 },
  { day: "Thu", hours: 4 },
  { day: "Fri", hours: 2 },
  { day: "Sat", hours: 5 },
  { day: "Sun", hours: 3.5 },
]

const subjectProgress = [
  { name: "Biology", progress: 68, accuracy: 82, quizzes: 15 },
  { name: "Chemistry", progress: 45, accuracy: 75, quizzes: 10 },
  { name: "Physics", progress: 52, accuracy: 78, quizzes: 12 },
  { name: "Combined Maths", progress: 35, accuracy: 70, quizzes: 8 },
]

const achievements = [
  { title: "7 Day Streak", icon: "🔥", earned: true },
  { title: "Quiz Master", icon: "🧠", earned: true },
  { title: "Night Owl", icon: "🦉", earned: true },
  { title: "Perfect Score", icon: "⭐", earned: false },
  { title: "Speed Learner", icon: "⚡", earned: false },
  { title: "Completionist", icon: "🏆", earned: false },
]

export default function ProgressPage() {
  const maxHours = Math.max(...weeklyData.map((d) => d.hours))

  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Progress Analytics</h1>
        <p className="text-muted-foreground">Track your learning journey and performance</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="glass border-border/50 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">50%</p>
                <p className="text-xs text-muted-foreground">Overall Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-border/50 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">76%</p>
                <p className="text-xs text-muted-foreground">Avg. Accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-border/50 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">21.5h</p>
                <p className="text-xs text-muted-foreground">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-border/50 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">45</p>
                <p className="text-xs text-muted-foreground">Quizzes Done</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Study Time */}
        <Card className="lg:col-span-2 glass border-border/50 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Weekly Study Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-48 gap-2">
              {weeklyData.map((day) => (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-primary/20 rounded-t-lg transition-all hover:bg-primary/30"
                    style={{ height: `${(day.hours / maxHours) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{day.day}</span>
                  <span className="text-xs font-medium text-foreground">{day.hours}h</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="glass border-border/50 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="w-5 h-5 text-secondary" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.title}
                  className={`flex flex-col items-center p-3 rounded-xl ${
                    achievement.earned ? "bg-primary/10" : "bg-muted opacity-50"
                  }`}
                >
                  <span className="text-2xl mb-1">{achievement.icon}</span>
                  <span className="text-xs text-center text-muted-foreground">{achievement.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Performance */}
      <Card className="glass border-border/50 rounded-2xl mt-6">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Subject Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="progress">
            <TabsList className="glass mb-6">
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            </TabsList>

            <TabsContent value="progress" className="space-y-4">
              {subjectProgress.map((subject) => (
                <div key={subject.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">{subject.name}</span>
                    <span className="text-primary font-medium">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              ))}
            </TabsContent>

            <TabsContent value="accuracy" className="space-y-4">
              {subjectProgress.map((subject) => (
                <div key={subject.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">{subject.name}</span>
                    <span className="text-secondary font-medium">{subject.accuracy}%</span>
                  </div>
                  <Progress value={subject.accuracy} className="h-2" />
                </div>
              ))}
            </TabsContent>

            <TabsContent value="quizzes" className="space-y-4">
              {subjectProgress.map((subject) => (
                <div key={subject.name} className="flex items-center justify-between p-3 bg-input rounded-xl">
                  <span className="text-foreground font-medium">{subject.name}</span>
                  <span className="text-primary font-bold">{subject.quizzes} quizzes</span>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
