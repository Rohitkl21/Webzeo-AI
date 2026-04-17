import { motion } from "framer-motion";

export function Logo({ className = "", isSpinner = false }: { className?: string, isSpinner?: boolean }) {
  // Particle burst animation variants
  const particles = Array.from({ length: 8 });
  
  return (
    <div className={`relative flex items-center justify-center w-10 h-10 ${className}`}>
      {/* Particles */}
      {!isSpinner && particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-accent rounded-full"
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            x: Math.cos((i * 45 * Math.PI) / 180) * 24,
            y: Math.sin((i * 45 * Math.PI) / 180) * 24,
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            delay: 0.2
          }}
        />
      ))}
      
      {/* Z Glyph */}
      <motion.svg 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
      >
        <defs>
          <linearGradient id="z-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <motion.path
          d="M10 12 L30 12 L12 28 L30 28"
          stroke="url(#z-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </motion.svg>
    </div>
  );
}
