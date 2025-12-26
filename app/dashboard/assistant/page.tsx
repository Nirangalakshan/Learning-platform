import { AIStudyPlan } from "@/components/dashboard/ai-study-plan";
import { AINotesgenerator } from "@/components/dashboard/ai-notes-generator";
import { AssistantHistory } from "@/components/dashboard/assistant-history";
import { Sparkles, History, PenTool } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {
  title: "AI Assistant | AI Learn LK",
  description:
    "Generate study plans, get AI suggestions, and create short notes with AI assistance",
};

export default function AIAssistantPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-foreground">AI Assistant</h1>
        </div>
        <p className="text-muted-foreground">
          Get personalized study suggestions, generate study plans, and create
          short revision notes powered by AI
        </p>
      </div>

      <Tabs defaultValue="generate" className="space-y-6">
        <TabsList className="bg-background border border-border/50">
          <TabsTrigger value="generate" className="gap-2">
            <PenTool className="w-4 h-4" />
            Generator
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History className="w-4 h-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="generate"
          className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-2 duration-500"
        >
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
        </TabsContent>

        <TabsContent
          value="history"
          className="animate-in fade-in-50 slide-in-from-bottom-2 duration-500"
        >
          <AssistantHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
