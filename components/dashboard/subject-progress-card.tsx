import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface SubjectProgressCardProps {
  name: string
  emoji: string
  progress: number
  chapters: number
  completedChapters: number
}

export function SubjectProgressCard({ name, emoji, progress, chapters, completedChapters }: SubjectProgressCardProps) {
  return (
    <Card className="glass border-border/50 rounded-2xl hover:border-primary/50 transition-colors cursor-pointer">
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <div className="text-3xl">{emoji}</div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{name}</h3>
            <p className="text-xs text-muted-foreground">
              {completedChapters}/{chapters} chapters
            </p>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-primary">{progress}%</span>
          </div>
        </div>
        <Progress value={progress} className="mt-3 h-2" />
      </CardContent>
    </Card>
  )
}
