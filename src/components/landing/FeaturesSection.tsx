import { motion } from "framer-motion";
import { Layout, Zap, Users, MonitorPlay, Bug, History, Key, Globe, Languages, Shield, Database, BarChart } from "lucide-react";

const features = [
  { icon: Zap, title: "AI Full-Stack Generator", desc: "Generate Frontend, Backend, and DB from a single prompt.", colSpan: "md:col-span-2" },
  { icon: MonitorPlay, title: "One-Prompt Deployment", desc: "Go from idea to live URL instantly." },
  { icon: Users, title: "Live Collaborative Editor", desc: "Build together in real-time." },
  { icon: Layout, title: "Real-time Preview Sandbox", desc: "See changes as you type." },
  { icon: Bug, title: "AI-Powered Debug & Fix", desc: "Auto-resolve errors and bugs." },
  { icon: History, title: "Version Control & History", desc: "Time-travel through your code.", colSpan: "md:col-span-2" },
  { icon: Key, title: "API Key Manager", desc: "Securely store and inject secrets." },
  { icon: Globe, title: "Custom Domain Linking", desc: "Connect your own domain easily." },
  { icon: Languages, title: "Multi-Language Support", desc: "React, Vue, Node, Python & more." },
  { icon: Shield, title: "Built-in Auth System", desc: "Ready-to-use user authentication." },
  { icon: Database, title: "Database Designer", desc: "Visual schema builder." },
  { icon: BarChart, title: "Analytics Dashboard", desc: "Track traffic and usage.", colSpan: "md:col-span-2" },
];

export default function FeaturesSection() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">Everything you need to build <br/><span className="text-primary">anything</span></h2>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">Webzeo replaces your entire stack with a single, intelligent platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className={`group relative bg-surface/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-transparent transition-all duration-300 ${feature.colSpan || ''}`}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-colors duration-500 -z-10"></div>
            
            <feature.icon className="w-8 h-8 text-accent mb-4 group-hover:text-primary transition-colors" />
            <h3 className="text-xl font-bold font-display mb-2 text-text-primary">{feature.title}</h3>
            <p className="text-text-muted text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
