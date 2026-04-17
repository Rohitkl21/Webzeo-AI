import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Settings, History, Users, Globe, Webhook, ShieldAlert, 
  Save, ArrowLeft, Trash2, Key, GitCommit, RotateCcw,
  Eye, GitCompare, Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from 'sonner';

// Mock data
const MOCK_VERSIONS = [
  { id: 'v5', timestamp: '10 mins ago', description: 'Added dark mode toggle', author: 'AI Assistant', type: 'ai' },
  { id: 'v4', timestamp: '2 hours ago', description: 'Updated hero section copy', author: 'You', type: 'manual' },
  { id: 'v3', timestamp: '1 day ago', description: 'Integrated Stripe payments', author: 'AI Assistant', type: 'ai' },
  { id: 'v2', timestamp: '2 days ago', description: 'Snapshot: Before Stripe', author: 'You', type: 'snapshot' },
  { id: 'v1', timestamp: '3 days ago', description: 'Initial project generation', author: 'AI Assistant', type: 'ai' },
];

export default function ProjectSettings() {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [projectName, setProjectName] = useState('E-commerce Dashboard');
  const [projectDesc, setProjectDesc] = useState('Admin panel for managing products and orders.');
  
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Settings saved successfully');
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/projects')} className="text-text-muted hover:text-text-primary">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold font-display text-text-primary tracking-tight">{projectName}</h1>
              <p className="text-text-muted mt-1">Manage project settings and history.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate(`/builder/${siteId}`)} className="border-card bg-surface hover:bg-card">
              Open in Builder
            </Button>
            <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90 text-white">
              <Save className="w-4 h-4 mr-2" /> {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-surface border border-card p-1 rounded-lg mb-6 flex flex-wrap h-auto">
            <TabsTrigger value="general" className="data-[state=active]:bg-card data-[state=active]:text-text-primary"><Settings className="w-4 h-4 mr-2" /> General</TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-card data-[state=active]:text-text-primary"><History className="w-4 h-4 mr-2" /> Version History</TabsTrigger>
            <TabsTrigger value="collaborators" className="data-[state=active]:bg-card data-[state=active]:text-text-primary"><Users className="w-4 h-4 mr-2" /> Collaborators</TabsTrigger>
            <TabsTrigger value="env" className="data-[state=active]:bg-card data-[state=active]:text-text-primary"><Key className="w-4 h-4 mr-2" /> Environment Variables</TabsTrigger>
            <TabsTrigger value="domains" className="data-[state=active]:bg-card data-[state=active]:text-text-primary"><Globe className="w-4 h-4 mr-2" /> Domains</TabsTrigger>
            <TabsTrigger value="webhooks" className="data-[state=active]:bg-card data-[state=active]:text-text-primary"><Webhook className="w-4 h-4 mr-2" /> Webhooks</TabsTrigger>
          </TabsList>

          {/* GENERAL TAB */}
          <TabsContent value="general" className="space-y-6">
            <div className="bg-surface border border-card rounded-xl p-6 space-y-6">
              <h3 className="text-lg font-semibold font-display">Project Details</h3>
              
              <div className="space-y-4 max-w-2xl">
                <div className="space-y-2">
                  <Label>Project Name</Label>
                  <Input value={projectName} onChange={(e) => setProjectName(e.target.value)} className="bg-background border-card" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={projectDesc} onChange={(e) => setProjectDesc(e.target.value)} className="bg-background border-card min-h-[100px]" />
                </div>
              </div>

              <div className="pt-6 border-t border-card">
                <h4 className="text-sm font-medium mb-4">Tech Stack (Read-only)</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-card text-text-primary">React</Badge>
                  <Badge variant="secondary" className="bg-card text-text-primary">Node.js</Badge>
                  <Badge variant="secondary" className="bg-card text-text-primary">Tailwind CSS</Badge>
                  <Badge variant="secondary" className="bg-card text-text-primary">PostgreSQL</Badge>
                </div>
              </div>
            </div>

            <div className="bg-error/5 border border-error/20 rounded-xl p-6 space-y-6">
              <h3 className="text-lg font-semibold font-display text-error flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" /> Danger Zone
              </h3>
              
              <div className="flex items-center justify-between p-4 border border-error/20 rounded-lg bg-background/50">
                <div>
                  <h4 className="font-medium text-text-primary">Transfer Ownership</h4>
                  <p className="text-sm text-text-muted">Transfer this project to another user or organization.</p>
                </div>
                <Button variant="outline" className="border-card hover:bg-card">Transfer</Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-error/20 rounded-lg bg-background/50">
                <div>
                  <h4 className="font-medium text-text-primary">Delete Project</h4>
                  <p className="text-sm text-text-muted">Once you delete a project, there is no going back. Please be certain.</p>
                </div>
                <Button variant="destructive" className="bg-error hover:bg-error/90 text-white">Delete Project</Button>
              </div>
            </div>
          </TabsContent>

          {/* VERSION HISTORY TAB */}
          <TabsContent value="history" className="space-y-6">
            <div className="bg-surface border border-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold font-display">Version History</h3>
                  <p className="text-sm text-text-muted">Track changes, compare versions, and restore previous states.</p>
                </div>
                <Button variant="outline" className="border-card bg-background hover:bg-card">
                  <Camera className="w-4 h-4 mr-2" /> Create Snapshot
                </Button>
              </div>

              <div className="relative border-l-2 border-card ml-3 space-y-8 pb-4">
                {MOCK_VERSIONS.map((version, i) => (
                  <div key={version.id} className="relative pl-8">
                    <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-surface ${
                      version.type === 'ai' ? 'bg-primary' : 
                      version.type === 'snapshot' ? 'bg-success' : 'bg-accent'
                    }`}></div>
                    
                    <div className="bg-background border border-card rounded-lg p-4 hover:border-primary/30 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-text-primary">{version.description}</span>
                            {version.type === 'snapshot' && <Badge variant="secondary" className="bg-success/10 text-success text-[10px]">Snapshot</Badge>}
                            {i === 0 && <Badge variant="secondary" className="bg-primary/10 text-primary text-[10px]">Current</Badge>}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-text-muted">
                            <span className="flex items-center gap-1"><GitCommit className="w-3 h-3" /> {version.id}</span>
                            <span>•</span>
                            <span>{version.timestamp}</span>
                            <span>•</span>
                            <span>by {version.author}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          <Button variant="ghost" size="sm" className="h-8 text-text-muted hover:text-text-primary hover:bg-card">
                            <Eye className="w-4 h-4 mr-2" /> View Code
                          </Button>
                          {i !== 0 && (
                            <>
                              <Button variant="ghost" size="sm" className="h-8 text-text-muted hover:text-text-primary hover:bg-card">
                                <GitCompare className="w-4 h-4 mr-2" /> Compare
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 border-card hover:bg-card">
                                <RotateCcw className="w-4 h-4 mr-2" /> Restore
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* COLLABORATORS TAB */}
          <TabsContent value="collaborators" className="space-y-6">
            <div className="bg-surface border border-card rounded-xl p-6">
              <h3 className="text-lg font-semibold font-display mb-2">Live Guest Collaboration</h3>
              <p className="text-sm text-text-muted mb-4">Generate temporary links for guests to view and comment on your project without needing a Webzeo account. Perfect for client reviews.</p>
              
              <div className="flex items-center gap-3 mb-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <Button className="bg-primary hover:bg-primary/90 text-white shrink-0" onClick={() => toast.success("Guest link copied to clipboard! (Mock)")}>Generate Guest Link</Button>
                <div className="text-sm text-text-muted flex-1">
                  Expires in <select className="bg-transparent border-b border-card outline-none text-text-primary ml-1 cursor-pointer"><option>24 hours</option><option>7 days</option></select>
                </div>
              </div>

              <h3 className="text-lg font-semibold font-display mb-2">Team Members</h3>
              <p className="text-sm text-text-muted mb-6">Invite permanent team members to work on this project.</p>
              
              <div className="flex items-center gap-3 mb-8">
                <Input placeholder="Email address" className="bg-background border-card max-w-sm" />
                <Button className="bg-primary hover:bg-primary/90 text-white">Invite</Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background border border-card rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">Y</div>
                    <div>
                      <p className="font-medium text-sm text-text-primary">You (Owner)</p>
                      <p className="text-xs text-text-muted">you@example.com</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-card">Owner</Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ENV VARIABLES TAB */}
          <TabsContent value="env" className="space-y-6">
            <div className="bg-surface border border-card rounded-xl p-6">
              <h3 className="text-lg font-semibold font-display mb-2">Environment Variables</h3>
              <p className="text-sm text-text-muted mb-6">Manage secrets and configuration for your project.</p>
              
              <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-4"><Label>Key</Label></div>
                <div className="col-span-7"><Label>Value</Label></div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4">
                    <Input value="DATABASE_URL" readOnly className="bg-background border-card font-mono text-sm" />
                  </div>
                  <div className="col-span-7">
                    <Input type="password" value="postgres://user:pass@host:5432/db" readOnly className="bg-background border-card font-mono text-sm" />
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <Button variant="ghost" size="icon" className="text-error hover:text-error hover:bg-error/10"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4">
                    <Input value="STRIPE_SECRET_KEY" readOnly className="bg-background border-card font-mono text-sm" />
                  </div>
                  <div className="col-span-7">
                    <Input type="password" value="sk_test_123456789" readOnly className="bg-background border-card font-mono text-sm" />
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <Button variant="ghost" size="icon" className="text-error hover:text-error hover:bg-error/10"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-card">
                <h4 className="text-sm font-medium mb-3">Add New Variable</h4>
                <div className="grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-4">
                    <Input placeholder="API_KEY" className="bg-background border-card font-mono text-sm" />
                  </div>
                  <div className="col-span-7">
                    <Input placeholder="Value" className="bg-background border-card font-mono text-sm" />
                  </div>
                  <div className="col-span-1">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">Add</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* DOMAINS TAB */}
          <TabsContent value="domains" className="space-y-6">
            <div className="bg-surface border border-card rounded-xl p-6">
              <h3 className="text-lg font-semibold font-display mb-2">Custom Domains</h3>
              <p className="text-sm text-text-muted mb-6">Connect a custom domain to your project.</p>
              
              <div className="flex items-center gap-3 mb-8">
                <Input placeholder="www.example.com" className="bg-background border-card max-w-sm" />
                <Button className="bg-primary hover:bg-primary/90 text-white">Add Domain</Button>
              </div>

              <div className="p-4 bg-background border border-card rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-text-muted" />
                  <div>
                    <p className="font-medium text-sm text-text-primary">project-123.webzeo.app</p>
                    <p className="text-xs text-text-muted">Default Domain</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-success/10 text-success">Active</Badge>
              </div>
            </div>
          </TabsContent>

          {/* WEBHOOKS TAB */}
          <TabsContent value="webhooks" className="space-y-6">
            <div className="bg-surface border border-card rounded-xl p-6">
              <h3 className="text-lg font-semibold font-display mb-2">Webhooks</h3>
              <p className="text-sm text-text-muted mb-6">Trigger external services on deployment events.</p>
              
              <div className="flex items-center gap-3 mb-8">
                <Input placeholder="https://api.example.com/webhook" className="bg-background border-card max-w-sm" />
                <Button className="bg-primary hover:bg-primary/90 text-white">Add Webhook</Button>
              </div>
              
              <div className="text-center py-8 text-text-muted text-sm border border-dashed border-card rounded-lg">
                No webhooks configured yet.
              </div>
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </DashboardLayout>
  );
}
