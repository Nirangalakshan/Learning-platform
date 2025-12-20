"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, ArrowLeft, Check } from "lucide-react"

const subjects = [
  { id: "biology", name: "Biology", emoji: "🧬" },
  { id: "chemistry", name: "Chemistry", emoji: "🧪" },
  { id: "physics", name: "Physics", emoji: "⚛️" },
  { id: "maths", name: "Combined Maths", emoji: "🔢" },
]

const examYears = ["2025", "2026", "2027"]

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState("")
  const router = useRouter()

  const toggleSubject = (id: string) => {
    setSelectedSubjects((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/dashboard")
  }

  const progress = step === 1 ? 50 : 100

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Sidebar */}
      <div className="hidden lg:flex w-96 flex-col p-8 glass border-r border-border/50">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-12">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">AI</span>
          </div>
          <span className="font-semibold text-xl text-foreground">
            Learn LK <span className="text-base">🇱🇰</span>
          </span>
        </Link>

        {/* Feature Highlights */}
        <div className="flex-1 space-y-6">
          <h2 className="text-xl font-semibold text-foreground">Start Your Journey</h2>

          <div className="space-y-4">
            {[
              { title: "AI-Powered Notes", desc: "Get concise notes tailored to your syllabus" },
              { title: "Adaptive Learning", desc: "Quizzes that adapt to your pace" },
              { title: "15 Years Past Papers", desc: "Complete archive with solutions" },
              { title: "Smart Study Plans", desc: "Personalized schedules for your exam" },
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground text-sm">{feature.title}</div>
                  <div className="text-xs text-muted-foreground">{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-lg">
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">AI</span>
            </div>
            <span className="font-semibold text-xl text-foreground">
              Learn LK <span className="text-base">🇱🇰</span>
            </span>
          </Link>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Step {step} of 2</span>
              <span className="text-sm text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step 1: Account Details */}
          {step === 1 && (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-foreground">Create Account</h1>
                <p className="text-muted-foreground">Enter your details to get started</p>
              </div>

              <Card className="glass border-border/50 rounded-2xl">
                <CardContent className="p-6">
                  <form className="space-y-5">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input placeholder="Your name" className="pl-10 py-5 rounded-xl bg-input border-border/50" />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10 py-5 rounded-xl bg-input border-border/50"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 py-5 rounded-xl bg-input border-border/50"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <Button type="button" onClick={() => setStep(2)} className="w-full py-5 text-base font-medium">
                      Continue
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </form>

                  {/* Sign In Link (Mobile) */}
                  <p className="lg:hidden text-center text-sm text-muted-foreground mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline font-medium">
                      Sign in
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </>
          )}

          {/* Step 2: Personalization */}
          {step === 2 && (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-foreground">Personalize Your Experience</h1>
                <p className="text-muted-foreground">Help us customize your learning journey</p>
              </div>

              <Card className="glass border-border/50 rounded-2xl">
                <CardContent className="p-6">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Select Subjects */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-foreground">Select Your Subjects</label>
                      <div className="grid grid-cols-2 gap-3">
                        {subjects.map((subject) => (
                          <button
                            key={subject.id}
                            type="button"
                            onClick={() => toggleSubject(subject.id)}
                            className={`p-4 rounded-xl border text-left transition-all ${
                              selectedSubjects.includes(subject.id)
                                ? "border-primary bg-primary/10"
                                : "border-border/50 bg-input hover:border-primary/50"
                            }`}
                          >
                            <span className="text-2xl mb-2 block">{subject.emoji}</span>
                            <span className="text-sm font-medium text-foreground">{subject.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Exam Year */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-foreground">Exam Year</label>
                      <div className="flex gap-3">
                        {examYears.map((year) => (
                          <button
                            key={year}
                            type="button"
                            onClick={() => setSelectedYear(year)}
                            className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${
                              selectedYear === year
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border/50 bg-input text-foreground hover:border-primary/50"
                            }`}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* District (Optional) */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        District <Badge variant="secondary">Optional</Badge>
                      </label>
                      <Input placeholder="e.g., Colombo" className="py-5 rounded-xl bg-input border-border/50" />
                    </div>

                    {/* Action Buttons - Removed glow-green class */}
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="py-5 px-6 bg-transparent"
                      >
                        <ArrowLeft className="mr-2 w-5 h-5" />
                        Back
                      </Button>
                      <Button type="submit" className="flex-1 py-5 text-base font-medium">
                        Create Account
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
