"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, Download, Copy } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

const SUBJECTS_WITH_TOPICS = {
  Biology: ["Cell Biology", "Genetics", "Ecology", "Human Physiology"],
  Chemistry: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"],
  Physics: ["Mechanics", "Thermodynamics", "Waves", "Modern Physics"],
  "Combined Maths": ["Algebra", "Calculus", "Mechanics", "Statistics"],
}

const QUESTION_TYPES = [
  { value: "multiple-choice", label: "Multiple Choice" },
  { value: "short-answer", label: "Short Answer" },
  { value: "essay", label: "Essay" },
  { value: "fill-blank", label: "Fill in the Blanks" },
  { value: "true-false", label: "True/False" },
  { value: "mixed", label: "Mixed (All Types)" },
]
const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"]
const QUESTION_COUNTS = ["5", "10", "15", "20"]

type GeneratedQuiz = {
  id: string
  subject: string
  lessons: string[]
  isAllSyllabus: boolean
  questionType: string
  difficulty: string
  questionCount: number
  questions: Array<{
    id: string
    text: string
    type: string
    options?: string[]
    correctAnswer?: string
  }>
  generatedAt: string
}

export function AIQuizGenerator() {
  const [subject, setSubject] = useState("")
  const [selectedLessons, setSelectedLessons] = useState<string[]>([])
  const [isAllSyllabus, setIsAllSyllabus] = useState(false)
  const [questionType, setQuestionType] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [questionCount, setQuestionCount] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedQuiz, setGeneratedQuiz] = useState<GeneratedQuiz | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [savedQuizzes, setSavedQuizzes] = useState<GeneratedQuiz[]>([])

  const handleLessonToggle = (lesson: string) => {
    if (isAllSyllabus) return

    setSelectedLessons((prev) => (prev.includes(lesson) ? prev.filter((l) => l !== lesson) : [...prev, lesson]))
  }

  const handleAllSyllabusToggle = () => {
    setIsAllSyllabus(!isAllSyllabus)
    if (!isAllSyllabus) {
      setSelectedLessons([])
    }
  }

  const handleGenerateQuiz = async () => {
    if (!subject || !questionType || !difficulty || !questionCount) {
      alert("Please select all options")
      return
    }

    if (!isAllSyllabus && selectedLessons.length === 0) {
      alert("Please select lessons or choose 'All Syllabus'")
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch("/api/ai/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          lessons: isAllSyllabus ? [] : selectedLessons,
          isAllSyllabus,
          questionType,
          difficulty,
          questionCount: Number.parseInt(questionCount),
        }),
      })

      if (!response.ok) throw new Error("Failed to generate quiz")

      const data = await response.json()
      const newQuiz: GeneratedQuiz = {
        id: Date.now().toString(),
        subject,
        lessons: isAllSyllabus ? [] : selectedLessons,
        isAllSyllabus,
        questionType,
        difficulty,
        questionCount: Number.parseInt(questionCount),
        questions: data.questions || [],
        generatedAt: new Date().toLocaleDateString(),
      }

      setGeneratedQuiz(newQuiz)
      setSavedQuizzes([...savedQuizzes, newQuiz])
      setShowDialog(true)
    } catch (error) {
      console.error("Error generating quiz:", error)
      alert("Failed to generate quiz. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopyQuiz = () => {
    if (!generatedQuiz) return
    const quizText = generatedQuiz.questions.map((q, i) => `Q${i + 1}: ${q.text}`).join("\n\n")
    navigator.clipboard.writeText(quizText)
    alert("Quiz copied to clipboard!")
  }

  const handleDownloadQuiz = () => {
    if (!generatedQuiz) return
    const quizContent = `${generatedQuiz.subject} - ${generatedQuiz.questionType} Quiz
Difficulty: ${generatedQuiz.difficulty}
Scope: ${generatedQuiz.isAllSyllabus ? "All Syllabus" : generatedQuiz.lessons.join(", ")}
Generated: ${generatedQuiz.generatedAt}
---

${generatedQuiz.questions
  .map(
    (q, i) =>
      `Q${i + 1}: ${q.text}
${q.options ? q.options.map((opt) => `  - ${opt}`).join("\n") : ""}`,
  )
  .join("\n\n")}`

    const blob = new Blob([quizContent], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${generatedQuiz.subject}_${generatedQuiz.questionType}_quiz.txt`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  const availableLessons = subject ? SUBJECTS_WITH_TOPICS[subject as keyof typeof SUBJECTS_WITH_TOPICS] : []

  return (
    <div className="space-y-6">
      {/* Generator Card */}
      <Card className="glass border-border/50 rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Quiz Generator
          </CardTitle>
          <CardDescription>
            Create customized quizzes using AI based on subject, lessons, and question type
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Subject Selection */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Subject</label>
              <Select
                value={subject}
                onValueChange={(value) => {
                  setSubject(value)
                  setSelectedLessons([])
                  setIsAllSyllabus(false)
                }}
              >
                <SelectTrigger className="bg-background border-border/50">
                  <SelectValue placeholder="Select subject..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(SUBJECTS_WITH_TOPICS).map((subj) => (
                    <SelectItem key={subj} value={subj}>
                      {subj}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Question Type Selection */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Question Type</label>
              <Select value={questionType} onValueChange={setQuestionType}>
                <SelectTrigger className="bg-background border-border/50">
                  <SelectValue placeholder="Select question type..." />
                </SelectTrigger>
                <SelectContent>
                  {QUESTION_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Difficulty Selection */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Difficulty</label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="bg-background border-border/50">
                  <SelectValue placeholder="Select difficulty..." />
                </SelectTrigger>
                <SelectContent>
                  {DIFFICULTY_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Question Count Selection */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Number of Questions</label>
              <Select value={questionCount} onValueChange={setQuestionCount}>
                <SelectTrigger className="bg-background border-border/50">
                  <SelectValue placeholder="Select count..." />
                </SelectTrigger>
                <SelectContent>
                  {QUESTION_COUNTS.map((count) => (
                    <SelectItem key={count} value={count}>
                      {count} Questions
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {subject && (
            <div className="space-y-3 p-4 bg-background/50 rounded-lg border border-border/50">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Select Lessons</label>
                <div className="flex items-center gap-2">
                  <Checkbox id="all-syllabus" checked={isAllSyllabus} onCheckedChange={handleAllSyllabusToggle} />
                  <label htmlFor="all-syllabus" className="text-sm font-medium cursor-pointer">
                    All Syllabus
                  </label>
                </div>
              </div>

              {!isAllSyllabus && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableLessons.map((lesson) => (
                    <div key={lesson} className="flex items-center gap-2">
                      <Checkbox
                        id={lesson}
                        checked={selectedLessons.includes(lesson)}
                        onCheckedChange={() => handleLessonToggle(lesson)}
                      />
                      <label
                        htmlFor={lesson}
                        className="text-sm cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {lesson}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {isAllSyllabus && (
                <p className="text-xs text-muted-foreground italic">Quiz will cover all lessons from {subject}</p>
              )}
            </div>
          )}

          {/* Generate Button */}
          <Button
            onClick={handleGenerateQuiz}
            disabled={
              isGenerating ||
              !subject ||
              !questionType ||
              !difficulty ||
              !questionCount ||
              (!isAllSyllabus && selectedLessons.length === 0)
            }
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Quiz...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Quiz with AI
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Quizzes History */}
      {savedQuizzes.length > 0 && (
        <Card className="glass border-border/50 rounded-2xl">
          <CardHeader>
            <CardTitle>Generated Quizzes</CardTitle>
            <CardDescription>View and manage your AI-generated quizzes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {savedQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50 hover:border-primary/50 transition-all"
              >
                <div>
                  <p className="font-medium text-foreground">{quiz.subject}</p>
                  <p className="text-xs text-muted-foreground">
                    {quiz.questionCount} {quiz.questionType} questions • {quiz.difficulty}
                  </p>
                  <p className="text-xs text-primary/80 mt-1">
                    {quiz.isAllSyllabus ? "All Syllabus" : quiz.lessons.join(", ")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{quiz.generatedAt}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setGeneratedQuiz(quiz)
                      setShowDialog(true)
                    }}
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Preview Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{generatedQuiz?.subject} Quiz</DialogTitle>
            <DialogDescription>
              {generatedQuiz?.questionCount} {generatedQuiz?.questionType} questions • {generatedQuiz?.difficulty} level
              {generatedQuiz && (
                <div className="mt-2 text-xs text-muted-foreground">
                  {generatedQuiz.isAllSyllabus ? "All Syllabus" : generatedQuiz.lessons.join(", ")}
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          {generatedQuiz && (
            <div className="space-y-6">
              {/* Questions */}
              <div className="space-y-4">
                {generatedQuiz.questions.map((question, idx) => (
                  <div key={question.id} className="p-4 bg-background/50 rounded-lg border border-border/50">
                    <p className="font-medium text-foreground mb-3">
                      Q{idx + 1}: {question.text}
                    </p>
                    {question.options && (
                      <div className="space-y-2 ml-4">
                        {question.options.map((option, optIdx) => (
                          <p
                            key={optIdx}
                            className={`text-sm ${
                              option === question.correctAnswer ? "text-primary font-medium" : "text-muted-foreground"
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}) {option}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-border/50">
                <Button onClick={handleCopyQuiz} variant="outline" className="flex-1 bg-transparent">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button onClick={handleDownloadQuiz} variant="outline" className="flex-1 bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
