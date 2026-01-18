"use client";

import { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PenTool,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  BookOpen,
  ArrowRight,
  Loader2,
  RefreshCw,
  GraduationCap,
  MessageSquare,
  Play,
  RotateCcw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { WhiteboardCanvas } from "./whiteboard-canvas";

const SUBJECTS = [
  { value: "mathematics", label: "Mathematics", icon: "📐" },
  { value: "physics", label: "Physics", icon: "⚡" },
  { value: "chemistry", label: "Chemistry", icon: "🧪" },
  { value: "biology", label: "Biology", icon: "🧬" },
  { value: "accounting", label: "Accounting", icon: "📊" },
  { value: "economics", label: "Economics", icon: "📈" },
  { value: "ict", label: "ICT", icon: "💻" },
  { value: "general", label: "General", icon: "📚" },
];

const SAMPLE_QUESTIONS = {
  mathematics: [
    "Solve for x: 2x² + 5x - 3 = 0",
    "Find the derivative of f(x) = x³ + 2x² - 5x + 7",
    "Integrate: ∫(3x² + 2x + 1)dx",
    "Find the sum of the first 20 terms of AP: 3, 7, 11, 15...",
  ],
  physics: [
    "A ball is thrown vertically upward with velocity 20 m/s. Find the maximum height.",
    "Calculate the current through a 10Ω resistor connected to a 12V battery.",
    "A car accelerates from rest at 2 m/s². Find its velocity after 5 seconds.",
    "Calculate the work done in lifting a 5kg mass through 2m.",
  ],
  chemistry: [
    "Balance the equation: Fe + O₂ → Fe₂O₃",
    "Calculate the molar mass of H₂SO₄",
    "Write the electron configuration of Iron (Fe)",
    "Name the product formed when ethanol reacts with sodium.",
  ],
  biology: [
    "Draw and label the structure of a mitochondrion",
    "Explain the process of photosynthesis",
    "List the stages of mitosis",
    "Describe the structure of DNA",
  ],
  accounting: [
    "What is the accounting equation?",
    "Prepare a trial balance from the given ledger balances",
    "Calculate depreciation using straight-line method",
    "Explain the difference between debit and credit",
  ],
  economics: [
    "Define the law of demand",
    "Explain price elasticity of demand",
    "What are the factors affecting supply?",
    "Calculate GDP using the expenditure method",
  ],
  ict: [
    "What is the difference between RAM and ROM?",
    "Explain the OSI model layers",
    "Write a simple algorithm for bubble sort",
    "What is normalization in databases?",
  ],
  general: [
    "Solve: 15 × 24 ÷ 6 + 8",
    "Write the formula for calculating compound interest",
    "Explain Newton's First Law of Motion",
    "What is the chemical formula for water?",
  ],
};

interface AIFeedback {
  response: string;
  mode: "check" | "hint" | "explain";
  timestamp: Date;
}

type AnswerMode = "whiteboard" | "text";
type Step = "setup" | "answer";

export function LiveLearning() {
  const { toast } = useToast();

  // Setup state
  const [step, setStep] = useState<Step>("setup");
  const [subject, setSubject] = useState("");
  const [lesson, setLesson] = useState("");
  const [question, setQuestion] = useState("");
  const [customQuestion, setCustomQuestion] = useState("");

  // Answer state
  const [answerMode, setAnswerMode] = useState<AnswerMode>("whiteboard");
  const [textAnswer, setTextAnswer] = useState("");
  const [canvasData, setCanvasData] = useState<string | null>(null);

  // AI state
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);
  const [loadingMode, setLoadingMode] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<AIFeedback | null>(null);

  // Session tracking
  const [sessionQuestions, setSessionQuestions] = useState<string[]>([]);

  const handleCanvasChange = useCallback((dataUrl: string) => {
    setCanvasData(dataUrl);
  }, []);

  const generateAIQuestion = async () => {
    setIsGeneratingQuestion(true);
    try {
      const response = await fetch("/api/ai/generate-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: SUBJECTS.find((s) => s.value === subject)?.label || subject,
          topic: lesson,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate question");
      }

      return data.question;
    } catch (error: any) {
      console.error("Question generation error:", error);
      toast({
        title: "Generation Failed",
        description:
          "Could not generate a question. Using a sample question instead.",
        variant: "destructive",
      });
      // Fallback to sample question
      const questions =
        SAMPLE_QUESTIONS[subject as keyof typeof SAMPLE_QUESTIONS] ||
        SAMPLE_QUESTIONS.general;
      return questions[Math.floor(Math.random() * questions.length)];
    } finally {
      setIsGeneratingQuestion(false);
    }
  };

  const startLearning = async () => {
    if (!subject) {
      toast({
        title: "Subject Required",
        description: "Please select a subject to continue.",
        variant: "destructive",
      });
      return;
    }

    let finalQuestion = customQuestion.trim();

    if (!finalQuestion) {
      finalQuestion = await generateAIQuestion();
    }

    setQuestion(finalQuestion);
    setStep("answer");
    setFeedback(null);
  };

  const analyzeAnswer = async (mode: "check" | "hint" | "explain") => {
    if (!question.trim()) {
      toast({
        title: "Question Required",
        description: "Please start a learning session first.",
        variant: "destructive",
      });
      return;
    }

    // For check mode, require an answer
    if (mode === "check") {
      if (answerMode === "whiteboard" && !canvasData) {
        toast({
          title: "Draw Your Answer",
          description: "Please write your answer on the whiteboard first.",
          variant: "destructive",
        });
        return;
      }
      if (answerMode === "text" && !textAnswer.trim()) {
        toast({
          title: "Type Your Answer",
          description: "Please type your answer first.",
          variant: "destructive",
        });
        return;
      }
    }

    setIsLoading(true);
    setLoadingMode(mode);

    try {
      const response = await fetch("/api/ai/whiteboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          canvasImage: answerMode === "whiteboard" ? canvasData : null,
          textAnswer: answerMode === "text" ? textAnswer : null,
          question,
          subject: SUBJECTS.find((s) => s.value === subject)?.label || subject,
          topic: lesson,
          mode,
          answerMode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze");
      }

      setFeedback({
        response: data.data.response,
        mode,
        timestamp: new Date(),
      });

      // Track question in session
      if (!sessionQuestions.includes(question)) {
        setSessionQuestions((prev) => [...prev, question]);
      }

      toast({
        title:
          mode === "check"
            ? "Analysis Complete!"
            : mode === "hint"
              ? "Hint Ready!"
              : "Solution Ready!",
        description: "Check the feedback panel for details.",
      });
    } catch (error: any) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setLoadingMode(null);
    }
  };

  const handleNextQuestion = async () => {
    const newQuestion = await generateAIQuestion();
    setQuestion(newQuestion);
    setFeedback(null);
    setCanvasData(null);
    setTextAnswer("");
  };

  const resetSession = () => {
    setStep("setup");
    setQuestion("");
    setCustomQuestion("");
    setFeedback(null);
    setCanvasData(null);
    setTextAnswer("");
  };

  const selectedSubject = SUBJECTS.find((s) => s.value === subject);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
            <PenTool className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Live Learning with AI
            </h1>
            <p className="text-muted-foreground">
              {step === "setup"
                ? "Select your subject and start practicing"
                : "Answer the question and get AI feedback"}
            </p>
          </div>
        </div>

        {/* Session Stats */}
        {sessionQuestions.length > 0 && (
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {sessionQuestions.length} Questions Practiced
          </Badge>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {step === "setup" ? (
          /* ===== SETUP STEP ===== */
          <motion.div
            key="setup"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <Card className="border-border/50 max-w-2xl mx-auto">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl flex items-center justify-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Start Your Learning Session
                </CardTitle>
                <CardDescription>
                  Choose your subject and optionally enter a specific question
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                {/* Subject Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject *</label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUBJECTS.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          <span className="flex items-center gap-2">
                            <span className="text-lg">{s.icon}</span>
                            <span>{s.label}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Lesson/Topic */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Lesson / Topic (Optional)
                  </label>
                  <Input
                    placeholder="e.g., Quadratic Equations, Thermodynamics, Photosynthesis..."
                    value={lesson}
                    onChange={(e) => setLesson(e.target.value)}
                    className="h-12"
                  />
                </div>

                {/* Custom Question */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      Question (Optional)
                    </label>
                    <span className="text-xs text-muted-foreground">
                      Leave empty for a random question
                    </span>
                  </div>
                  <Input
                    placeholder="Enter a specific question or leave empty to get a random one..."
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    className="h-12"
                  />
                </div>

                {/* Start Button */}
                <Button
                  onClick={startLearning}
                  disabled={!subject || isGeneratingQuestion}
                  className="w-full h-12 text-base bg-linear-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
                >
                  {isGeneratingQuestion ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <Play className="w-5 h-5 mr-2" />
                  )}
                  {isGeneratingQuestion
                    ? "Generating Question..."
                    : "Start Learning"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          /* ===== ANSWER STEP ===== */
          <motion.div
            key="answer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {/* Question Display - Full Width */}
            <Card className="border-2 border-primary/20 bg-linear-to-r from-primary/5 to-violet-500/5">
              <CardContent className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {selectedSubject?.icon} {selectedSubject?.label}
                      </Badge>
                      {lesson && (
                        <Badge variant="outline" className="text-xs">
                          {lesson}
                        </Badge>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold text-foreground leading-relaxed">
                      {question}
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextQuestion}
                      disabled={isGeneratingQuestion}
                      className="shrink-0"
                    >
                      {isGeneratingQuestion ? (
                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                      ) : (
                        <RefreshCw className="w-4 h-4 mr-1" />
                      )}
                      New Question
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetSession}
                      className="shrink-0"
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Answer Section - Full Width */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">
                    Your Answer
                  </CardTitle>
                  <Tabs
                    value={answerMode}
                    onValueChange={(v) => setAnswerMode(v as AnswerMode)}
                  >
                    <TabsList className="h-9">
                      <TabsTrigger value="whiteboard" className="text-xs px-3">
                        <PenTool className="w-3.5 h-3.5 mr-1.5" />
                        Whiteboard
                      </TabsTrigger>
                      <TabsTrigger value="text" className="text-xs px-3">
                        <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                        Text Answer
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {answerMode === "whiteboard" ? (
                    <motion.div
                      key="whiteboard"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <WhiteboardCanvas
                        onCanvasChange={handleCanvasChange}
                        fullWidth={true}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="text"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Textarea
                        placeholder="Type your answer here... You can use mathematical notation like x², √, ∫, etc."
                        value={textAnswer}
                        onChange={(e) => setTextAnswer(e.target.value)}
                        rows={10}
                        className="resize-none text-base font-mono"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Tip: Use text like "x^2" for x², "sqrt(x)" for √x, etc.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* AI Actions - Full Width */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => analyzeAnswer("check")}
                disabled={isLoading}
                className="flex-1 min-w-[200px] h-12 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                {loadingMode === "check" ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                )}
                Check My Answer
              </Button>
              <Button
                onClick={() => analyzeAnswer("hint")}
                disabled={isLoading}
                variant="outline"
                className="flex-1 min-w-[150px] h-12"
              >
                {loadingMode === "hint" ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Lightbulb className="w-5 h-5 mr-2 text-amber-500" />
                )}
                Get a Hint
              </Button>
              <Button
                onClick={() => analyzeAnswer("explain")}
                disabled={isLoading}
                variant="outline"
                className="flex-1 min-w-[150px] h-12"
              >
                {loadingMode === "explain" ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                )}
                Show Solution
              </Button>
              <Button
                onClick={handleNextQuestion}
                variant="ghost"
                disabled={isGeneratingQuestion}
                className="h-12"
              >
                {isGeneratingQuestion ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <ArrowRight className="w-5 h-5 mr-2" />
                )}
                Next
              </Button>
            </div>

            {/* AI Feedback Panel */}
            <AnimatePresence mode="wait">
              {(feedback || isLoading) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card
                    className={cn(
                      "border-2",
                      feedback?.mode === "check" &&
                        "border-green-500/30 bg-green-500/5",
                      feedback?.mode === "hint" &&
                        "border-amber-500/30 bg-amber-500/5",
                      feedback?.mode === "explain" &&
                        "border-blue-500/30 bg-blue-500/5",
                      isLoading && "border-primary/30 bg-primary/5",
                    )}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-medium flex items-center gap-2">
                        <Sparkles
                          className={cn(
                            "w-5 h-5",
                            feedback?.mode === "check" && "text-green-500",
                            feedback?.mode === "hint" && "text-amber-500",
                            feedback?.mode === "explain" && "text-blue-500",
                            isLoading && "text-primary animate-pulse",
                          )}
                        />
                        {isLoading
                          ? "AI is analyzing..."
                          : feedback?.mode === "check"
                            ? "Feedback"
                            : feedback?.mode === "hint"
                              ? "Hint"
                              : "Solution"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                          <div className="flex flex-col items-center gap-3">
                            <Loader2 className="w-10 h-10 animate-spin text-primary" />
                            <p className="text-muted-foreground">
                              {loadingMode === "check"
                                ? "Analyzing your answer..."
                                : loadingMode === "hint"
                                  ? "Generating a helpful hint..."
                                  : "Preparing the solution..."}
                            </p>
                          </div>
                        </div>
                      ) : feedback ? (
                        <ScrollArea className="max-h-[500px]">
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown
                              components={{
                                p: ({ children }) => (
                                  <p className="mb-3 leading-relaxed">
                                    {children}
                                  </p>
                                ),
                                ul: ({ children }) => (
                                  <ul className="list-disc pl-5 mb-3 space-y-1">
                                    {children}
                                  </ul>
                                ),
                                ol: ({ children }) => (
                                  <ol className="list-decimal pl-5 mb-3 space-y-1">
                                    {children}
                                  </ol>
                                ),
                                h1: ({ children }) => (
                                  <h1 className="text-xl font-bold mt-4 mb-2">
                                    {children}
                                  </h1>
                                ),
                                h2: ({ children }) => (
                                  <h2 className="text-lg font-semibold mt-3 mb-2">
                                    {children}
                                  </h2>
                                ),
                                h3: ({ children }) => (
                                  <h3 className="text-base font-medium mt-2 mb-1">
                                    {children}
                                  </h3>
                                ),
                                strong: ({ children }) => (
                                  <strong className="font-semibold text-foreground">
                                    {children}
                                  </strong>
                                ),
                                code: ({ children }) => (
                                  <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">
                                    {children}
                                  </code>
                                ),
                              }}
                            >
                              {feedback.response}
                            </ReactMarkdown>
                          </div>
                        </ScrollArea>
                      ) : null}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
