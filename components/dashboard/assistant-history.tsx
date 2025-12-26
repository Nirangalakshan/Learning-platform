"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Trash2,
  FileText,
  Calendar,
  Eye,
  Copy,
  Download,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface StudyPlan {
  id: string;
  subject: string;
  topics: string;
  total_weeks: string;
  study_plan: any; // JSON
  created_at: string;
}

interface Note {
  id: string;
  subject: string;
  topic: string;
  note: string;
  created_at: string;
}

export function AssistantHistory() {
  const supabase = createClient();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [plans, setPlans] = useState<StudyPlan[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // Fetch Plans
      const { data: plansData, error: plansError } = await supabase
        .from("user_study_plans")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (plansError) throw plansError;
      setPlans(plansData || []);

      // Fetch Notes
      const { data: notesData, error: notesError } = await supabase
        .from("user_short_notes")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (notesError) throw notesError;
      setNotes(notesData || []);
    } catch (error) {
      console.error("Error fetching history:", error);
      toast({
        title: "Error",
        description: "Failed to load history items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string, type: "note" | "plan") => {
    const table = type === "note" ? "user_short_notes" : "user_study_plans";

    const { error } = await supabase.from(table).delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    } else {
      if (type === "note") {
        setNotes(notes.filter((n) => n.id !== id));
      } else {
        setPlans(plans.filter((p) => p.id !== id));
      }
      toast({
        title: "Deleted",
        description: "Item removed from history",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard.",
    });
  };

  const downloadNote = (note: Note) => {
    const element = document.createElement("a");
    const file = new Blob([note.note], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${note.subject}_${note.topic}_notes.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="notes" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="notes">Generated Notes</TabsTrigger>
          <TabsTrigger value="plans">Study Plans</TabsTrigger>
        </TabsList>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-4 mt-6">
          {notes.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">
              No generated notes found.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <Card key={note.id} className="glass border-primary/20">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {note.subject}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        onClick={() => deleteItem(note.id, "note")}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-lg line-clamp-1">
                      {note.topic}
                    </CardTitle>
                    <CardDescription>
                      {formatDate(note.created_at)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>
                              {note.subject} - {note.topic}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="mt-4 whitespace-pre-wrap font-sans text-sm leading-relaxed p-4 bg-muted/50 rounded-lg">
                            {note.note}
                          </div>
                          <div className="flex justify-end gap-2 mt-4">
                            <Button
                              variant="outline"
                              onClick={() => copyToClipboard(note.note)}
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Copy
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => downloadNote(note)}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Study Plans Tab */}
        <TabsContent value="plans" className="space-y-4 mt-6">
          {plans.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">
              No study plans found.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <Card key={plan.id} className="glass border-primary/20">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {plan.subject}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        onClick={() => deleteItem(plan.id, "plan")}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-lg line-clamp-1">
                      {plan.total_weeks} Weeks Plan
                    </CardTitle>
                    <CardDescription className="line-clamp-1">
                      {plan.topics}
                    </CardDescription>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(plan.created_at)}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Plan
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Study Plan: {plan.subject}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4 space-y-4">
                          {(() => {
                            try {
                              const planData =
                                typeof plan.study_plan === "string"
                                  ? JSON.parse(plan.study_plan)
                                  : plan.study_plan;

                              if (!Array.isArray(planData))
                                return <div>Invalid plan data</div>;

                              return planData.map((week: any) => (
                                <div
                                  key={week.week}
                                  className="border p-4 rounded-lg bg-muted/30"
                                >
                                  <div className="flex justify-between mb-2">
                                    <h4 className="font-bold">
                                      Week {week.week}
                                    </h4>
                                    <span className="text-sm text-muted-foreground">
                                      {week.dailyHours} hrs/day
                                    </span>
                                  </div>
                                  <div className="mb-2">
                                    <p className="text-sm font-semibold">
                                      Topics:
                                    </p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {week.topics?.map(
                                        (t: string, i: number) => (
                                          <span
                                            key={i}
                                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                                          >
                                            {t}
                                          </span>
                                        )
                                      )}
                                    </div>
                                  </div>
                                  {week.resources && (
                                    <div>
                                      <p className="text-sm font-semibold">
                                        Resources:
                                      </p>
                                      <ul className="text-xs list-disc pl-4 text-muted-foreground">
                                        {week.resources.map(
                                          (r: string, i: number) => (
                                            <li key={i}>{r}</li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              ));
                            } catch (e) {
                              return <div>Error loading plan details</div>;
                            }
                          })()}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
