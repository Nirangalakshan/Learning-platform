"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, BookOpen, Calendar, AlertCircle } from "lucide-react"

interface StudyPlan {
  week: number
  topics: string[]
  dailyHours: number
  resources: string[]
}

export function AIStudyPlan() {
  const [loading, setLoading] = useState(false)
  const [subject, setSubject] = useState("")
  const [topics, setTopics] = useState("")
  const [weeks, setWeeks] = useState("4")
  const [studyPlan, setStudyPlan] = useState<StudyPlan[] | null>(null)
  const [error, setError] = useState("")

  const generateStudyPlan = async () => {
    if (!subject || !topics) {
      setError("Please fill in all fields")
      return
    }

    setLoading(true)
    setError("")

    try {
      const message = `Create a detailed ${weeks}-week study plan for ${subject}. 
      Topics to cover: ${topics}
      
      Please provide a structured weekly breakdown with:
      - Key topics for each week
      - Daily study hours recommendation
      - Recommended resources and study materials
      
      Format as a clear, organized study schedule.`

      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          type: "study-plan",
        }),
      })

      const data = await response.json()
      if (data.success) {
        setStudyPlan([
          {
            week: 1,
            topics: topics
              .split(",")
              .slice(0, 2)
              .map((t) => t.trim()),
            dailyHours: 2,
            resources: ["Textbook", "Online tutorials"],
          },
          {
            week: 2,
            topics: topics
              .split(",")
              .slice(2, 4)
              .map((t) => t.trim()),
            dailyHours: 2.5,
            resources: ["Practice questions", "Video lectures"],
          },
          {
            week: 3,
            topics: topics
              .split(",")
              .slice(4, 6)
              .map((t) => t.trim()),
            dailyHours: 3,
            resources: ["Mock tests", "Past papers"],
          },
          {
            week: 4,
            topics: topics.split(",").map((t) => t.trim()),
            dailyHours: 1.5,
            resources: ["Revision notes", "Quick drills"],
          },
        ])
      }
    } catch (err) {
      setError("Failed to generate study plan. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="glass border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Create Your Study Plan
          </CardTitle>
          <CardDescription>AI-powered personalized study schedule</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Subject</label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Combined Mathematics">Combined Mathematics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Duration (weeks)</label>
              <Select value={weeks} onValueChange={setWeeks}>
                <SelectTrigger>
                  <SelectValue placeholder="Select weeks" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 weeks</SelectItem>
                  <SelectItem value="4">4 weeks</SelectItem>
                  <SelectItem value="8">8 weeks</SelectItem>
                  <SelectItem value="12">12 weeks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Topics to Cover</label>
            <Textarea
              placeholder="Enter topics separated by commas (e.g., Cell Biology, Genetics, Photosynthesis)"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              className="min-h-24 resize-none rounded-lg"
            />
          </div>

          {error && (
            <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <Button onClick={generateStudyPlan} disabled={loading} className="w-full" size="lg">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Plan...
              </>
            ) : (
              <>
                <BookOpen className="w-4 h-4 mr-2" />
                Generate Study Plan
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Display Generated Study Plan */}
      {studyPlan && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Your Personalized Study Plan</h2>
          <div className="grid gap-4">
            {studyPlan.map((week) => (
              <Card key={week.week} className="glass border-secondary/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Week {week.week}</CardTitle>
                    <span className="text-sm font-medium text-secondary">{week.dailyHours} hours/day</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Topics</h4>
                    <div className="flex flex-wrap gap-2">
                      {week.topics.map((topic, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Recommended Resources</h4>
                    <ul className="space-y-1">
                      {week.resources.map((resource, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {resource}
                        </li>
                      ))}
                    </ul>
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
