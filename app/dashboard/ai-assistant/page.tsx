import { AISidebarWidget } from "@/components/dashboard/ai-sidebar-widget"
import { AIStudyPlan } from "@/components/dashboard/ai-study-plan"
import { AINotesgenerator } from "@/components/dashboard/ai-notes-generator"
import { Sparkles } from "lucide-react"

export const metadata = {
  title: "AI Assistant | AI Learn LK",
  description: "Generate study plans, get AI suggestions, and create short notes with AI assistance",
}

export default function AIAssistantPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">AI Assistant</h1>
        </div>
        <p className="text-muted-foreground">
          Get personalized study suggestions, generate study plans, and create short revision notes powered by AI
        </p>
      </div>

      {/* AI Quick Assistant Widget */}
      <div className="mb-8 max-w-2xl">
        <AISidebarWidget />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8">
        {/* Study Plan Generator */}
        <div>
          <AIStudyPlan />
        </div>

        {/* Notes Generator */}
        <div>
          <AINotesgenerator />
        </div>
      </div>
    </div>
  )
}
