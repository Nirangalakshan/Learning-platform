"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  ArrowLeft,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

const subjects = [
  { id: "biology", name: "Biology", emoji: "🧬" },
  { id: "chemistry", name: "Chemistry", emoji: "🧪" },
  { id: "physics", name: "Physics", emoji: "⚛️" },
  { id: "maths", name: "Combined Maths", emoji: "🔢" },
];

const examYears = ["2025", "2026", "2027"];

const sidebarItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.5,
    },
  }),
};

const formVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: {
      duration: 0.3,
    },
  },
};

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    district: "",
  });
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleSubject = (id: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            subjects: selectedSubjects,
            exam_year: selectedYear,
            district: formData.district,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (data.user) {
        await supabase.from("profiles").insert({
          id: data.user.id,
          full_name: formData.fullName,
          subjects: selectedSubjects,
          exam_year: selectedYear,
          district: formData.district,
        });
      }

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        setSuccess(true);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const progress = step === 1 ? 50 : 100;

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-background" />
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl bg-primary"
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="glass border-primary/20 rounded-2xl">
            <CardContent className="p-8 text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-10 h-10 text-green-500" />
              </motion.div>

              <h2 className="text-2xl font-bold text-foreground">
                Check your email
              </h2>
              <p className="text-muted-foreground">
                We&apos;ve sent a verification link to{" "}
                <span className="text-foreground font-medium">
                  {formData.email}
                </span>
                . Please click the link to verify your account and get started.
              </p>

              <div className="pt-4 space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-12"
                  onClick={() => router.push("/login")}
                >
                  Return to Login
                </Button>
                <p className="text-xs text-muted-foreground">
                  Didn&apos;t receive the email? Check your spam folder or try
                  again.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />

        <motion.div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #00FF99 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #FFD166 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -150, -300],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Left Side - Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex w-96 flex-col p-8 glass border-r border-border/50 relative z-10"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-12">
          <motion.div
            className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-primary-foreground font-bold">AI</span>
          </motion.div>
          <span className="font-semibold text-xl text-foreground">
            Learn LK <span className="text-base">🇱🇰</span>
          </span>
        </Link>

        {/* Feature Highlights */}
        <div className="flex-1 space-y-6">
          <h2 className="text-xl font-semibold text-foreground">
            Start Your Journey
          </h2>

          <div className="space-y-4">
            {[
              {
                title: "AI-Powered Notes",
                desc: "Get concise notes tailored to your syllabus",
              },
              {
                title: "Adaptive Learning",
                desc: "Quizzes that adapt to your pace",
              },
              {
                title: "15 Years Past Papers",
                desc: "Complete archive with solutions",
              },
              {
                title: "Smart Study Plans",
                desc: "Personalized schedules for your exam",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={sidebarItemVariants}
                className="flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground text-sm">
                    {feature.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {feature.desc}
                  </div>
                </div>
              </motion.div>
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
      </motion.div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 relative z-10">
        <div className="w-full max-w-lg">
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
            <motion.div
              className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <span className="text-primary-foreground font-bold">AI</span>
            </motion.div>
            <span className="font-semibold text-xl text-foreground">
              Learn LK <span className="text-base">🇱🇰</span>
            </span>
          </Link>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Step {step} of 2
              </span>
              <span className="text-sm text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Step 1: Account Details */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2 text-foreground">
                    Create Account
                  </h1>
                  <p className="text-muted-foreground">
                    Enter your details to get started
                  </p>
                </div>

                <Card className="glass border-border/50 rounded-2xl">
                  <CardContent className="p-6">
                    <form className="space-y-5">
                      {/* Name */}
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="text-sm font-medium text-foreground">
                          Full Name
                        </label>
                        <div className="relative group">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            name="fullName"
                            placeholder="Your name"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="pl-10 py-5 rounded-xl bg-input border-border/50"
                          />
                        </div>
                      </motion.div>

                      {/* Email */}
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label className="text-sm font-medium text-foreground">
                          Email
                        </label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10 py-5 rounded-xl bg-input border-border/50"
                          />
                        </div>
                      </motion.div>

                      {/* Password */}
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <label className="text-sm font-medium text-foreground">
                          Password
                        </label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="pl-10 pr-10 py-5 rounded-xl bg-input border-border/50"
                          />
                          <motion.button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </motion.button>
                        </div>
                      </motion.div>

                      {/* Continue Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            type="button"
                            onClick={() => {
                              if (
                                formData.fullName &&
                                formData.email &&
                                formData.password
                              ) {
                                setStep(2);
                              }
                            }}
                            disabled={
                              !formData.fullName ||
                              !formData.email ||
                              !formData.password
                            }
                            className="w-full py-5 glow-green text-base font-medium"
                          >
                            Continue
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </Button>
                        </motion.div>
                      </motion.div>
                    </form>

                    {/* Sign In Link (Mobile) */}
                    <p className="lg:hidden text-center text-sm text-muted-foreground mt-6">
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="text-primary hover:underline font-medium"
                      >
                        Sign in
                      </Link>
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Personalization */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2 text-foreground">
                    Personalize Your Experience
                  </h1>
                  <p className="text-muted-foreground">
                    Help us customize your learning journey
                  </p>
                </div>

                <Card className="glass border-border/50 rounded-2xl">
                  <CardContent className="p-6">
                    <form onSubmit={handleSignup} className="space-y-6">
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                        >
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{error}</span>
                        </motion.div>
                      )}

                      {/* Select Subjects */}
                      <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="text-sm font-medium text-foreground">
                          Select Your Subjects
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {subjects.map((subject, index) => (
                            <motion.button
                              key={subject.id}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              type="button"
                              onClick={() => toggleSubject(subject.id)}
                              className={`p-4 rounded-xl border text-left transition-all ${
                                selectedSubjects.includes(subject.id)
                                  ? "border-primary bg-primary/10 glow-green"
                                  : "border-border/50 bg-input hover:border-primary/50"
                              }`}
                            >
                              <span className="text-2xl mb-2 block">
                                {subject.emoji}
                              </span>
                              <span className="text-sm font-medium text-foreground">
                                {subject.name}
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>

                      {/* Exam Year */}
                      <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <label className="text-sm font-medium text-foreground">
                          Exam Year
                        </label>
                        <div className="flex gap-3">
                          {examYears.map((year) => (
                            <motion.button
                              key={year}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              type="button"
                              onClick={() => setSelectedYear(year)}
                              className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${
                                selectedYear === year
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-border/50 bg-input text-foreground hover:border-primary/50"
                              }`}
                            >
                              {year}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>

                      {/* District (Optional) */}
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <label className="text-sm font-medium text-foreground">
                          District <Badge variant="secondary">Optional</Badge>
                        </label>
                        <Input
                          name="district"
                          placeholder="e.g., Colombo"
                          value={formData.district}
                          onChange={handleInputChange}
                          className="py-5 rounded-xl bg-input border-border/50"
                        />
                      </motion.div>

                      {/* Action Buttons */}
                      <motion.div
                        className="flex gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep(1)}
                            className="py-5 px-6 bg-transparent"
                          >
                            <ArrowLeft className="mr-2 w-5 h-5" />
                            Back
                          </Button>
                        </motion.div>
                        <motion.div
                          className="flex-1"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            type="submit"
                            disabled={
                              loading ||
                              selectedSubjects.length === 0 ||
                              !selectedYear
                            }
                            className="w-full py-5 glow-green text-base font-medium"
                          >
                            {loading ? (
                              <>
                                <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                                Creating Account...
                              </>
                            ) : (
                              <>
                                Create Account
                                <ArrowRight className="ml-2 w-5 h-5" />
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
