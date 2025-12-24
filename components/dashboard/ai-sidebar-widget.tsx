"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, BookOpen, Brain, Loader2 } from "lucide-react"

export function AISidebarWidget() {
  const [activeTab, setActiveTab] = useState("suggestions")
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")

  const generateAIContent = async (type: string) => {
    if (!input.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          type,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setResult(data.data.message || JSON.stringify(data.data))
      }
    } catch (error) {
      console.error("Error:", error)
      setResult("Failed to generate content. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <Card className="glass border-primary/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="suggestions" className="text-xs">
                <Brain className="w-4 h-4 mr-1" />
                Suggestions
              </TabsTrigger>
              <TabsTrigger value="study-plan" className="text-xs">
                <BookOpen className="w-4 h-4 mr-1" />
                Study Plan
              </TabsTrigger>
              <TabsTrigger value="notes" className="text-xs">
                <Sparkles className="w-4 h-4 mr-1" />
                Notes
              </TabsTrigger>
            </TabsList>

            {/* AI Suggestions Tab */}
            <TabsContent value="suggestions" className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Ask for study suggestions</label>
                <Input
                  placeholder="e.g., Help me understand photosynthesis"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="rounded-lg"
                />
              </div>
              <Button
                onClick={() => generateAIContent("suggestions")}
                disabled={loading || !input.trim()}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Get Suggestions
                  </>
                )}
              </Button>
              {result && <div className="p-3 bg-secondary/10 rounded-lg text-sm text-foreground">{result}</div>}
            </TabsContent>

            {/* Study Plan Tab */}
            <TabsContent value="study-plan" className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Topics to study</label>
                <Textarea
                  placeholder="Enter topics you want to study..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-20 rounded-lg resize-none"
                />
              </div>
              <Button
                onClick={() => generateAIContent("study-plan")}
                disabled={loading || !input.trim()}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Generate Plan
                  </>
                )}
              </Button>
              {result && (
                <div className="p-3 bg-secondary/10 rounded-lg text-sm text-foreground whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {result}
                </div>
              )}
            </TabsContent>

            {/* Short Notes Tab */}
            <TabsContent value="notes" className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Topic for short notes</label>
                <Input
                  placeholder="e.g., Cell Division, Chemical Bonding"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="rounded-lg"
                />
              </div>
              <Button onClick={() => generateAIContent("notes")} disabled={loading || !input.trim()} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Notes
                  </>
                )}
              </Button>
              {result && (
                <div className="p-3 bg-secondary/10 rounded-lg text-sm text-foreground whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {result}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
