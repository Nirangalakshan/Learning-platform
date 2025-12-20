import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Gradient glow background */}
          <div className="absolute -inset-1 bg-green rounded-3xl blur-xl opacity-30" />

          {/* Content Card */}
          <div className="relative glass rounded-3xl p-8 sm:p-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">
                Free to get started
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance text-foreground">
              Start Your AI Learning Journey Today
            </h2>

            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Join thousands of A/L students who are already learning smarter
              with AI
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="glow-green px-8 py-6 text-base font-medium"
                >
                  Sign Up Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              {/* <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-base font-medium bg-transparent"
                >
                  Login
                </Button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
