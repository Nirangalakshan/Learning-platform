import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { SubjectsSection } from "@/components/subjects-section";
import { AIPreviewSection } from "@/components/ai-preview-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <SubjectsSection />
      <AIPreviewSection />
      <CTASection />
      <Footer />
    </main>
  );
}
