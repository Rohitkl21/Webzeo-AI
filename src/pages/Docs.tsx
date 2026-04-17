import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, BookOpen, MessageSquare, PlayCircle, ExternalLink, 
  Terminal, Globe, Database, Key, Users, Settings as SettingsIcon,
  HelpCircle, ChevronRight, MessageCircleQuestion, Server
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const SECTIONS = [
  { id: 'getting-started', title: 'Getting Started', icon: BookOpen },
  { id: 'builder', title: 'Builder Guide', icon: Globe },
  { id: 'deployment', title: 'Deployment', icon: Terminal },
  { id: 'databases', title: 'Databases', icon: Database },
  { id: 'api-keys', title: 'API Keys', icon: Key },
  { id: 'team', title: 'Team Management', icon: Users },
  { id: 'billing', title: 'Billing', icon: SettingsIcon },
  { id: 'troubleshooting', title: 'Troubleshooting', icon: HelpCircle },
];

export default function Docs() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: 'Hi! I am Ask Zeo, an AI assistant trained on the Webzeo documentation. How can I help you today?' }
  ]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatHistory([...chatHistory, { role: 'user', content: chatInput }]);
    const query = chatInput;
    setChatInput('');

    // Simulate AI response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: 'ai', 
        content: `I found some information about "${query}". In Webzeo, you can configure this in your project settings. Would you like a step-by-step guide?` 
      }]);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 relative">
        
        {/* Left Sidebar Menu */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input 
              placeholder="Search documentation..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-background border-card pl-9 w-full rounded-xl"
            />
          </div>

          <nav className="space-y-1">
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 px-3">Documentation</h4>
            {SECTIONS.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeSection === section.id 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-text-muted hover:text-text-primary hover:bg-card/50'
                }`}
              >
                <section.icon className="w-4 h-4" />
                {section.title}
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-card space-y-1">
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 px-3">Resources</h4>
            <a href="#" className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-text-muted hover:text-text-primary hover:bg-card/50 transition-colors group">
              <span className="flex items-center gap-3"><PlayCircle className="w-4 h-4" /> Video Tutorials</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href="#" className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-text-muted hover:text-[#5865F2] hover:bg-[#5865F2]/10 transition-colors group">
              <span className="flex items-center gap-3"><MessageSquare className="w-4 h-4" /> Discord Community</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href="#" className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-text-muted hover:text-text-primary hover:bg-card/50 transition-colors group">
              <span className="flex items-center gap-3"><BookOpen className="w-4 h-4" /> Changelog</span>
              <Badge variant="outline" className="text-[10px] h-5 border-primary/30 text-primary">v2.4</Badge>
            </a>
            <a href="#" className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-text-muted hover:text-success hover:bg-success/10 transition-colors group">
              <span className="flex items-center gap-3"><Server className="w-4 h-4" /> Status</span>
              <div className="flex items-center gap-1.5 text-success">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
                <span className="text-xs font-medium">All Systems Operational</span>
              </div>
            </a>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="bg-surface border border-card rounded-2xl p-8 min-h-[600px]">
            <div className="flex items-center gap-2 text-sm text-text-muted mb-4">
              <span>Docs</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-text-primary">
                {SECTIONS.find(s => s.id === activeSection)?.title}
              </span>
            </div>

            <h1 className="text-3xl font-bold font-display text-text-primary mb-6">
              {SECTIONS.find(s => s.id === activeSection)?.title}
            </h1>
            
            <div className="prose prose-invert max-w-none text-text-muted">
              {activeSection === 'getting-started' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-lg">Welcome to Webzeo! This guide will help you understand the basics of creating and deploying your first project.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                    <Card className="bg-background border-card hover:border-primary/50 transition-colors cursor-pointer">
                      <CardContent className="p-6 space-y-2">
                        <Globe className="w-8 h-8 text-primary" />
                        <h3 className="font-semibold text-text-primary mt-2">Create a Project</h3>
                        <p className="text-sm text-text-muted">Learn how to use the visual builder or import from GitHub.</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-background border-card hover:border-primary/50 transition-colors cursor-pointer">
                      <CardContent className="p-6 space-y-2">
                        <Terminal className="w-8 h-8 text-primary" />
                        <h3 className="font-semibold text-text-primary mt-2">Deploy to Production</h3>
                        <p className="text-sm text-text-muted">Configure your domain and set up continuous integration.</p>
                      </CardContent>
                    </Card>
                  </div>

                  <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">Quick Start Video</h3>
                  <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-surface/80 backdrop-blur shadow-xl relative cursor-pointer group group-hover:border-primary/50 transition-colors">
                    <img src="https://picsum.photos/seed/webzeovideo/800/450" alt="Video thumbnail" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.5)] group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                        <PlayCircle className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">Latest Updates</h3>
                  <div className="border-l-2 border-card pl-4 space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <Badge variant="outline" className="text-primary border-primary/30">New</Badge>
                        <span className="text-sm font-medium text-text-primary">April 14, 2026</span>
                      </div>
                      <h4 className="font-medium text-text-primary">AI Support Chatbot added to Docs</h4>
                      <p className="text-sm text-text-muted mt-1">You can now chat with "Ask Zeo" for instant answers to your documentation questions.</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <Badge variant="outline" className="text-text-muted border-card">Update</Badge>
                        <span className="text-sm font-medium text-text-primary">April 10, 2026</span>
                      </div>
                      <h4 className="font-medium text-text-primary">Improved Template Library</h4>
                      <p className="text-sm text-text-muted mt-1">Over 20 new high-quality templates added to the premium tier.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeSection !== 'getting-started' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center mb-4">
                    <BookOpen className="w-8 h-8 text-text-muted" />
                  </div>
                  <h3 className="text-xl font-medium text-text-primary mb-2">Content loading...</h3>
                  <p className="text-text-muted max-w-sm">
                    This section of the documentation is currently being rendered. Use the AI Chatbot below if you need immediate assistance!
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Embedded AI Support Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {chatbotOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 w-80 sm:w-96 h-[500px] bg-surface border border-card rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-4 border-b border-card bg-background/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary relative">
                    <MessageCircleQuestion className="w-4 h-4" />
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-success border border-surface"></span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary text-sm font-display">Ask Zeo</h3>
                    <p className="text-xs text-text-muted">AI Support Assistant</p>
                  </div>
                </div>
                <button 
                  onClick={() => setChatbotOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-card text-text-muted transition-colors"
                >
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {chatHistory.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === 'user' 
                        ? 'bg-primary text-white rounded-br-none' 
                        : 'bg-card text-text-primary rounded-bl-none border border-white/5'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-card bg-background">
                <form onSubmit={handleSendChat} className="flex gap-2">
                  <Input 
                    placeholder="Ask a question..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 bg-surface border-card rounded-full px-4"
                  />
                  <Button type="submit" size="icon" className="rounded-full bg-primary hover:bg-primary/90 shrink-0">
                    <Search className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setChatbotOpen(!chatbotOpen)}
          className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 transition-shadow hover:shadow-primary/50"
        >
          {chatbotOpen ? <ChevronRight className="w-6 h-6 rotate-90" /> : <MessageCircleQuestion className="w-6 h-6" />}
        </motion.button>
      </div>
    </DashboardLayout>
  );
}
