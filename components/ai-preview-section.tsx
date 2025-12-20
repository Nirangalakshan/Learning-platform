import { Card, CardContent } from "@/components/ui/card"
import { Bot, User, Send } from "lucide-react"

export function AIPreviewSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            AI Assistant
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 text-balance">
            Your Personal Study Companion
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Get instant answers in English or Sinhala — anytime, anywhere
          </p>
        </div>

        {/* Chat Preview */}
        <Card className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xl shadow-purple-500/10">
          <CardContent className="p-0">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3 bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">AI Learn Assistant</div>
                <div className="text-xs text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Online
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-6 space-y-6 bg-gray-50/50">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="flex items-start gap-3 max-w-md">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl rounded-tr-md px-5 py-3">
                    <p className="text-sm text-white">Explain photosynthesis in Sinhala</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex justify-start">
                <div className="flex items-start gap-3 max-w-md">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-md px-5 py-4 border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-900 mb-3">
                      <span className="font-semibold text-purple-600">ප්‍රභාසංශ්ලේෂණය</span> යනු ශාක මගින් ආලෝක ශක්තිය රසායනික ශක්තිය
                      බවට පරිවර්තනය කිරීමේ ක්‍රියාවලියයි.
                    </p>
                    <div className="bg-gray-50 rounded-lg px-3 py-2 font-mono text-sm text-gray-700">
                      6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="px-6 py-4 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-500">
                  Type your question...
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                  <Send className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
