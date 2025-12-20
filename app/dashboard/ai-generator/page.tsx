import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Sparkles, Wand2, FileText, Clock, Brain, Settings2 } from "lucide-react"

const recentPapers = [
  {
    id: "1",
    title: "Biology Mock Paper - Genetics Focus",
    created: "2 hours ago",
    questions: 40,
    difficulty: "Medium",
  },
  {
    id: "2",
    title: "Chemistry Full Paper - Organic",
    created: "Yesterday",
    questions: 50,
    difficulty: "Hard",
  },
  {
    id: "3",
    title: "Physics Quick Quiz - Mechanics",
    created: "3 days ago",
    questions: 20,
    difficulty: "Easy",
  },
]

export default function AIGeneratorPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">AI Paper Generator</h1>
        <p className="text-muted-foreground">Generate custom mock papers using AI based on exam patterns</p>
      </div>

      {/* Generator Card */}
      <Card className="glass border-primary/30 rounded-2xl mb-8 glow-green">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Generate New Paper</h2>
              <p className="text-sm text-muted-foreground">AI will create questions based on your preferences</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Subject Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Select Subject</label>
              <div className="grid grid-cols-2 gap-3">
                {["Biology 🧬", "Chemistry 🧪", "Physics ⚛️", "Maths 🔢"].map((subject) => (
                  <Button key={subject} variant="outline" className="h-12 bg-transparent hover:bg-primary/10">
                    {subject}
                  </Button>
                ))}
              </div>
            </div>

            {/* Topics */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Focus Topics (Optional)</label>
              <Input
                placeholder="e.g., Genetics, Cell Biology..."
                className="py-5 rounded-xl bg-input border-border/50"
              />
            </div>

            {/* Question Count */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Number of Questions</label>
              <div className="flex gap-3">
                {[20, 30, 40, 50].map((count) => (
                  <Button key={count} variant="outline" className="flex-1 bg-transparent hover:bg-primary/10">
                    {count}
                  </Button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Difficulty Level</label>
              <div className="flex gap-3">
                {["Easy", "Medium", "Hard", "Mixed"].map((level) => (
                  <Button key={level} variant="outline" className="flex-1 bg-transparent hover:bg-primary/10">
                    {level}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Advanced Settings Toggle */}
          <Button variant="ghost" className="mb-6 text-muted-foreground">
            <Settings2 className="w-4 h-4 mr-2" />
            Advanced Settings
          </Button>

          {/* Generate Button */}
          <Button size="lg" className="w-full py-6 glow-green text-base font-medium">
            <Wand2 className="mr-2 w-5 h-5" />
            Generate Paper
          </Button>
        </CardContent>
      </Card>

      {/* Recent Papers */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Recently Generated</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentPapers.map((paper) => (
            <Card key={paper.id} className="glass border-border/50 rounded-2xl hover:border-primary/50 transition-all">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <Badge variant="secondary">{paper.difficulty}</Badge>
                </div>
                <h3 className="font-medium text-foreground mb-2 line-clamp-2">{paper.title}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Brain className="w-3 h-3" />
                    {paper.questions} questions
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {paper.created}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    View
                  </Button>
                  <Button size="sm" className="flex-1">
                    Start
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
