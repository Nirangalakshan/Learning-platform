"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Bell, Globe, Shield, LogOut, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const supabase = createClient();
  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [examYear, setExamYear] = useState("");
  const [district, setDistrict] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const [subjects, setSubjects] = useState<string[]>([]);

  useEffect(() => {
    if (subjects.length > 0) {
      console.log("Subjects updated in state:", subjects);
    }
  }, [subjects]);

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login");
          return;
        }

        setEmail(user.email || "");

        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          toast({
            title: "Error fetching profile",
            description: error.message,
            variant: "destructive",
          });
        } else if (profileData) {
          setProfile(profileData);
          setFullName(profileData.full_name || "");
          setExamYear(profileData.exam_year || "");
          setDistrict(profileData.district || "");
          // Ensure subjects is always an array
          let subjectsArray: string[] = [];
          const rawSubjects = profileData.subjects;

          if (Array.isArray(rawSubjects)) {
            subjectsArray = rawSubjects;
          } else if (typeof rawSubjects === "string") {
            try {
              // Try parsing as JSON first (e.g. '["maths", "science"]')
              const parsed = JSON.parse(rawSubjects);
              if (Array.isArray(parsed)) {
                subjectsArray = parsed;
              }
            } catch (e) {
              // Fallback to simple comma split (e.g. "maths, science")
              subjectsArray = rawSubjects
                .replace(/^\{|\}$/g, "") // Remove Postgres array braces { }
                .replace(/^\[|\]$/g, "") // Remove JSON array brackets [ ] if parse failed
                .split(",")
                .map((s) => s.trim().replace(/^"|"$/g, "")) // Remove quotes
                .filter(Boolean);
            }
          }

          setSubjects(subjectsArray);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [supabase, router, toast]);

  const handleSave = async () => {
    try {
      setSaving(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          exam_year: examYear,
          district: district,
        })
        .eq("id", user.id);

      if (error) {
        toast({
          title: "Update failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Profile updated",
          description: "Your changes have been saved successfully.",
        });
        // Refresh profile data locally
        setProfile({
          ...profile,
          full_name: fullName,
          exam_year: examYear,
          district: district,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Profile Settings */}
        <Card className="glass border-border/50 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
                {fullName ? fullName.charAt(0).toUpperCase() : <User />}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {fullName || "User"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {profile?.exam_year} Student
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto bg-transparent border-primary/20 hover:bg-primary/10 transition-colors"
                disabled
              >
                Change Photo
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Full Name
                </label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your Name"
                  className="py-5 rounded-xl bg-input border-border/50 focus:border-primary/50 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Email
                </label>
                <Input
                  value={email}
                  readOnly
                  type="email"
                  className="py-5 rounded-xl bg-input border-border/50 opacity-70 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Exam Year
                </label>
                <Input
                  value={examYear}
                  onChange={(e) => setExamYear(e.target.value)}
                  placeholder="e.g. 2025"
                  className="py-5 rounded-xl bg-input border-border/50 focus:border-primary/50 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  District
                </label>
                <Input
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="Your District"
                  className="py-5 rounded-xl bg-input border-border/50 focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            <Button
              className="glow-green mt-4 min-w-[120px]"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Subjects */}
        <Card className="glass border-border/50 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              My Subjects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 mb-4">
              {Array.isArray(subjects) && subjects.length > 0 ? (
                subjects.map((subId) => {
                  const subjectKey = subId.toString().trim().toLowerCase();
                  const config = {
                    biology: {
                      name: "Biology",
                      emoji: "🧬",
                      class:
                        "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                    },
                    chemistry: {
                      name: "Chemistry",
                      emoji: "🧪",
                      class: "bg-blue-500/10 text-blue-500 border-blue-500/20",
                    },
                    physics: {
                      name: "Physics",
                      emoji: "⚛️",
                      class:
                        "bg-purple-500/10 text-purple-500 border-purple-500/20",
                    },
                    maths: {
                      name: "Combined Maths",
                      emoji: "🔢",
                      class:
                        "bg-orange-500/10 text-orange-500 border-orange-500/20",
                    },
                  }[subjectKey] || {
                    name: subId,
                    emoji: "📚",
                    class: "bg-primary/10 text-primary border-primary/20",
                  };

                  return (
                    <Badge
                      key={subId}
                      variant="outline"
                      className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-all hover:scale-105 cursor-default ${config.class}`}
                    >
                      <span className="text-lg">{config.emoji}</span>
                      <span className="font-semibold">{config.name}</span>
                    </Badge>
                  );
                })
              ) : (
                <p className="text-sm text-muted-foreground bg-secondary/30 px-4 py-2 rounded-xl border border-border/50">
                  No subjects selected yet
                </p>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-primary/20 hover:bg-primary/10 transition-colors"
            >
              Edit Subjects
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="glass border-border/50 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                label: "Study Reminders",
                desc: "Daily study plan notifications",
                enabled: true,
              },
              {
                label: "Quiz Alerts",
                desc: "New quiz availability",
                enabled: true,
              },
              {
                label: "Progress Updates",
                desc: "Weekly progress reports",
                enabled: false,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between p-3 bg-secondary/30 rounded-xl"
              >
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <div
                  className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                    item.enabled ? "bg-primary/40" : "bg-muted"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-primary rounded-full transition-all ${
                      item.enabled ? "right-1" : "left-1"
                    }`}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Language */}
        <Card className="glass border-border/50 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Language
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button className="flex-1 glow-green">English</Button>
              <Button
                variant="outline"
                className="flex-1 bg-transparent border-border/50 hover:bg-secondary/50 transition-colors"
              >
                සිංහල
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="glass border-destructive/30 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-destructive">
              <Shield className="w-5 h-5" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full bg-transparent text-destructive border-destructive/50 hover:bg-destructive/10 transition-colors"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
            <Button
              variant="outline"
              className="w-full bg-transparent text-destructive border-destructive/50 hover:bg-destructive/10 transition-colors"
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
