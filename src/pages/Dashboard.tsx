import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/AuthContext";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, TrendingUp, Activity, HardDrive, Sparkles, LayoutTemplate, Clock, Rocket, Plus, Database, Key, Users, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import SetupWizard from "@/components/SetupWizard";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sites, setSites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [isSetupWizardOpen, setIsSetupWizardOpen] = useState(false);

  useEffect(() => {
    const fetchSites = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from("sites")
          .select("*")
          .eq("userId", user.id)
          .order("createdAt", { ascending: false })
          .limit(3);
          
        if (error) throw error;
        setSites(data || []);
      } catch (error) {
        console.error("Error fetching sites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, [user]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const handleCreateFromPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    // In a real app, we'd pass this prompt to the builder via state/URL
    navigate('/builder');
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-8">
        
        {/* Main Content Area */}
        <motion.div 
          className="flex-1 space-y-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Greeting */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight font-display mb-1">
                {getGreeting()}, {user?.displayName?.split(' ')[0] || 'Builder'} 👋
              </h2>
              <p className="text-text-muted flex items-center gap-2">
                <Clock className="w-4 h-4" /> {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </p>
            </div>
            <Button 
              onClick={() => setIsSetupWizardOpen(true)}
              variant="outline"
              className="border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary whitespace-nowrap"
            >
              <Shield className="w-4 h-4 mr-2" /> Resume Platform Setup
            </Button>
          </motion.div>

          {/* Quick Stats Row */}
          <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-surface border-card hover:border-primary/30 transition-colors">
              <CardContent className="p-4 flex flex-col gap-1">
                <div className="flex items-center justify-between text-text-muted mb-2">
                  <span className="text-xs font-medium uppercase tracking-wider">Total Projects</span>
                  <Globe className="w-4 h-4 text-primary" />
                </div>
                <span className="text-2xl font-bold font-display">12</span>
                <span className="text-xs text-success flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> +2 this week</span>
              </CardContent>
            </Card>
            <Card className="bg-surface border-card hover:border-primary/30 transition-colors">
              <CardContent className="p-4 flex flex-col gap-1">
                <div className="flex items-center justify-between text-text-muted mb-2">
                  <span className="text-xs font-medium uppercase tracking-wider">Deployments Today</span>
                  <Rocket className="w-4 h-4 text-accent" />
                </div>
                <span className="text-2xl font-bold font-display">4</span>
                <span className="text-xs text-text-muted">All successful</span>
              </CardContent>
            </Card>
            <Card className="bg-surface border-card hover:border-primary/30 transition-colors">
              <CardContent className="p-4 flex flex-col gap-1">
                <div className="flex items-center justify-between text-text-muted mb-2">
                  <span className="text-xs font-medium uppercase tracking-wider">API Calls</span>
                  <Activity className="w-4 h-4 text-warning" />
                </div>
                <span className="text-2xl font-bold font-display">14.2k</span>
                <span className="text-xs text-success flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> +18% vs yesterday</span>
              </CardContent>
            </Card>
            <Card className="bg-surface border-card hover:border-primary/30 transition-colors">
              <CardContent className="p-4 flex flex-col gap-1">
                <div className="flex items-center justify-between text-text-muted mb-2">
                  <span className="text-xs font-medium uppercase tracking-wider">Storage Used</span>
                  <HardDrive className="w-4 h-4 text-success" />
                </div>
                <span className="text-2xl font-bold font-display">2.4 GB</span>
                <span className="text-xs text-text-muted">of 10 GB (24%)</span>
              </CardContent>
            </Card>
          </motion.div>

          {/* Start a new project prompt */}
          <motion.div variants={item}>
            <Card className="bg-gradient-to-br from-surface to-surface/50 border-card relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
              <CardContent className="p-6 sm:p-8 relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold font-display">Start a new project</h3>
                </div>
                <form onSubmit={handleCreateFromPrompt} className="relative">
                  <Input 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you want to build... (e.g., 'A SaaS dashboard for a marketing agency')"
                    className="h-14 pl-4 pr-32 bg-background border-card text-base focus-visible:ring-primary/50 rounded-xl"
                  />
                  <Button 
                    type="submit" 
                    className="absolute right-1.5 top-1.5 bottom-1.5 h-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 font-medium"
                  >
                    Generate
                  </Button>
                </form>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-xs text-text-muted py-1">Suggested:</span>
                  {["E-commerce Store", "Portfolio Website", "Internal Admin Tool"].map(tag => (
                    <button key={tag} onClick={() => setPrompt(tag)} className="text-xs bg-card hover:bg-card/80 text-text-primary px-3 py-1 rounded-full transition-colors border border-white/5">
                      {tag}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Continue where you left off */}
          <motion.div variants={item}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold font-display">Continue where you left off</h3>
              <Link to="/builder" className="text-sm text-primary hover:underline flex items-center">
                View all projects <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {loading ? (
                [1, 2, 3].map(i => (
                  <Card key={i} className="bg-surface border-card animate-pulse h-32"></Card>
                ))
              ) : sites.length > 0 ? (
                sites.map(site => (
                  <Link key={site.id} to={`/builder/${site.id}`}>
                    <Card className="bg-surface border-card hover:border-primary/50 transition-all hover:shadow-[0_0_15px_rgba(124,58,237,0.1)] group cursor-pointer h-full">
                      <CardContent className="p-5 flex flex-col h-full justify-between">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <div className="w-8 h-8 rounded-lg bg-card flex items-center justify-center border border-white/5 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                              <Globe className="w-4 h-4" />
                            </div>
                            {site.published && <Badge variant="outline" className="text-[10px] bg-success/10 text-success border-success/20">Live</Badge>}
                          </div>
                          <h4 className="font-medium text-text-primary truncate">{site.name}</h4>
                          <p className="text-xs text-text-muted truncate mt-1">{site.domain || 'Unpublished'}</p>
                        </div>
                        <p className="text-[10px] text-text-muted/70 mt-4 font-mono">Updated {new Date(site.updatedAt).toLocaleDateString()}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <Card className="bg-surface border-card border-dashed col-span-3 flex flex-col items-center justify-center py-12 text-center">
                  <LayoutTemplate className="w-8 h-8 text-card mb-3" />
                  <p className="text-text-primary font-medium mb-1">No recent projects</p>
                  <p className="text-sm text-text-muted mb-4">Create your first project to see it here.</p>
                  <Link to="/builder">
                    <Button variant="outline" size="sm" className="border-card"><Plus className="w-4 h-4 mr-2"/> New Project</Button>
                  </Link>
                </Card>
              )}
            </div>
          </motion.div>

        </motion.div>

        {/* Right Sidebar - Activity & Templates */}
        <motion.div 
          className="w-full xl:w-80 space-y-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Activity Feed */}
          <motion.div variants={item}>
            <Card className="bg-surface border-card">
              <CardHeader className="pb-3 border-b border-card">
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-text-muted flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Activity Feed
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-card">
                  {[
                    { title: "Production deployment successful", time: "10m ago", icon: Rocket, color: "text-success", bg: "bg-success/10" },
                    { title: "Alice joined Acme Corp Team", time: "2h ago", icon: Users, color: "text-accent", bg: "bg-accent/10" },
                    { title: "Database backup completed", time: "5h ago", icon: Database, color: "text-primary", bg: "bg-primary/10" },
                    { title: "New API key generated", time: "1d ago", icon: Key, color: "text-warning", bg: "bg-warning/10" }
                  ].map((activity, i) => (
                    <div key={i} className="p-4 flex gap-3 hover:bg-card/30 transition-colors">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${activity.bg} ${activity.color}`}>
                        <activity.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm text-text-primary leading-tight mb-1">{activity.title}</p>
                        <p className="text-xs text-text-muted font-mono">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-card text-center">
                  <Button variant="ghost" size="sm" className="text-xs w-full text-text-muted hover:text-text-primary">View all activity</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Suggested Templates */}
          <motion.div variants={item}>
            <Card className="bg-surface border-card">
              <CardHeader className="pb-3 border-b border-card">
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-text-muted flex items-center gap-2">
                  <LayoutTemplate className="w-4 h-4" /> Suggested Templates
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {[
                  { name: "SaaS Starter Kit", desc: "Auth, billing, and dashboard", category: "App" },
                  { name: "Developer Blog", desc: "MDX, dark mode, SEO optimized", category: "Content" },
                  { name: "Waitlist Page", desc: "High-converting landing page", category: "Marketing" }
                ].map((template, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">{template.name}</h4>
                      <Badge variant="outline" className="text-[9px] h-4 px-1 border-card text-text-muted">{template.category}</Badge>
                    </div>
                    <p className="text-xs text-text-muted">{template.desc}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

      </div>
      <SetupWizard 
        isOpen={isSetupWizardOpen} 
        onClose={() => setIsSetupWizardOpen(false)} 
        onComplete={() => setIsSetupWizardOpen(false)} 
      />
    </DashboardLayout>
  );
}
