import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Plus, ArrowRight, ExternalLink, 
  Code2, CheckCircle2, LayoutTemplate, Star, Crown,
  Monitor, Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from 'sonner';

// Mock Data
const CATEGORIES = [
  'All', 'Landing Page', 'SaaS Starter', 'E-commerce', 'Blog', 'Portfolio', 
  'Admin Dashboard', 'API Boilerplate', 'Mobile-first', 'AI App', 'Auth Starter'
];

type Template = {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  stack: string[];
  isPro: boolean;
  features: string[];
};

const MOCK_TEMPLATES: Template[] = [
  {
    id: 't1',
    name: 'Modern SaaS Dashboard',
    description: 'A complete admin dashboard with charts, tables, and auth boilerplate.',
    category: 'Admin Dashboard',
    thumbnail: 'https://picsum.photos/seed/dashboard/600/400',
    stack: ['React', 'Tailwind', 'Recharts'],
    isPro: true,
    features: ['Dark mode ready', 'Fully responsive', '6+ Chart types', 'Authentication UI']
  },
  {
    id: 't2',
    name: 'Minimal Portfolio',
    description: 'Clean, fast portfolio template for designers and developers.',
    category: 'Portfolio',
    thumbnail: 'https://picsum.photos/seed/portfolio/600/400',
    stack: ['Next.js', 'Framer Motion'],
    isPro: false,
    features: ['SEO optimized', 'Page transitions', 'Contact form', 'MDX Blog']
  },
  {
    id: 't3',
    name: 'AI Chat Interface',
    description: 'ChatGPT-style interface ready to hook up to an LLM API.',
    category: 'AI App',
    thumbnail: 'https://picsum.photos/seed/ai/600/400',
    stack: ['React', 'Node.js', 'OpenAI'],
    isPro: true,
    features: ['Streaming responses', 'Markdown support', 'Chat history', 'Syntax highlighting']
  },
  {
    id: 't4',
    name: 'E-commerce Storefront',
    description: 'Headless storefront with cart, checkout UI, and product galleries.',
    category: 'E-commerce',
    thumbnail: 'https://picsum.photos/seed/shop/600/400',
    stack: ['Next.js', 'Stripe', 'Tailwind'],
    isPro: true,
    features: ['Cart state management', 'Product filtering', 'Stripe integration UI', 'Image optimization']
  },
  {
    id: 't5',
    name: 'Auth Starter',
    description: 'Pre-configured login, register, and password reset flows.',
    category: 'Auth Starter',
    thumbnail: 'https://picsum.photos/seed/auth/600/400',
    stack: ['Vue', 'Firebase', 'Tailwind'],
    isPro: false,
    features: ['OAuth providers', 'Form validation', 'Protected routes', 'User profile UI']
  },
  {
    id: 't6',
    name: 'Agency Landing Page',
    description: 'High-converting landing page with split sections, testimonials, and clean typography.',
    category: 'Landing Page',
    thumbnail: 'https://picsum.photos/seed/agency/600/400',
    stack: ['SvelteKit', 'Tailwind'],
    isPro: false,
    features: ['Scroll animations', 'Responsive hero', 'Pricing cards', 'FAQ section']
  },
  {
    id: 't7',
    name: 'Express REST API',
    description: 'Bulletproof Node.js API with routing, validation, error handling, and auth middleware.',
    category: 'API Boilerplate',
    thumbnail: 'https://picsum.photos/seed/api/600/400',
    stack: ['Node.js', 'Express', 'MongoDB'],
    isPro: false,
    features: ['JWT Auth', 'Joi Validation', 'Winston Logger', 'Swagger Docs setup']
  },
  {
    id: 't8',
    name: 'Mobile Social Feed',
    description: 'Instagram-like feed optimized for mobile viewing experience.',
    category: 'Mobile-first',
    thumbnail: 'https://picsum.photos/seed/social/600/400',
    stack: ['React', 'Tailwind'],
    isPro: true,
    features: ['Infinite scroll UI', 'Like/Comment buttons', 'Gesture support', 'Bottom navigation']
  }
];

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [pricingFilter, setPricingFilter] = useState('all'); // 'all', 'free', 'pro'
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const filteredTemplates = MOCK_TEMPLATES.filter(template => {
    const matchesCategory = activeCategory === 'All' || template.category === activeCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPricing = pricingFilter === 'all' ? true : 
                           pricingFilter === 'pro' ? template.isPro : !template.isPro;
    
    return matchesCategory && matchesSearch && matchesPricing;
  });

  const handleUseTemplate = (template: Template) => {
    toast.success(`Forking '${template.name}' into a new project...`);
    setSelectedTemplate(null);
    // In a real app, this would route to the builder or project settings page with the template ID
  };

  const handleSubmitTemplate = () => {
    toast.success("Redirecting to template submission portal (Pro Feature)");
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <LayoutTemplate className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-display text-text-primary tracking-tight">Templates Library</h1>
              </div>
            </div>
            <p className="text-text-muted mt-2 max-w-2xl">
              Kickstart your next project with one of our 100+ production-ready templates. 
              Fork, modify, and deploy in minutes.
            </p>
          </div>
          
          <Button 
            onClick={handleSubmitTemplate}
            className="bg-surface border-primary/30 text-primary hover:bg-primary/10 group"
          >
            <Crown className="w-4 h-4 mr-2 text-primary group-hover:animate-pulse" />
            Submit Template
          </Button>
        </div>

        {/* Toolbar & Filters */}
        <div className="bg-surface border border-card p-4 rounded-xl flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between sticky top-0 z-10 shadow-sm">
          
          <div className="relative flex-1 w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input 
              placeholder="Search templates, stacks, or keywords..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background border-card focus-visible:ring-primary w-full"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <Select value={pricingFilter} onValueChange={setPricingFilter}>
              <SelectTrigger className="bg-background border-card w-[120px]">
                <SelectValue placeholder="Pricing" />
              </SelectTrigger>
              <SelectContent className="bg-surface border-card">
                <SelectItem value="all">All Pricing</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
              </SelectContent>
            </Select>

            <Select value={activeCategory} onValueChange={setActiveCategory}>
              <SelectTrigger className="bg-background border-card w-[160px]">
                <Filter className="w-4 h-4 mr-2 text-text-muted" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-surface border-card max-h-[300px]">
                {CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category Pills (Optional secondary navigation) */}
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 custom-scrollbar gap-2 block lg:hidden">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category 
                  ? 'bg-primary text-white' 
                  : 'bg-surface border border-card text-text-muted hover:text-text-primary hover:border-text-muted/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTemplates.map((template, i) => (
            <motion.div 
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-surface/80 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-[0_8px_30px_rgb(124,58,237,0.1)] flex flex-col h-full"
            >
              {/* Thumbnail Area */}
              <div 
                className="aspect-video w-full bg-card overflow-hidden relative cursor-pointer"
                onClick={() => setSelectedTemplate(template)}
              >
                <img 
                  src={template.thumbnail} 
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
                
                {/* Badges on image */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur border-white/10 text-text-primary">
                    {template.category}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  {template.isPro ? (
                    <Badge variant="default" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-none shadow-md">
                      <Crown className="w-3 h-3 mr-1" /> PRO
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-success/20 text-success border-success/30 backdrop-blur">
                      FREE
                    </Badge>
                  )}
                </div>

                {/* Hover Action */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                    <Monitor className="w-4 h-4 mr-2" /> Preview
                  </Button>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold font-display text-text-primary mb-1 group-hover:text-primary transition-colors">
                  {template.name}
                </h3>
                <p className="text-sm text-text-muted mb-4 line-clamp-2 flex-1">
                  {template.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                  {template.stack.map(tech => (
                    <span key={tech} className="text-xs px-2 py-1 rounded bg-background border border-card text-text-primary">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-card">
                  <Button 
                    className="flex-1 bg-primary hover:bg-primary/90 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUseTemplate(template);
                    }}
                  >
                    Use Template
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-24 bg-surface border border-card rounded-2xl border-dashed">
            <LayoutTemplate className="w-12 h-12 text-card mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2 font-display text-text-primary">No templates found</h3>
            <p className="text-text-muted mb-6">Try adjusting your search or filters to find what you're looking for.</p>
            <Button onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
              setPricingFilter('all');
            }} className="bg-primary hover:bg-primary/90 text-white">
              Clear Filters
            </Button>
          </div>
        )}

      </div>

      {/* Preview Modal */}
      <Dialog open={!!selectedTemplate} onOpenChange={(open) => !open && setSelectedTemplate(null)}>
        <DialogContent className="max-w-5xl w-[90vw] h-[85vh] p-0 bg-surface border-card overflow-hidden flex flex-col text-text-primary">
          <div className="flex items-center justify-between p-4 border-b border-card bg-background/50">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold font-display">{selectedTemplate?.name}</h2>
              {selectedTemplate?.isPro ? (
                <Badge className="bg-amber-500 text-white border-none h-5">PRO</Badge>
              ) : (
                <Badge variant="outline" className="text-success border-success/30 h-5">FREE</Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white h-8" onClick={() => selectedTemplate && handleUseTemplate(selectedTemplate)}>
                <Code2 className="w-4 h-4 mr-2" /> Fork Template
              </Button>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-text-primary hover:bg-card">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </DialogClose>
            </div>
          </div>
          
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar info */}
            <div className="w-80 border-r border-card bg-background/30 p-6 flex flex-col overflow-y-auto custom-scrollbar">
              <h3 className="font-semibold text-sm text-text-muted uppercase tracking-wide mb-3">About</h3>
              <p className="text-sm text-text-primary leading-relaxed mb-6">
                {selectedTemplate?.description}
              </p>
              
              <h3 className="font-semibold text-sm text-text-muted uppercase tracking-wide mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedTemplate?.stack.map(tech => (
                  <Badge key={tech} variant="outline" className="bg-surface border-card">{tech}</Badge>
                ))}
              </div>

              <h3 className="font-semibold text-sm text-text-muted uppercase tracking-wide mb-3">Features</h3>
              <ul className="space-y-2 mb-8 flex-1">
                {selectedTemplate?.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-text-primary">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4 border-t border-card mt-auto">
                 <p className="text-xs text-text-muted text-center flex items-center justify-center gap-1">
                   <Star className="w-3 h-3 text-warning" /> 
                   Created by Webzeo Team
                 </p>
              </div>
            </div>
            
            {/* Live Demo Area Mock */}
            <div className="flex-1 bg-background relative flex flex-col">
              <div className="h-10 bg-surface border-b border-card flex items-center px-4 gap-2">
                 <div className="flex gap-1.5">
                   <div className="w-2.5 h-2.5 rounded-full bg-error/80"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-warning/80"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-success/80"></div>
                 </div>
                 <div className="mx-auto bg-background border border-card rounded-md w-1/2 h-6 flex items-center justify-center text-xs text-text-muted font-mono">
                   preview.webzeo.app/{selectedTemplate?.id}
                 </div>
              </div>
              <div className="flex-1 p-8 overflow-y-auto flex items-center justify-center">
                {selectedTemplate ? (
                  <div className="w-full h-full rounded-lg overflow-hidden border border-card shadow-2xl relative">
                    <img 
                      src={selectedTemplate.thumbnail} 
                      alt="Preview" 
                      className="w-full h-full object-cover opacity-50 blur-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-surface/80 backdrop-blur-md p-6 rounded-xl border border-white/10 text-center max-w-sm">
                        <Monitor className="w-8 h-8 mx-auto text-primary mb-3" />
                        <h4 className="font-display font-semibold mb-2 text-text-primary">Interactive Preview Desktop</h4>
                        <p className="text-sm text-text-muted mb-4">
                          In a live environment, this would render an iframe of the deployed template.
                        </p>
                        <Button className="w-full bg-primary text-white hover:bg-primary/90" onClick={() => handleUseTemplate(selectedTemplate)}>
                          Fork to Start Editing
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
