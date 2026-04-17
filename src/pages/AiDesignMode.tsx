import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MousePointer2, Move, Type, Image as ImageIcon, Box, Code2, Sparkles, Wand2, Monitor, Smartphone, Tablet } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function AiDesignMode() {
  const [prompt, setPrompt] = useState('A modern SaaS dashboard with a sidebar, analytics charts, and a dark theme.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowCanvas(true);
      toast.success('Wireframe generated! You can now edit elements or convert to code.');
    }, 2500);
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-100px)] flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight font-display text-text-primary flex items-center gap-2">
              <Wand2 className="w-6 h-6 text-primary" /> AI Design Mode <Badge className="ml-2 bg-primary/20 text-primary hover:bg-primary/30 border-none">PRO</Badge>
            </h2>
            <p className="text-sm text-text-muted mt-1">Design first, code later. Ask AI to generate a Figma-like wireframe, edit it visually, and export React code.</p>
          </div>
          {showCanvas && (
            <div className="flex gap-2">
              <Button variant="outline" className="border-card text-text-primary"><Monitor className="w-4 h-4" /></Button>
              <Button variant="outline" className="border-card text-text-muted hover:text-text-primary"><Tablet className="w-4 h-4" /></Button>
              <Button variant="outline" className="border-card text-text-muted hover:text-text-primary"><Smartphone className="w-4 h-4" /></Button>
              <Button className="ml-4 bg-primary hover:bg-primary/90 text-white gap-2" onClick={() => toast.success('Converting wireframe to clean React code...')}>
                <Code2 className="w-4 h-4" /> Generate Code
              </Button>
            </div>
          )}
        </div>

        {!showCanvas ? (
          <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="space-y-4">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-4xl font-bold text-text-primary font-display">What do you want to design?</h3>
              <p className="text-text-muted text-lg">Describe the layout, components, and style you want. AI will generate an editable wireframe instantly.</p>
            </div>
            
            <div className="w-full relative shadow-2xl rounded-2xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-2xl blur opacity-30 animate-pulse"></div>
              <div className="relative bg-surface/80 backdrop-blur border-2 border-white/10 rounded-2xl flex p-2 pl-4">
                <Input 
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  className="flex-1 bg-transparent border-none focus-visible:ring-0 text-lg shadow-none px-0"
                  placeholder="Describe your design..."
                />
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white px-8 rounded-xl h-12"
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt}
                >
                  {isGenerating ? <span className="animate-pulse">Designing...</span> : 'Generate Design'}
                </Button>
              </div>
            </div>

            <div className="flex gap-4 pt-8">
              <Badge variant="outline" className="border-card cursor-pointer hover:bg-card px-4 py-2 text-sm text-text-muted" onClick={() => setPrompt('iOS style mobile app layout for a fitness tracker showing daily steps.')}>Mobile App</Badge>
              <Badge variant="outline" className="border-card cursor-pointer hover:bg-card px-4 py-2 text-sm text-text-muted" onClick={() => setPrompt('E-commerce product detail page with image gallery and reviews.')}>E-commerce Product</Badge>
              <Badge variant="outline" className="border-card cursor-pointer hover:bg-card px-4 py-2 text-sm text-text-muted" onClick={() => setPrompt('Minimalist portfolio site with a bento grid layout.')}>Bento Grid Portfolio</Badge>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex gap-4 overflow-hidden animate-in fade-in duration-500">
            {/* Toolbar */}
            <div className="w-16 bg-surface border border-card rounded-2xl flex flex-col items-center py-4 gap-4 shrink-0">
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-primary/20 text-primary"><MousePointer2 className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl text-text-muted hover:text-text-primary hover:bg-card"><Move className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl text-text-muted hover:text-text-primary hover:bg-card"><Box className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl text-text-muted hover:text-text-primary hover:bg-card"><Type className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl text-text-muted hover:text-text-primary hover:bg-card"><ImageIcon className="w-5 h-5" /></Button>
            </div>

            {/* Canvas */}
            <Card className="flex-1 bg-background border-card relative overflow-hidden rounded-2xl p-8 flex items-center justify-center">
              <div className="absolute top-4 left-4 text-xs font-mono text-text-muted flex gap-4">
                <span>1200 x 800</span>
                <span>Zoom: 100%</span>
              </div>
              
              {/* Mock wireframe of a SaaS dashboard */}
              <div className="w-full max-w-4xl h-[600px] border-2 border-primary border-dashed rounded-xl relative bg-surface overflow-hidden group cursor-default">
                <div className="absolute -top-3 -left-3 bg-primary text-white text-xs px-2 py-0.5 rounded font-mono">MainLayout</div>
                <div className="w-64 h-full border-r border-[#333] p-4 absolute left-0 top-0">
                  <div className="h-8 bg-card/50 rounded mb-8 w-3/4"></div>
                  <div className="space-y-4">
                    <div className="h-4 bg-primary/20 rounded w-full border border-primary/50 cursor-pointer"></div>
                    <div className="h-4 bg-card/30 rounded w-5/6"></div>
                    <div className="h-4 bg-card/30 rounded w-4/6"></div>
                    <div className="h-4 bg-card/30 rounded w-full"></div>
                  </div>
                </div>
                <div className="pl-64 h-full p-8 w-full flex flex-col gap-6">
                  <div className="flex justify-between items-center bg-transparent border-2 hover:border-primary/50 border-transparent transition-colors -m-2 p-2 rounded-lg cursor-pointer">
                    <div className="h-8 bg-card/50 rounded w-1/3"></div>
                    <div className="h-8 w-8 bg-card/50 rounded-full shrink-0"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="h-24 bg-card/30 rounded-xl border border-card/50 p-4"></div>
                    <div className="h-24 bg-card/30 rounded-xl border border-card/50 p-4"></div>
                    <div className="h-24 bg-card/30 rounded-xl border border-card/50 p-4"></div>
                  </div>
                  <div className="flex-1 bg-card/20 rounded-xl border border-card/50 p-4 flex items-end gap-2 px-8 pt-20">
                    {/* Mock chart bars */}
                    {[40, 70, 30, 80, 50, 90, 60, 100].map((h, i) => (
                      <div key={i} className="flex-1 bg-primary/40 rounded-t-sm" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Properties Panel */}
            <div className="w-64 relative shrink-0">
              <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl"></div>
              <div className="relative h-full bg-surface/80 backdrop-blur-xl border border-white/5 shadow-2xl rounded-2xl p-4 overflow-y-auto space-y-6">
                <h3 className="text-sm font-semibold text-text-primary border-b border-card pb-2">Properties</h3>
                <div className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xs text-text-muted">Background</span>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded border border-card bg-surface"></div>
                    <Input className="h-8 font-mono bg-background text-xs" value="var(--surface)" readOnly />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs text-text-muted">Layout</span>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="h-8 text-xs bg-primary/10 border-primary text-primary">Flex</Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs border-card">Grid</Button>
                  </div>
                </div>
                <div className="space-y-1.5 pt-4">
                  <span className="text-xs font-semibold text-text-primary">Spacing</span>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <span className="text-[10px] text-text-muted block mb-1">Padding X</span>
                      <Input className="h-8 text-xs bg-background" value="32px" readOnly />
                    </div>
                    <div>
                      <span className="text-[10px] text-text-muted block mb-1">Padding Y</span>
                      <Input className="h-8 text-xs bg-background" value="24px" readOnly />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
