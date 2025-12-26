"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
  FileText,
  Sparkles,
  Copy,
  Download,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";
import { createClient } from "@/lib/supabase/client";

export function AINotesgenerator() {
  const supabase = createClient();

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("");
  const [generatedNotes, setGeneratedNotes] = useState("");
  const [error, setError] = useState("");

  const generateNotes = async () => {
    if (!subject || !topic) {
      setError("Please select a subject and enter a topic");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const message = `Generate comprehensive revision notes for A/L ${subject} on the topic: ${topic} in ${language}. 
          Include key concepts, definitions, and important points for exams in markdown format. don't include any symbols in response like @,#,$,*.`;

      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          type: "notes",
        }),
      });

      const data = await response.json();
      if (data.success) {
        const notes = data.data?.response;
        setGeneratedNotes(notes);
        toast({
          title: "Notes Generated!",
          description: `AI has successfully created notes for ${topic}.`,
        });

        // Save to Supabase
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { error: saveError } = await supabase
            .from("user_short_notes")
            .insert({
              user_id: user.id,
              subject,
              topic,
              note: notes,
            });
          if (saveError) {
            console.error("Save error:", saveError);
            toast({
              title: "Warning",
              description: "Notes generated but failed to save to history.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Success",
              description: "Short notes generated and saved!",
            });
          }
        }
      } else {
        throw new Error(data.message || "Failed to generate notes");
      }
    } catch (err: any) {
      setError(err.message || "Failed to generate notes. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate notes. Please check your connection.",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedNotes);
    toast({
      title: "Copied!",
      description: "Notes copied to clipboard successfully.",
    });
  };

  const downloadNotes = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedNotes], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${subject}_${topic}_notes.txt`;
    document.body.appendChild(element);
    element.click();
    toast({
      title: "Download Started",
      description: "Your notes are being downloaded.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="glass border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Revision Notes Generator
          </CardTitle>
          <CardDescription>
            Generate concise revision notes for any A/L topic instantly
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
                Topic
              </label>
              <Input
                placeholder="Specific topic (e.g., DNA Replication, Organic Chemistry basics)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="min-h-12 resize-none rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Language
              </label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Sinhala">Sinhala</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && (
            <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <Button
            onClick={generateNotes}
            disabled={loading}
            className="w-full glow-green"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing & Writing...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Generate Short Notes
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedNotes && (
        <Card className="glass border-secondary/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">Generated Notes</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={downloadNotes}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 p-6 rounded-xl border border-border/50 whitespace-pre-wrap font-sans text-foreground leading-relaxed overflow-y-auto">
              {generatedNotes}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
