"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Sparkles,
  Plus,
  Trash2,
  Calendar,
  BookOpen,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface LabReport {
  id: string;
  user_id: string;
  experiment_title: string;
  experiment_id: string;
  aim: string;
  observations: string;
  calculations: string;
  result: string;
  conclusion: string;
  created_at: string;
}

export function LabReportGenerator({ experiments }: { experiments: any[] }) {
  const [selectedExperiment, setSelectedExperiment] = useState("");
  const [aim, setAim] = useState("");
  const [observations, setObservations] = useState("");
  const [calculations, setCalculations] = useState("");
  const [result, setResult] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [savedReports, setSavedReports] = useState<LabReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSavedReports();
  }, []);

  const fetchSavedReports = async () => {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("lab_reports")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setSavedReports(data);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const generateReport = async () => {
    if (!selectedExperiment) {
      toast({
        title: "Select Experiment",
        description: "Please select an experiment first",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    try {
      const experiment = experiments.find((e) => e.id === selectedExperiment);

      // AI-assisted report generation
      const response = await fetch("/api/generate-lab-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experimentTitle: experiment?.title,
          experimentId: selectedExperiment,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setAim(data.data.aim || "");
        setObservations(data.data.observations || "");
        setCalculations(data.data.calculations || "");
        setResult(data.data.result || "");
        setConclusion(data.data.conclusion || "");

        toast({
          title: "Report Template Generated",
          description: "Fill in your observations and save!",
        });
      }
    } catch (error) {
      console.error("Error generating report:", error);
      toast({
        title: "Generation Failed",
        description: "Using manual input mode",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const saveReport = async () => {
    if (!selectedExperiment || !aim || !observations) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the aim and observations",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const experiment = experiments.find((e) => e.id === selectedExperiment);

        const { error } = await supabase.from("lab_reports").insert({
          user_id: user.id,
          experiment_id: selectedExperiment,
          experiment_title: experiment?.title || "",
          aim,
          observations,
          calculations,
          result,
          conclusion,
        });

        if (error) throw error;

        toast({
          title: "Report Saved!",
          description: "Your lab report has been saved successfully",
        });

        // Clear form and refresh
        clearForm();
        fetchSavedReports();
      }
    } catch (error) {
      console.error("Error saving report:", error);
      toast({
        title: "Save Failed",
        description: "Could not save the report",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteReport = async (reportId: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("lab_reports")
        .delete()
        .eq("id", reportId);

      if (error) throw error;

      toast({
        title: "Report Deleted",
        description: "Lab report has been removed",
      });

      fetchSavedReports();
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const clearForm = () => {
    setSelectedExperiment("");
    setAim("");
    setObservations("");
    setCalculations("");
    setResult("");
    setConclusion("");
  };

  const downloadReport = (report: LabReport) => {
    const content = `
LAB REPORT
==========

Experiment: ${report.experiment_title}
Date: ${new Date(report.created_at).toLocaleDateString()}

AIM:
${report.aim}

OBSERVATIONS:
${report.observations}

CALCULATIONS:
${report.calculations}

RESULT:
${report.result}

CONCLUSION:
${report.conclusion}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lab-report-${report.experiment_title
      .replace(/\s+/g, "-")
      .toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Create New Report */}
      <div className="space-y-4">
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Create New Lab Report
            </CardTitle>
            <CardDescription>Document your experiment findings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Experiment Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Select Experiment
              </label>
              <select
                value={selectedExperiment}
                onChange={(e) => setSelectedExperiment(e.target.value)}
                className="w-full p-2 rounded-lg border border-border bg-background"
              >
                <option value="">Choose an experiment...</option>
                {experiments.map((exp) => (
                  <option key={exp.id} value={exp.id}>
                    {exp.title}
                  </option>
                ))}
              </select>
            </div>

            {/* AI Generate Button */}
            <Button
              onClick={generateReport}
              disabled={!selectedExperiment || generating}
              className="w-full gap-2"
              variant="outline"
            >
              <Sparkles className="w-4 h-4" />
              {generating
                ? "Generating Template..."
                : "Generate Template with AI"}
            </Button>

            {/* Form Fields */}
            <div>
              <label className="text-sm font-medium mb-2 block">Aim</label>
              <Textarea
                placeholder="State the aim of the experiment..."
                value={aim}
                onChange={(e) => setAim(e.target.value)}
                rows={2}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Observations
              </label>
              <Textarea
                placeholder="Record your observations..."
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                rows={4}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Calculations
              </label>
              <Textarea
                placeholder="Show your calculations..."
                value={calculations}
                onChange={(e) => setCalculations(e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Result</label>
              <Textarea
                placeholder="State the result..."
                value={result}
                onChange={(e) => setResult(e.target.value)}
                rows={2}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Conclusion
              </label>
              <Textarea
                placeholder="Write your conclusion..."
                value={conclusion}
                onChange={(e) => setConclusion(e.target.value)}
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={saveReport}
                disabled={loading}
                className="flex-1"
              >
                {loading ? "Saving..." : "Save Report"}
              </Button>
              <Button onClick={clearForm} variant="outline">
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Saved Reports */}
      <div className="space-y-4">
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Saved Lab Reports
            </CardTitle>
            <CardDescription>
              {savedReports.length} report{savedReports.length !== 1 ? "s" : ""}{" "}
              saved
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {savedReports.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No reports saved yet</p>
                <p className="text-sm">Create your first lab report!</p>
              </div>
            ) : (
              savedReports.map((report) => (
                <Card key={report.id} className="glass border-border/50">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {report.experiment_title}
                        </h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(report.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => downloadReport(report)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteReport(report.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm space-y-1">
                      <p className="text-muted-foreground line-clamp-2">
                        <span className="font-medium">Aim:</span> {report.aim}
                      </p>
                      <p className="text-muted-foreground line-clamp-2">
                        <span className="font-medium">Result:</span>{" "}
                        {report.result}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
