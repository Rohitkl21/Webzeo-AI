import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    desc: "Perfect for trying out Webzeo.",
    features: ["3 AI Generations / day", "1 Published Site", "Webzeo Subdomain", "Community Support"],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: { monthly: 29, yearly: 24 },
    desc: "For professional builders.",
    features: ["Unlimited AI Generations", "10 Published Sites", "Custom Domains", "API Key Manager", "Priority Support", "Export Code"],
    cta: "Get Pro",
    popular: true,
  },
  {
    name: "Team",
    price: { monthly: 99, yearly: 79 },
    desc: "For agencies and teams.",
    features: ["Everything in Pro", "Unlimited Sites", "Collaborative Editing", "Team Roles & Permissions", "Dedicated Success Manager", "White-labeling"],
    cta: "Contact Sales",
    popular: false,
  }
];

export default function PricingSection({ onLogin }: { onLogin: () => void }) {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">Simple, transparent pricing</h2>
        
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className={`text-sm ${!yearly ? 'text-text-primary' : 'text-text-muted'}`}>Monthly</span>
          <button 
            onClick={() => setYearly(!yearly)}
            className="w-14 h-8 rounded-full bg-surface border border-white/10 relative p-1 transition-colors"
          >
            <motion.div 
              className="w-6 h-6 rounded-full bg-primary"
              animate={{ x: yearly ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-sm flex items-center gap-2 ${yearly ? 'text-text-primary' : 'text-text-muted'}`}>
            Yearly <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full font-mono">Save 20%</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative rounded-3xl p-8 flex flex-col ${plan.popular ? 'bg-surface border-2 border-primary shadow-[0_0_40px_rgba(124,58,237,0.2)]' : 'bg-surface/50 border border-white/10'}`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
            )}
            
            <h3 className="text-2xl font-bold font-display mb-2">{plan.name}</h3>
            <p className="text-text-muted text-sm mb-6 h-10">{plan.desc}</p>
            
            <div className="mb-8">
              <span className="text-5xl font-bold font-display">${yearly ? plan.price.yearly : plan.price.monthly}</span>
              <span className="text-text-muted">/mo</span>
            </div>

            <Button 
              onClick={onLogin}
              className={`w-full mb-8 rounded-full h-12 ${plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-card text-text-primary hover:bg-card/80 border border-white/5'}`}
            >
              {plan.cta}
            </Button>

            <div className="space-y-4 flex-1">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-text-primary">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
