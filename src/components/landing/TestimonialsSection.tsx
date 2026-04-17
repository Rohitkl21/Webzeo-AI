import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Sarah Jenkins", role: "CTO", company: "TechNova", quote: "Webzeo completely changed how we prototype. We went from weeks to hours.", rating: 5 },
  { name: "David Chen", role: "Indie Hacker", company: "Self-employed", quote: "I built and launched 3 micro-SaaS apps this month alone. The AI is magic.", rating: 5 },
  { name: "Elena Rodriguez", role: "Product Manager", company: "ScaleUp", quote: "Finally, a tool that lets me build the actual product instead of just wireframes.", rating: 5 },
  { name: "Marcus Johnson", role: "Agency Owner", company: "Digital First", quote: "We deliver client projects 10x faster now. The code quality is surprisingly good.", rating: 4 },
];

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });

  useEffect(() => {
    if (emblaApi) {
      const autoplay = setInterval(() => {
        emblaApi.scrollNext();
      }, 4000);
      return () => clearInterval(autoplay);
    }
  }, [emblaApi]);

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Animated blob background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-[spin_20s_linear_infinite] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Loved by builders</h2>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0">
                <div className="bg-surface border border-white/10 p-8 rounded-3xl h-full flex flex-col">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < t.rating ? 'text-warning fill-warning' : 'text-white/20'}`} />
                    ))}
                  </div>
                  <p className="text-lg text-text-primary mb-8 flex-1">"{t.quote}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg font-bold font-display">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary">{t.name}</h4>
                      <p className="text-sm text-text-muted">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
