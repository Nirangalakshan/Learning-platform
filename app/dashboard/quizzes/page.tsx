import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Clock, Trophy, Zap, ChevronRight } from "lucide-react"

const quizzes = [
  {
    id: "1",
    title: "Cell Biology Fundamentals",
    subject: "Biology",
    questions: 20,
    duration: "15 min",
    difficulty: "Medium",
    completed: false,
  },
  {
    id: "2",
    title: "Organic Chemistry: Alcohols",
    subject: "Chemistry",
    questions: 15,
    duration: "12 min",
    difficulty: "Hard",
    completed: true,
    score: 85,
  },
  {
    id: "3",
    title: "Newton's Laws of Motion",
    subject: "Physics",
    questions: 25,
    duration: "20 min",
    difficulty: "Easy",
    completed: false,
  },
  {
    id: "4",
    title: "Differential Calculus",
    subject: "Combined Maths",
    questions: 18,
    duration: "25 min",
    difficulty: "Hard",
    completed: true,
    score: 72,
  },
]

const difficultyColors = {
  Easy: "bg-green-500/10 text-green-500",
  Medium: "bg-yellow-500/10 text-yellow-500",
  Hard: "bg-red-500/10 text-red-500",
}

export default function QuizzesPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Quizzes</h1>
        <p className="text-muted-foreground">Test your knowledge with adaptive quizzes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <Card className="glass border-border/50 rounded-2xl">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">48</p>
              <p className="text-xs text-muted-foreground">Total Quizzes</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-border/50 rounded-2xl">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">78%</p>
              <p className="text-xs text-muted-foreground">Avg. Score</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-border/50 rounded-2xl">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-border/50 rounded-2xl">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">5h</p>
              <p className="text-xs text-muted-foreground">Time Spent</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quizzes List */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="glass">
          <TabsTrigger value="all">All Quizzes</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="glass border-border/50 rounded-2xl hover:border-primary/50 transition-all">
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{quiz.title}</h3>
                      {quiz.completed && <Badge className="bg-primary/20 text-primary">Completed</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{quiz.subject}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Brain className="w-3 h-3" />
                        {quiz.questions} questions
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {quiz.duration}
                      </span>
                      <Badge className={difficultyColors[quiz.difficulty as keyof typeof difficultyColors]}>
                        {quiz.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {quiz.completed && quiz.score && (
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{quiz.score}%</p>
                        <p className="text-xs text-muted-foreground">Score</p>
                      </div>
                    )}
                    <Button
                      variant={quiz.completed ? "outline" : "default"}
                      className={quiz.completed ? "bg-transparent" : ""}
                    >
                      {quiz.completed ? "Retake" : "Start"}
                      <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {quizzes
            .filter((q) => !q.completed)
            .map((quiz) => (
              <Card key={quiz.id} className="glass border-border/50 rounded-2xl hover:border-primary/50 transition-all">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{quiz.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{quiz.subject}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{quiz.questions} questions</span>
                        <span>{quiz.duration}</span>
                      </div>
                    </div>
                    <Button>
                      Start Quiz
                      <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {quizzes
            .filter((q) => q.completed)
            .map((quiz) => (
              <Card key={quiz.id} className="glass border-border/50 rounded-2xl">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{quiz.title}</h3>
                      <p className="text-sm text-muted-foreground">{quiz.subject}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{quiz.score}%</p>
                      </div>
                      <Button variant="outline" className="bg-transparent">
                        Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
