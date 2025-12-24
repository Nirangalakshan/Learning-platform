"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, FileText, Copy, Download, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Note {
  id: string
  topic: string
  content: string
  createdAt: Date
}

export function AINotesgenerator() {
  const [loading, setLoading] = useState(false)
  const [topic, setTopic] = useState("")
  const [notes, setNotes] = useState<Note[]>([])
  const [error, setError] = useState("")
  const { toast } = useToast()

  const generateNotes = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic")
      return
    }

    setLoading(true)
    setError("")

    try {
      const message = `Create comprehensive but concise short notes for the topic: "${topic}"
      
      Please provide:
      1. Key definitions and concepts
      2. Main points and summary
      3. Important formulas/equations (if applicable)
      4. Quick memorization tips
      5. Common misconceptions to avoid
      
      Format as clear, bullet-pointed notes suitable for quick revision.`

      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          type: "notes",
        }),
      })

      const data = await response.json()
      if (data.success) {
        const newNote: Note = {
          id: Date.now().toString(),
          topic,
          content: data.data.message || JSON.stringify(data.data),
          createdAt: new Date(),
        }
        setNotes([newNote, ...notes])
        setTopic("")
        toast({
          title: "Success",
          description: "Short notes generated successfully!",
        })
      }
    } catch (err) {
      setError("Failed to generate notes. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied",
      description: "Notes copied to clipboard!",
    })
  }

  const downloadNotes = (note: Note) => {
    const element = document.createElement("a")
    const file = new Blob([note.content], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${note.topic.replace(/\s+/g, "_")}_notes.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-6">
      <Card className="glass border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Generate Short Notes
          </CardTitle>
          <CardDescription>Create quick revision notes for any topic</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Topic</label>
            <Input
              placeholder="e.g., Photosynthesis, Ionic Bonding, Projectile Motion"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && generateNotes()}
              className="rounded-lg"
            />
          </div>

          {error && (
            <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <Button onClick={generateNotes} disabled={loading} className="w-full" size="lg">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Generate Notes
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Display Generated Notes */}
      {notes.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Generated Notes</h2>
          <div className="space-y-4">
            {notes.map((note) => (
              <Card key={note.id} className="glass border-secondary/30">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{note.topic}</CardTitle>
                      <CardDescription className="text-xs">
                        Generated {note.createdAt.toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(note.content)}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadNotes(note)}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{note.content}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
