import { AskAI } from "@/components/dashboard/ask-ai";
import { Bot } from "lucide-react";

export const metadata = {
  title: "Ask AI | AI Learn LK",
  description:
    "Upload PDFs or images and ask questions, generate quizzes, or create notes with AI assistance",
};

export default function AskAIPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 min-h-screen bg-background/50">
      {/* Header */}
      <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Bot className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Ask AI</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Transform your study materials into interactive learning experiences.
          Upload documents and start learning.
        </p>
      </div>

      <AskAI />
    </div>
  );
}
