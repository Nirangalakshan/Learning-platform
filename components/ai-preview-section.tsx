import { Card, CardContent } from "@/components/ui/card"
import { Bot, User } from "lucide-react"

export function AIPreviewSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
            Your AI <span className="text-primary">Study Assistant</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Get instant answers in English or Sinhala</p>
        </div>

        {/* Chat Preview */}
        <Card className="glass border-border/50 rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-border/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground">AI Learn Assistant</div>
                <div className="text-xs text-primary">Online</div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-6 space-y-6">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="flex items-start gap-3 max-w-md">
                  <div className="bg-primary/20 rounded-2xl rounded-tr-sm px-4 py-3">
                    <p className="text-sm text-foreground">Explain photosynthesis in Sinhala</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex justify-start">
                <div className="flex items-start gap-3 max-w-md">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-card rounded-2xl rounded-tl-sm px-4 py-3 border border-border/50">
                    <p className="text-sm text-foreground mb-2">
                      <span className="text-primary font-medium">ප්‍රභාසංශ්ලේෂණය</span> යනු ශාක මගින් ආලෝක ශක්තිය රසායනික ශක්තිය බවට
                      පරිවර්තනය කිරීමේ ක්‍රියාවලියයි.
                    </p>
                    <p className="text-sm text-muted-foreground">6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area (Mock) */}
            <div className="px-6 py-4 border-t border-border/50">
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-input rounded-xl px-4 py-3 text-sm text-muted-foreground">
                  Type your question...
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center cursor-pointer">
                  <svg
                    className="w-5 h-5 text-primary-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
