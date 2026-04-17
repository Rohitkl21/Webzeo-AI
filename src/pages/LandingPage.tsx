import { useAuth } from "@/lib/AuthContext";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import LiveDemoTicker from "@/components/landing/LiveDemoTicker";
import ShowcaseSection from "@/components/landing/ShowcaseSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import TechStackMarquee from "@/components/landing/TechStackMarquee";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";

import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans selection:bg-primary/30 overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 max-w-7xl mx-auto bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-2xl font-bold tracking-tight font-display">Webzeo</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="text-text-muted hover:text-text-primary hover:bg-surface">Features</Button>
          <Button variant="ghost" className="text-text-muted hover:text-text-primary hover:bg-surface">Showcase</Button>
          <Button variant="ghost" className="text-text-muted hover:text-text-primary hover:bg-surface">Pricing</Button>
          <Button variant="ghost" className="text-text-muted hover:text-text-primary hover:bg-surface">FAQ</Button>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleLogin} className="bg-text-primary text-background hover:bg-text-primary/90 rounded-full px-6 font-medium">
            {user ? "Dashboard" : "Log In"}
          </Button>
        </div>
      </nav>

      <main className="pt-24">
        <ScrollReveal yOffset={30}>
          <HeroSection onLogin={handleLogin} />
        </ScrollReveal>
        <ScrollReveal yOffset={30} delay={0.2}>
          <LiveDemoTicker />
        </ScrollReveal>
        <ScrollReveal yOffset={30}>
          <FeaturesSection />
        </ScrollReveal>
        <ScrollReveal yOffset={30}>
          <HowItWorksSection />
        </ScrollReveal>
        <ScrollReveal yOffset={30}>
          <ShowcaseSection />
        </ScrollReveal>
        <ScrollReveal yOffset={30}>
          <TechStackMarquee />
        </ScrollReveal>
        <ScrollReveal yOffset={30}>
          <TestimonialsSection />
        </ScrollReveal>
        <ScrollReveal yOffset={30}>
          <PricingSection onLogin={handleLogin} />
        </ScrollReveal>
        <ScrollReveal yOffset={30}>
          <FAQSection />
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
