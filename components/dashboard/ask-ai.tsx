"use client";

import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Loader2,
  Upload,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  Sparkles,
  RefreshCcw,
  Copy,
  Download,
  X,
  Plus,
  Bot,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface ChatMessage {
  role: "user" | "ai";
  content: string;
}

export function AskAI() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [mode, setMode] = useState<"chat" | "quiz" | "notes">("chat");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => setFilePreview(e.target?.result as string);
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null);
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!message.trim() && !file) return;

    const currentMessage = message;
    setMessage("");

    // Add user message to chat
    setChatHistory((prev) => [
      ...prev,
      {
        role: "user",
        content: currentMessage || (file ? `Analyze ${file.name}` : ""),
      },
    ]);
    setLoading(true);

    try {
      let response;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("message", currentMessage || `Analyze ${file.name}`);
        formData.append("mode", mode);

        response = await fetch("/api/ai/analyze", {
          method: "POST",
          body: formData,
        });
      } else {
        response = await fetch("/api/ai/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: currentMessage,
            type: mode,
          }),
        });
      }

      const data = await response.json();
      if (data.success) {
        setChatHistory((prev) => [
          ...prev,
          {
            role: "ai",
            content:
              data.data?.response ||
              "I've analyzed your request. Here's what I found...",
          },
        ]);
      } else {
        throw new Error(data.error || "Failed to get AI response");
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description:
          err.message || "Failed to reach AI assistant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSpecial = async (type: "quiz" | "notes") => {
    if (!file && !message) {
      toast({
        title: "Missing content",
        description: "Please upload a file or enter a topic first.",
      });
      return;
    }
    setMode(type);
    const customMsg =
      type === "quiz"
        ? "Please generate a comprehensive quiz based on this content."
        : "Please generate detailed revision notes based on this content.";

    // Set message and then trigger submit
    setMessage(customMsg);

    // We need to pass the values directly because state updates are async
    setChatHistory((prev) => [...prev, { role: "user", content: customMsg }]);
    setLoading(true);

    try {
      let response;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("message", customMsg);
        formData.append("mode", type);

        response = await fetch("/api/ai/analyze", {
          method: "POST",
          body: formData,
        });
      } else {
        response = await fetch("/api/ai/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: customMsg,
            type: type,
          }),
        });
      }

      const data = await response.json();
      if (data.success) {
        setChatHistory((prev) => [
          ...prev,
          { role: "ai", content: data.data?.response || "Analysis complete." },
        ]);
      } else {
        throw new Error(data.error || "Failed to get AI response");
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to reach AI assistant.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Sidebar: File Upload & Controls */}
      <div className="space-y-6">
        <Card className="glass border-primary/20 overflow-hidden">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-lg flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Upload Materials
            </CardTitle>
            <CardDescription>
              Upload PDF, PNG, or JPG (max 10MB)
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {!file ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-primary/20 rounded-2xl p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, Images for AI analysis
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,image/*"
                    className="hidden"
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative rounded-2xl overflow-hidden border border-primary/20 bg-background/50"
                >
                  <button
                    onClick={removeFile}
                    className="absolute top-2 right-2 p-1 bg-background/80 rounded-full hover:bg-destructive hover:text-white transition-colors z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="p-4 flex items-center gap-4">
                    {filePreview ? (
                      <img
                        src={filePreview}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-8 h-8 text-primary" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate text-foreground">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button
                variant="outline"
                className={cn(
                  "h-20 flex flex-col gap-2 rounded-2xl transition-all",
                  mode === "quiz"
                    ? "bg-primary/10 border-primary text-primary"
                    : "hover:border-primary/50"
                )}
                onClick={() => generateSpecial("quiz")}
              >
                <Sparkles className="w-5 h-5" />
                <span className="text-xs font-semibold">Generate Quiz</span>
              </Button>
              <Button
                variant="outline"
                className={cn(
                  "h-20 flex flex-col gap-2 rounded-2xl transition-all",
                  mode === "notes"
                    ? "bg-primary/10 border-primary text-primary"
                    : "hover:border-primary/50"
                )}
                onClick={() => generateSpecial("notes")}
              >
                <FileText className="w-5 h-5" />
                <span className="text-xs font-semibold">Short Notes</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-primary/20">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Quick Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-3 text-muted-foreground">
            <p>• Upload a diagram to have it explained.</p>
            <p>• Provide a PDF to generate practice questions.</p>
            <p>• Ask for summaries of complex paragraphs.</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content: Chat/Interaction */}
      <div className="lg:col-span-2 space-y-6 flex flex-col h-[calc(100vh-12rem)] min-h-[600px]">
        <Card className="glass border-primary/20 flex-1 flex flex-col overflow-hidden">
          <CardHeader className="border-b border-primary/10 py-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Interactive Learning</CardTitle>
              <CardDescription>
                {mode === "chat"
                  ? "AI Chat Assistant"
                  : mode === "quiz"
                  ? "Quiz Generator"
                  : "Notes Generator"}
              </CardDescription>
            </div>
            {chatHistory.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setChatHistory([])}
                className="text-muted-foreground hover:text-foreground"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Clear
              </Button>
            )}
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
            {chatHistory.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                <div className="p-6 rounded-full bg-primary/5">
                  <Bot className="w-16 h-16 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Welcome to Ask AI
                  </h3>
                  <p className="max-w-md mx-auto mt-2 text-muted-foreground">
                    Upload a file or type a message to start. You can ask
                    questions about your study materials or generate learning
                    content.
                  </p>
                </div>
              </div>
            ) : (
              chatHistory.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className={cn(
                    "flex w-full mb-6",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl p-4 shadow-sm relative group",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "glass border border-primary/10 rounded-tl-none text-foreground"
                    )}
                  >
                    {msg.role === "ai" && (
                      <div className="absolute -top-3 -left-3 p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 backdrop-blur-xl">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none",
                        msg.role === "user"
                          ? "text-primary-foreground"
                          : "text-foreground"
                      )}
                    >
                      {msg.role === "user" ? (
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      ) : (
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => (
                              <p className="mb-2 last:mb-0">{children}</p>
                            ),
                            ul: ({ children }) => (
                              <ul className="list-disc pl-4 mb-2">
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="list-decimal pl-4 mb-2">
                                {children}
                              </ol>
                            ),
                            h1: ({ children }) => (
                              <h1 className="text-lg font-bold mb-2">
                                {children}
                              </h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="text-md font-bold mb-2">
                                {children}
                              </h2>
                            ),
                            code: ({ children }) => (
                              <code className="bg-primary/10 rounded px-1">
                                {children}
                              </code>
                            ),
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start mb-4"
              >
                <div className="bg-muted border border-border/50 rounded-2xl rounded-tl-none p-4 flex items-center gap-3">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">
                    AI is thinking...
                  </span>
                </div>
              </motion.div>
            )}
          </CardContent>

          {/* Input Area */}
          <div className="p-6 border-t border-primary/10 bg-background/50 backdrop-blur-md">
            <form
              onSubmit={handleSubmit}
              className="relative flex items-end gap-2"
            >
              <div className="relative flex-1 group">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    file
                      ? `Ask about ${file.name}...`
                      : "Type a message or topic..."
                  }
                  className="w-full bg-background border border-border/50 rounded-2xl py-4 px-6 pr-14 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none min-h-[60px] max-h-[200px]"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                />
                <div className="absolute right-4 bottom-4 flex gap-2">
                  <Button
                    type="submit"
                    size="icon"
                    disabled={(!message.trim() && !file) || loading}
                    className="rounded-xl glow-green"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </form>
            <p className="text-[10px] text-center mt-3 text-muted-foreground">
              AI can make mistakes. Please verify important information.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
