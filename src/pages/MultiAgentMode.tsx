import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Terminal, Users as UsersIcon, CheckCircle2, CircleDashed, Layout, Server, Beaker, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Spinner } from '@/components/ui/spinner';

export default function MultiAgentMode() {
  const [isBuilding, setIsBuilding] = useState(false);
  const [progress, setProgress] = useState(0);

  const startBuild = () => {
    setIsBuilding(true);
    setProgress(0);
    // Mock progress interpolation
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 200);
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-100px)] flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight font-display text-text-primary flex items-center gap-2">
              <UsersIcon className="w-6 h-6 text-primary" /> Multi-Agent Build Mode <Badge className="ml-2 bg-primary/20 text-primary hover:bg-primary/30 border-none">PRO</Badge>
            </h2>
            <p className="text-sm text-text-muted mt-1">Deploy 3 specialized AI agents simultaneously to write frontend, backend, and tests concurrently. 3x faster app generation.</p>
          </div>
          {!isBuilding ? (
            <Button className="bg-primary hover:bg-primary/90 text-white gap-2 font-medium px-6" onClick={startBuild}>
              <Play className="w-4 h-4 fill-current" /> Deploy Agents
            </Button>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-text-primary">{progress}% Complete</span>
              <div className="w-48 h-2 bg-surface rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-200" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AgentPanel 
            name="Alpha (Frontend)"
            icon={Layout}
            color="text-blue-400"
            bgColor="bg-blue-400/10"
            borderColor="border-blue-400/30"
            isActive={isBuilding && progress < 80}
            isDone={progress >= 80}
            logs={[
              "Initializing React components...",
              "Generating layout.tsx...",
              "Styling Dashboard with Tailwind...",
              "Connecting state to Redux store...",
              "Frontend compilation successful."
            ]}
            progress={progress}
            speedMultiplier={1.2}
          />
          <AgentPanel 
            name="Omega (Backend)"
            icon={Server}
            color="text-emerald-400"
            bgColor="bg-emerald-400/10"
            borderColor="border-emerald-400/30"
            isActive={isBuilding && progress < 90}
            isDone={progress >= 90}
            logs={[
              "Scaffolding Express server...",
              "Designing database schema (PostgreSQL)...",
              "Writing Prisma models...",
              "Generating REST API endpoints...",
              "Setting up authentication middleware..."
            ]}
            progress={progress}
            speedMultiplier={0.9}
          />
          <AgentPanel 
            name="Zeta (QA / Tests)"
            icon={Beaker}
            color="text-amber-400"
            bgColor="bg-amber-400/10"
            borderColor="border-amber-400/30"
            isActive={isBuilding && progress > 20 && progress < 100}
            isDone={progress === 100}
            logs={[
              "Awaiting module outputs...",
              "Writing unit tests for frontend components (Vitest)...",
              "Testing API route /api/users...",
              "Performing E2E user flow with Playwright...",
              "All 42 tests passed successfully."
            ]}
            progress={progress}
            speedMultiplier={0.8}
            delay={20}
          />
        </div>

        {/* Coordination Log Area */}
        <Card className="h-48 bg-[#0d1117] border-card flex flex-col font-mono text-xs p-0 overflow-hidden relative">
          <div className="bg-surface/50 border-b border-card p-2 px-4 flex items-center justify-between text-text-muted">
            <span className="flex items-center gap-2"><Terminal className="w-4 h-4" /> Agent Coordination Log</span>
            {isBuilding && progress < 100 && <Spinner size="sm" className="text-primary" />}
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 text-[#8b949e]">
            {!isBuilding && <div className="italic">Awaiting deployment configuration... run `deploy agents` to start.</div>}
            
            <AnimatePresence>
              {progress > 5 && <motion.div initial={{opacity:0, y:5}} animate={{opacity:1, y:0}}>[Coordinator] Spawning threads for Alpha, Omega, and Zeta...</motion.div>}
              {progress > 15 && <motion.div initial={{opacity:0, y:5}} animate={{opacity:1, y:0}} className="text-blue-400">[Alpha] Backend, what port are you running on?</motion.div>}
              {progress > 20 && <motion.div initial={{opacity:0, y:5}} animate={{opacity:1, y:0}} className="text-emerald-400">[Omega] I'm binding to port 3000. API specs are written to /docs/api.json.</motion.div>}
              {progress > 30 && <motion.div initial={{opacity:0, y:5}} animate={{opacity:1, y:0}} className="text-amber-400">[Zeta] Reading API specs. Writing integration tests now.</motion.div>}
              {progress > 60 && <motion.div initial={{opacity:0, y:5}} animate={{opacity:1, y:0}} className="text-emerald-400">[Omega] Noticed a typo in the Prisma schema. Auto-correcting and migrating DB...</motion.div>}
              {progress > 85 && <motion.div initial={{opacity:0, y:5}} animate={{opacity:1, y:0}} className="text-amber-400">[Zeta] Found a visual regression in the Dashboard sidebar. Alpha, please fix z-index.</motion.div>}
              {progress > 88 && <motion.div initial={{opacity:0, y:5}} animate={{opacity:1, y:0}} className="text-blue-400">[Alpha] Fixed. Patching frontend chunk.</motion.div>}
              {progress >= 100 && <motion.div initial={{opacity:0, y:5}} animate={{opacity:1, y:0}} className="text-success font-bold mt-4">[Coordinator] Build finished in parallel. Application is ready.</motion.div>}
            </AnimatePresence>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function AgentPanel({ name, icon: Icon, color, bgColor, borderColor, isActive, isDone, logs, progress, speedMultiplier, delay = 0 }: any) {
  const localProgress = Math.max(0, Math.min(100, (progress - delay) * speedMultiplier));
  const activeLogIndex = Math.min(logs.length - 1, Math.floor((localProgress / 100) * logs.length));

  return (
    <Card className={`bg-surface border-card flex flex-col overflow-hidden transition-all duration-300 ${isActive ? `ring-1 ring-offset-0 shadow-[0_0_15px_rgba(0,0,0,0.5)] ${borderColor.replace('border-', 'ring-')}` : ''}`}>
      <div className={`p-4 border-b border-card flex items-center justify-between ${isActive ? bgColor : 'bg-background'}`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${bgColor} ${color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="font-semibold font-display text-text-primary">{name}</h3>
        </div>
        <div>
          {isDone ? <CheckCircle2 className={`w-5 h-5 ${color}`} /> : 
           isActive ? <Spinner size="sm" className={`${color}`} /> : 
           <CircleDashed className="w-5 h-5 text-text-muted" />}
        </div>
      </div>
      
      <div className="flex-1 bg-[#1e1e1e] p-4 font-mono text-sm overflow-y-auto relative custom-scrollbar shadow-inner">
        {localProgress > 0 && logs.map((log: string, idx: number) => {
          if (idx > activeLogIndex) return null;
          return (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mb-2 ${idx === activeLogIndex && !isDone ? color : 'text-text-muted'}`}
            >
              <span className="opacity-50 mr-2">{'>'}</span> {log}
              {idx === activeLogIndex && !isDone && <span className="animate-pulse ml-1">_</span>}
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
