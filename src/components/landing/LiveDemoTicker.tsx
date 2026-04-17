import { motion } from "framer-motion";

const tickerItems = [
  "CRM Dashboard built in 8s",
  "E-commerce site built in 12s",
  "Chat API built in 5s",
  "Portfolio built in 3s",
  "SaaS Landing Page built in 6s",
  "Blog Platform built in 9s",
];

export default function LiveDemoTicker() {
  return (
    <div className="w-full bg-primary/10 border-y border-primary/20 py-3 overflow-hidden flex whitespace-nowrap relative group">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 20, repeat: Infinity }}
        className="flex gap-8 items-center group-hover:[animation-play-state:paused]"
      >
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="text-sm font-mono text-primary font-medium">{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
