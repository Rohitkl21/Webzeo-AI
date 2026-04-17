import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Copy, CheckCircle2, Bookmark, Flame, Clock } from 'lucide-react';
import { toast } from 'sonner';

const PROMPTS = [
  {
    id: 1,
    title: 'SaaS Landing Page with Dark Mode',
    prompt: 'Create a modern SaaS landing page for an analytics tool. Include a hero section with a glowing gradient button, a bento-grid features section, integration logos scrolling horizontally, and a dark/light mode toggle. Use Inter for the body and space grotesk for headings.',
    tags: ['Landing Page', 'UI', 'SaaS'],
    saves: 245,
    author: 'webzeo_master'
  },
  {
    id: 2,
    title: 'E-commerce Checkout Flow',
    prompt: 'Build a multi-step e-commerce checkout component using React Hook Form and Zod for validation. Include steps for Shipping Address, Payment Details (mock Stripe elements UI), and Order Review. Add a summary sidebar that stays sticky on desktop.',
    tags: ['E-commerce', 'Forms', 'Complex Setups'],
    saves: 189,
    author: 'ui_ninja'
  },
  {
    id: 3,
    title: 'AI Dashboard Layout',
    prompt: 'Generate an AI dashboard layout with a collapsible sidebar. The main content area should have a grid with a chart using Recharts showing token usage, a recent activity list, and a right-side panel for settings. Style it with a tech-forward dark theme.',
    tags: ['Dashboard', 'Charts', 'Layout'],
    saves: 421,
    author: 'data_viz_pro'
  }
];

export default function PromptLibrary() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (id: number, prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    toast.success('Prompt copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight font-display text-text-primary">Prompt Library</h2>
            <p className="text-text-muted mt-2">Discover, save, and share the best AI prompts for generating UI components and full pages.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white">Share a Prompt</Button>
        </div>

        <div className="flex gap-4 mb-6">
          <Button variant="outline" className="border-primary text-primary bg-primary/10 gap-2 font-medium">
            <Flame className="w-4 h-4" /> Trending
          </Button>
          <Button variant="outline" className="border-card text-text-muted hover:text-text-primary gap-2">
            <Clock className="w-4 h-4" /> Newest
          </Button>
          <Button variant="outline" className="border-card text-text-muted hover:text-text-primary gap-2">
            <Bookmark className="w-4 h-4" /> My Saved
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROMPTS.map(item => (
            <Card key={item.id} className="bg-surface border-card flex flex-col hover:border-primary/30 transition-colors">
              <CardHeader className="pb-3 border-b border-card/30">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg text-text-primary font-display">{item.title}</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-primary hover:bg-primary/10 -mt-1 -mr-2">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-text-muted font-medium">@{item.author}</span>
                  <span className="text-xs text-text-muted">•</span>
                  <span className="text-xs text-text-muted flex items-center gap-1"><Bookmark className="w-3 h-3" /> {item.saves} saves</span>
                </div>
              </CardHeader>
              <CardContent className="pt-4 flex-1 flex flex-col">
                <div className="bg-background rounded-lg p-3 border border-card relative group flex-1 mb-4">
                  <p className="text-sm text-text-primary font-mono leading-relaxed line-clamp-6">{item.prompt}</p>
                  <Button 
                    size="icon" 
                    variant="secondary"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-surface border border-card shadow-sm h-8 w-8"
                    onClick={() => handleCopy(item.id, item.prompt)}
                  >
                    {copiedId === item.id ? <CheckCircle2 className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4 text-text-muted" />}
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {item.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="bg-background text-text-muted border-card text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
