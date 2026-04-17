import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, AlertTriangle, Bug, Code, CheckCircle, RefreshCw, Layers } from 'lucide-react';
import { toast } from 'sonner';

const errorData = [
  { time: '10:00', errors: 2 },
  { time: '11:00', errors: 5 },
  { time: '12:00', errors: 12 },
  { time: '13:00', errors: 3 },
  { time: '14:00', errors: 0 },
  { time: '15:00', errors: 1 },
  { time: '16:00', errors: 8 },
];

const mockErrors = [
  { id: 'ERR-001', type: 'TypeError', message: 'Cannot read properties of undefined (reading "map")', file: 'src/components/UserList.tsx:42', priority: 'High', status: 'Open' },
  { id: 'ERR-002', type: 'UnhandledPromiseRejection', message: 'Failed to fetch /api/v1/billing', file: 'src/lib/api.ts:112', priority: 'High', status: 'Open' },
  { id: 'ERR-003', type: 'ReferenceError', message: 'process is not defined', file: 'vite.config.ts:5', priority: 'Medium', status: 'Diagnosed' },
];

export default function AiErrorMonitoring() {
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);

  const handleFix = (id: string) => {
    setAnalyzingId(id);
    setTimeout(() => {
      setAnalyzingId(null);
      toast.success(`Error ${id} analyzed. Opening builder with suggested fix applied...`);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight font-display text-text-primary flex items-center gap-2">
              <Bug className="w-8 h-8 text-error" /> AI Error Monitoring <Badge className="ml-2 bg-error/20 text-error hover:bg-error/30 border-none">LIVE</Badge>
            </h2>
            <p className="text-text-muted mt-2">Real-time webhook monitoring catches runtime errors and AI auto-diagnoses the stack trace.</p>
          </div>
          <Button variant="outline" className="border-card text-text-primary gap-2">
            <RefreshCw className="w-4 h-4" /> Refresh Data
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-surface border-card lg:col-span-2">
            <CardContent className="p-6">
              <h3 className="font-semibold text-text-primary mb-6 flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" /> Error Frequency (Last 24h)
              </h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={errorData}>
                    <defs>
                      <linearGradient id="colorErrors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2e37" vertical={false} />
                    <XAxis dataKey="time" stroke="#8b949e" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#8b949e" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}`} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#1f242e', borderColor: '#2a2e37', borderRadius: '8px' }}
                      itemStyle={{ color: '#ef4444' }}
                    />
                    <Area type="monotone" dataKey="errors" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorErrors)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-card flex flex-col justify-center items-center text-center p-6 space-y-4 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-error/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <AlertTriangle className="w-12 h-12 text-error mb-2" />
             <div>
               <h3 className="text-4xl font-bold font-display text-text-primary mb-1">31</h3>
               <p className="text-text-muted text-sm uppercase tracking-wider">Active Exceptions</p>
             </div>
             <p className="text-xs text-text-muted mt-4">AI suggests 2 of these are critical and causing user drop-offs.</p>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-text-primary text-xl font-display">Recent Diagnostics</h3>
          <div className="space-y-4">
            {mockErrors.map(err => (
              <Card key={err.id} className="bg-background border-card overflow-hidden transition-all hover:border-primary/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-error/50 text-error bg-error/10">{err.type}</Badge>
                      <span className="text-text-muted font-mono text-xs">{err.file}</span>
                      <span className="text-text-muted text-xs">•</span>
                      <span className="text-text-muted text-xs font-medium">{err.id}</span>
                    </div>
                    <p className="font-medium text-text-primary text-sm">{err.message}</p>
                    
                    {err.status === 'Diagnosed' && (
                      <div className="bg-primary/5 border border-primary/20 rounded p-3 mt-3 flex gap-3">
                        <SparklesIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-text-primary">AI Diagnosis</p>
                          <p className="text-xs text-text-muted mt-1">This error occurs because Vite exposes env vars via `import.meta.env` not `process.env`. I can rewrite this file to fix the reference.</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 shrink-0">
                    <Button 
                      variant="outline" 
                      className="border-primary/50 text-primary hover:bg-primary hover:text-white transition-colors"
                      onClick={() => handleFix(err.id)}
                      disabled={analyzingId === err.id}
                    >
                      {analyzingId === err.id ? (
                        <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
                      ) : (
                        <><Code className="w-4 h-4 mr-2" /> Auto-Fix Issue</>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function SparklesIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg> }
