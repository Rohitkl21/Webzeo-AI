import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Sparkles, Code2, LayoutTemplate, Database, Lock, CreditCard, Upload, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface Step1Props {
  onNext: (config: any) => void;
}

export default function Step1Intent({ onNext }: Step1Props) {
  const [prompt, setPrompt] = useState('');
  const [framework, setFramework] = useState('auto');
  const [style, setStyle] = useState('minimal');
  const [starter, setStarter] = useState('scratch');
  const [toggles, setToggles] = useState({
    database: false,
    auth: false,
    payments: false,
    fileUpload: false,
    email: false
  });

  const handleEnhance = () => {
    setPrompt(prev => prev + " with a modern, responsive design and smooth animations.");
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    onNext({ prompt, framework, style, starter, toggles });
  };

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full space-y-8"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight">What do you want to build?</h1>
          <p className="text-text-muted text-lg">Describe your vision, and our AI will generate the complete project.</p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/50 to-accent/50 rounded-2xl blur-sm opacity-50 transition duration-1000 group-focus-within:opacity-100 group-focus-within:duration-200"></div>
          <div className="relative bg-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
            <Textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the app or website you want to build..."
              className="min-h-[150px] text-lg bg-transparent border-none focus-visible:ring-0 resize-none placeholder:text-text-muted/50"
            />
            <div className="flex items-center justify-between mt-4 border-t border-card pt-4">
              <div className="flex items-center gap-4 text-sm text-text-muted">
                <span>{prompt.length} characters</span>
                <Button variant="ghost" size="sm" onClick={handleEnhance} className="text-primary hover:text-primary hover:bg-primary/10">
                  <Sparkles className="w-4 h-4 mr-2" /> Enhance Prompt
                </Button>
              </div>
              <Button 
                onClick={handleGenerate} 
                disabled={!prompt.trim()}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all"
              >
                <Wand2 className="w-5 h-5 mr-2" /> Generate Project
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          {/* Framework & Style */}
          <div className="space-y-6 bg-surface/80 backdrop-blur-xl p-6 rounded-xl border border-white/5 shadow-xl transition hover:border-primary/30">
            <h3 className="font-semibold flex items-center gap-2"><Code2 className="w-4 h-4 text-primary" /> Stack & Style</h3>
            
            <div className="space-y-3">
              <Label>Framework</Label>
              <Select value={framework} onValueChange={setFramework}>
                <SelectTrigger className="bg-background border-card">
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto-detect (Recommended)</SelectItem>
                  <SelectItem value="react">React (Vite)</SelectItem>
                  <SelectItem value="nextjs">Next.js</SelectItem>
                  <SelectItem value="vue">Vue.js</SelectItem>
                  <SelectItem value="svelte">SvelteKit</SelectItem>
                  <SelectItem value="vanilla">Vanilla JS</SelectItem>
                  <SelectItem value="nodejs">Node.js Express</SelectItem>
                  <SelectItem value="python">Python FastAPI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Style Preference</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="bg-background border-card">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal & Clean</SelectItem>
                  <SelectItem value="corporate">Corporate & Professional</SelectItem>
                  <SelectItem value="colorful">Colorful & Playful</SelectItem>
                  <SelectItem value="dark">Dark Mode First</SelectItem>
                  <SelectItem value="custom">Custom (from prompt)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6 bg-surface/80 backdrop-blur-xl p-6 rounded-xl border border-white/5 shadow-xl transition hover:border-primary/30">
            <h3 className="font-semibold flex items-center gap-2"><Database className="w-4 h-4 text-accent" /> Include Features</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 cursor-pointer"><Database className="w-4 h-4 text-text-muted" /> Database</Label>
                <Switch checked={toggles.database} onCheckedChange={(c) => setToggles({...toggles, database: c})} />
              </div>
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 cursor-pointer"><Lock className="w-4 h-4 text-text-muted" /> Authentication</Label>
                <Switch checked={toggles.auth} onCheckedChange={(c) => setToggles({...toggles, auth: c})} />
              </div>
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 cursor-pointer"><CreditCard className="w-4 h-4 text-text-muted" /> Payments</Label>
                <Switch checked={toggles.payments} onCheckedChange={(c) => setToggles({...toggles, payments: c})} />
              </div>
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 cursor-pointer"><Upload className="w-4 h-4 text-text-muted" /> File Upload</Label>
                <Switch checked={toggles.fileUpload} onCheckedChange={(c) => setToggles({...toggles, fileUpload: c})} />
              </div>
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 cursor-pointer"><Mail className="w-4 h-4 text-text-muted" /> Email</Label>
                <Switch checked={toggles.email} onCheckedChange={(c) => setToggles({...toggles, email: c})} />
              </div>
            </div>
          </div>

          {/* Starter */}
          <div className="space-y-6 bg-surface/80 backdrop-blur-xl p-6 rounded-xl border border-white/5 shadow-xl transition hover:border-primary/30">
            <h3 className="font-semibold flex items-center gap-2"><LayoutTemplate className="w-4 h-4 text-success" /> Starting Point</h3>
            
            <div className="grid grid-cols-1 gap-3">
              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${starter === 'scratch' ? 'border-primary bg-primary/5' : 'border-card hover:border-primary/50'}`}
                onClick={() => setStarter('scratch')}
              >
                <h4 className="font-medium mb-1">Start from scratch</h4>
                <p className="text-xs text-text-muted">Blank canvas, AI builds everything from the ground up.</p>
              </div>
              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${starter === 'template' ? 'border-primary bg-primary/5' : 'border-card hover:border-primary/50'}`}
                onClick={() => setStarter('template')}
              >
                <h4 className="font-medium mb-1">Use a template</h4>
                <p className="text-xs text-text-muted">Start with a pre-built foundation and customize it.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
