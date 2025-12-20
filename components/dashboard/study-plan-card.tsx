import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, Brain } from "lucide-react"

interface StudyTask {
  id: string
  title: string
  subject: string
  type: "notes" | "quiz" | "practice"
  duration: string
  completed: boolean
}

const tasks: StudyTask[] = [
  {
    id: "1",
    title: "Organic Chemistry: Alcohols",
    subject: "Chemistry",
    type: "notes",
    duration: "30 min",
    completed: true,
  },
  { id: "2", title: "Cell Division Quiz", subject: "Biology", type: "quiz", duration: "15 min", completed: false },
  { id: "3", title: "Mechanics Problems", subject: "Physics", type: "practice", duration: "45 min", completed: false },
]

const typeIcons = {
  notes: BookOpen,
  quiz: Brain,
  practice: Clock,
}

export function StudyPlanCard() {
  return (
    <Card className="glass border-border/50 rounded-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          {"Today's Study Plan"}
          <Badge variant="secondary" className="font-normal">
            AI Generated
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.map((task) => {
          const Icon = typeIcons[task.type]
          return (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-3 rounded-xl ${
                task.completed ? "bg-primary/5 opacity-60" : "bg-input"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  task.completed ? "bg-primary/20" : "bg-muted"
                }`}
              >
                <Icon className={`w-5 h-5 ${task.completed ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium truncate ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}
                >
                  {task.title}
                </p>
                <p className="text-xs text-muted-foreground">{task.subject}</p>
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {task.duration}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
