"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  BookOpen,
  Calendar,
  AlertCircle,
  History,
  Eye,
  Trash2,
} from "lucide-react";
import { Input } from "../ui/input";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface StudyPlan {
  week: number;
  topics: string[];
  dailyHours: number;
  resources: string[];
}

export function AIStudyPlan() {
  const supabase = createClient();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [topics, setTopics] = useState("");
  const [weeks, setWeeks] = useState("4");
  const [studyPlan, setStudyPlan] = useState<StudyPlan[] | null>(null);
  const [savedPlans, setSavedPlans] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSavedPlans();
  }, []);

  const fetchSavedPlans = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("user_study_plans")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching study plans:", error);
      return;
    }

    if (data) {
      setSavedPlans(data);
    }
  };

  const generateStudyPlan = async () => {
    if (!subject || !topics) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const message = `Create a detailed ${weeks}-week study plan for ${subject}. 
      Topics to cover: ${topics}
      
      IMPORTANT: You must respond ONLY with a valid JSON array of objects. 
      Example format:
      [
        {
          "week": 1,
          "topics": ["Topic A", "Topic B"],
          "dailyHours": 2,
          "resources": ["Resource 1", "Resource 2"]
        }
      ]
      
      Each object must match this exact structure:
      {
        "week": number,
        "topics": string[],
        "dailyHours": number,
        "resources": string[]
      }
      
      Do not include any other text, markdown blocks, preamble, or explanations. Only the raw JSON array and also don't separate same week to two give in one array.`;

      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          type: "study-plan",
        }),
      });

      const data = await response.json();
      if (data.success) {
        try {
          let content =
            data.data?.response ||
            data.data?.message ||
            data.data?.text ||
            (typeof data.data === "string" ? data.data : "");

          if (!content && typeof data.data === "object" && data.data !== null) {
            content = JSON.stringify(data.data);
          }

          const firstBracket = content.indexOf("[");
          const lastBracket = content.lastIndexOf("]");

          if (
            firstBracket !== -1 &&
            lastBracket !== -1 &&
            lastBracket > firstBracket
          ) {
            content = content.substring(firstBracket, lastBracket + 1);
          }

          const parsedPlan = JSON.parse(content);
          if (Array.isArray(parsedPlan)) {
            setStudyPlan(parsedPlan);

            // Save to Supabase
            const {
              data: { user },
            } = await supabase.auth.getUser();
            if (user) {
              const { error: saveError } = await supabase
                .from("user_study_plans")
                .insert({
                  user_id: user.id,
                  subject,
                  topics,
                  total_weeks: weeks,
                  daily_hours: "0", // placeholder as state was removed
                  resources: "", // placeholder as state was removed
                  study_plan: parsedPlan, // Pass as object if using jsonb
                });

              if (saveError) {
                console.error("Save error:", saveError);
                toast({
                  title: "Warning",
                  description: "Plan generated but failed to save to history.",
                  variant: "destructive",
                });
              } else {
                fetchSavedPlans(); // Refresh history
                toast({
                  title: "Success",
                  description: "Study plan generated and saved!",
                });
              }
            }
          } else {
            throw new Error("Response is not an array");
          }
        } catch (parseErr) {
          console.error("Parse Error:", parseErr);
          setError(
            "The AI response was not in the expected format. Please try again."
          );
        }
      } else {
        setError(data.error || "Failed to generate study plan");
      }
    } catch (err) {
      setError("Failed to generate study plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deletePlan = async (id: string) => {
    const { error } = await supabase
      .from("user_study_plans")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete study plan.",
        variant: "destructive",
      });
    } else {
      setSavedPlans(savedPlans.filter((p) => p.id !== id));
      if (
        studyPlan &&
        savedPlans.find((p) => p.id === id)?.study_plan === studyPlan
      ) {
        setStudyPlan(null);
      }
      toast({
        title: "Deleted",
        description: "Study plan removed from history.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Create Your Study Plan
          </CardTitle>
          <CardDescription>
            AI-powered personalized study schedule
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Subject
              </label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Combined Mathematics">
                    Combined Mathematics
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Duration (weeks)
              </label>
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
            <label className="text-sm font-medium text-foreground">
              Topics to Cover
            </label>
            <Input
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

          <Button
            onClick={generateStudyPlan}
            disabled={loading}
            className="w-full"
            size="lg"
          >
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

      {/* History Section */}
      {savedPlans.length > 0 && (
        <Card className="glass border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <History className="w-5 h-5 text-primary" />
              Study Plan History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {savedPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-colors"
                >
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="font-semibold text-sm truncate">
                      {plan.subject}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {plan.total_weeks} weeks • {plan.topics}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-primary"
                      onClick={() => {
                        const planData =
                          typeof plan.study_plan === "string"
                            ? JSON.parse(plan.study_plan)
                            : plan.study_plan;
                        setStudyPlan(planData);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => deletePlan(plan.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Display Generated Study Plan */}
      {studyPlan && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">
            Your Personalized Study Plan
          </h2>
          <div className="grid gap-4">
            {Array.isArray(studyPlan) &&
              studyPlan.map((week) => (
                <Card key={week.week} className="glass border-secondary/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        Week {week.week}
                      </CardTitle>
                      <span className="text-sm font-medium text-secondary">
                        {week.dailyHours} hours/day
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        Topics
                      </h4>
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
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        Recommended Resources
                      </h4>
                      <ul className="space-y-1">
                        {week.resources.map((resource, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-muted-foreground flex items-center gap-2"
                          >
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
  );
}
