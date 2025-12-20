import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2220%22 height=%2220%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M0 0h20v20H0z%22 fill=%22%23fff%22 fillOpacity=%22.05%22/%3E%3C/svg%3E')]" />

          {/* Content */}
          <div className="relative px-8 sm:px-12 py-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium">Free to get started</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white text-balance">
              Start Your AI Learning Journey Today
            </h2>

            <p className="text-white/80 max-w-xl mx-auto mb-8 text-lg">
              Join thousands of A/L students who are already learning smarter with AI
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="px-8 py-6 text-base font-semibold bg-white text-purple-600 hover:bg-gray-100"
                >
                  Sign Up Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-base font-semibold border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
