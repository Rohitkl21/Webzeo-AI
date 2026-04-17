import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Download, Code, CheckCircle, Package, Layers, Zap } from 'lucide-react';
import { toast } from 'sonner';

const PLUGINS = [
  { id: 1, name: 'Stripe Payments UI', author: 'Webzeo Core', type: 'Component', rating: 4.9, downloads: '12k', price: 'Free', icon: CreditCardIcon, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 2, name: 'SEO Auto-Optimizer', author: 'RankBoost', type: 'Plugin', rating: 4.8, downloads: '5.2k', price: '$15', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { id: 3, name: 'Advanced Auth Screens', author: 'UI Heroes', type: 'Template', rating: 4.9, downloads: '8.4k', price: 'Free', icon: Layers, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { id: 4, name: 'Supabase Sync', author: 'DB Connect', type: 'Plugin', rating: 4.6, downloads: '3.1k', price: '$29', icon: DatabaseIcon, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 5, name: 'Live Chat Widget', author: 'CommZ', type: 'Component', rating: 4.7, downloads: '6.7k', price: 'Free', icon: MessageSquareIcon, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  { id: 6, name: '3D Model Viewer', author: 'WebGL Studio', type: 'Component', rating: 4.5, downloads: '1.2k', price: '$49', icon: BoxIcon, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
];

function CreditCardIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg> }
function DatabaseIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg> }
function MessageSquareIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> }
function BoxIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg> }


export default function Marketplace() {
  const [filter, setFilter] = useState('All');

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight font-display text-text-primary">Webzeo Marketplace</h2>
            <p className="text-text-muted mt-2 max-w-2xl">Discover and install plugins, UI components, and full app templates. Creators earn 70% revenue share.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-card">Submit a Plugin</Button>
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]">
              Creator Hub
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 border-b border-card pb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input className="pl-9 bg-background border-card" placeholder="Search templates, plugins..." />
          </div>
          <div className="flex gap-2 shrink-0 overflow-x-auto pb-1 custom-scrollbar">
            {['All', 'Plugins', 'Components', 'Templates', 'Free', 'Paid'].map(f => (
              <Badge 
                key={f}
                variant="outline" 
                className={`cursor-pointer px-4 py-1.5 text-sm transition-colors ${filter === f ? 'bg-primary/20 text-primary border-primary/50' : 'bg-surface border-card hover:bg-card text-text-muted hover:text-text-primary'}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLUGINS.map(plugin => (
            <Card key={plugin.id} className="bg-surface border-card hover:border-primary/50 transition-all group overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${plugin.bg} ${plugin.color}`}>
                      <plugin.icon className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className={plugin.price === 'Free' ? 'bg-success/10 text-success border-success/20' : 'bg-primary/10 text-primary border-primary/20'}>
                      {plugin.price}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-text-primary">{plugin.name}</h3>
                    <p className="text-sm text-text-muted flex items-center gap-2 mt-1">
                      By {plugin.author} • <Badge variant="outline" className="text-[10px] h-4 py-0">{plugin.type}</Badge>
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm pt-4 border-t border-card/50">
                    <div className="flex items-center gap-4 text-text-muted">
                      <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /> {plugin.rating}</span>
                      <span className="flex items-center gap-1"><Download className="w-4 h-4" /> {plugin.downloads}</span>
                    </div>
                    <Button size="sm" variant="outline" className="border-card group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all rounded-full px-4" onClick={() => toast.success(`Installed ${plugin.name} into your workspace!`)}>
                      Install
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
