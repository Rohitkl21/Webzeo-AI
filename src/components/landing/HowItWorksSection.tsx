import { motion } from "framer-motion";
import { MessageSquare, Code2, Rocket } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section className="py-32 px-6 bg-surface/30 border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">From idea to live in <span className="text-accent">3 steps</span></h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-card -translate-y-1/2 z-0">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          {[
            { icon: MessageSquare, title: "Describe Your App", desc: "Tell Webzeo what you want to build in plain English." },
            { icon: Code2, title: "AI Builds It", desc: "Our engine generates the full stack code instantly." },
            { icon: Rocket, title: "Deploy Instantly", desc: "One click to publish to a global edge network." }
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-2xl bg-card border border-white/10 flex items-center justify-center mb-6 group-hover:-translate-y-2 group-hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] transition-all duration-300">
                <step.icon className="w-8 h-8 text-text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-2xl font-bold font-display mb-3">{step.title}</h3>
              <p className="text-text-muted">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
