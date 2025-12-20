import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, ChevronRight } from "lucide-react"

const subjects = [
  {
    id: "biology",
    name: "Biology",
    emoji: "🧬",
    progress: 68,
    chapters: 24,
    completedChapters: 16,
    description: "Explore life sciences from cells to ecosystems",
    topics: ["Cell Biology", "Genetics", "Ecology", "Human Physiology"],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    emoji: "🧪",
    progress: 45,
    chapters: 20,
    completedChapters: 9,
    description: "Master organic, inorganic, and physical chemistry",
    topics: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"],
  },
  {
    id: "physics",
    name: "Physics",
    emoji: "⚛️",
    progress: 52,
    chapters: 18,
    completedChapters: 9,
    description: "Understand mechanics, waves, and modern physics",
    topics: ["Mechanics", "Thermodynamics", "Waves", "Modern Physics"],
  },
  {
    id: "maths",
    name: "Combined Maths",
    emoji: "🔢",
    progress: 35,
    chapters: 22,
    completedChapters: 8,
    description: "Excel in pure and applied mathematics",
    topics: ["Algebra", "Calculus", "Mechanics", "Statistics"],
  },
]

export default function SubjectsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Subjects</h1>
        <p className="text-muted-foreground">Browse and study your A/L Science subjects</p>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((subject) => (
          <Card
            key={subject.id}
            className="glass border-border/50 rounded-2xl hover:border-primary/50 transition-all group"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{subject.emoji}</div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">{subject.name}</h2>
                    <p className="text-sm text-muted-foreground">{subject.description}</p>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">
                    {subject.completedChapters}/{subject.chapters} chapters
                  </span>
                  <span className="font-medium text-primary">{subject.progress}%</span>
                </div>
                <Progress value={subject.progress} className="h-2" />
              </div>

              {/* Topics */}
              <div className="flex flex-wrap gap-2 mb-4">
                {subject.topics.map((topic) => (
                  <Badge key={topic} variant="secondary" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>

              {/* Action */}
              <Button className="w-full transition-all">
                <BookOpen className="mr-2 w-4 h-4" />
                Continue Learning
                <ChevronRight className="ml-auto w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
