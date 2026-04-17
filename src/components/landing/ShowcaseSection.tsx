import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";

const showcaseItems = [
  { id: 1, title: "Nexus CRM", category: "SaaS", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=600" },
  { id: 2, title: "Lumina Store", category: "E-commerce", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=600" },
  { id: 3, title: "DevFlow API", category: "APIs", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800&h=600" },
  { id: 4, title: "Alex.dev", category: "Portfolios", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800&h=600" },
  { id: 5, title: "Taskify", category: "Web Apps", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800&h=600" },
  { id: 6, title: "DataViz Pro", category: "SaaS", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=600" },
];

const categories = ["All", "Web Apps", "SaaS", "E-commerce", "APIs", "Portfolios"];

export default function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredItems = activeTab === "All" ? showcaseItems : showcaseItems.filter(item => item.category === activeTab);

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Built on Webzeo</h2>
          <p className="text-text-muted text-lg max-w-xl">Explore what our community is building.</p>
        </div>
        
        <Tabs defaultValue="All" className="w-full md:w-auto" onValueChange={setActiveTab}>
          <TabsList className="bg-surface border border-card flex-wrap h-auto p-1">
            {categories.map(cat => (
              <TabsTrigger key={cat} value={cat} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            key={item.id}
            className="group relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] bg-surface"
          >
            <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" referrerPolicy="no-referrer" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-mono mb-3 backdrop-blur-md border border-accent/30">
                  {item.category}
                </span>
                <h3 className="text-2xl font-bold font-display mb-4">{item.title}</h3>
                <button className="flex items-center text-sm font-medium hover:text-accent transition-colors">
                  Open App <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
