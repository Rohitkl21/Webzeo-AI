import { motion } from "framer-motion";

const techStack = [
  "React", "Next.js", "Vue", "Angular", "Svelte", "Node.js", "Python", "FastAPI", 
  "PostgreSQL", "MongoDB", "Redis", "Stripe", "Firebase", "Supabase", "OpenAI", 
  "Tailwind", "Docker", "Vercel", "Cloudflare"
];

export default function TechStackMarquee() {
  return (
    <section className="py-20 border-y border-white/5 bg-surface/20 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none"></div>
      
      <div className="text-center mb-10 relative z-20">
        <p className="text-sm font-mono text-text-muted uppercase tracking-widest">Powered by industry standards</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Row 1 - Left */}
        <div className="flex whitespace-nowrap">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            className="flex gap-12 items-center"
          >
            {[...techStack, ...techStack].map((tech, i) => (
              <div key={i} className="text-xl md:text-3xl font-bold font-display text-white/20 hover:text-white/60 transition-colors cursor-default">
                {tech}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Right */}
        <div className="flex whitespace-nowrap">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ ease: "linear", duration: 35, repeat: Infinity }}
            className="flex gap-12 items-center"
          >
            {[...techStack.reverse(), ...techStack].map((tech, i) => (
              <div key={i} className="text-xl md:text-3xl font-bold font-display text-white/20 hover:text-white/60 transition-colors cursor-default">
                {tech}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
