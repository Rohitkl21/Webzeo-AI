import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Key, Plus, Search, MoreVertical, Shield, Link as LinkIcon, 
  Trash2, CheckCircle2, AlertTriangle, RefreshCw, Eye, EyeOff,
  Activity, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger, DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from 'sonner';

const SERVICES = [
  { id: 'openai', name: 'OpenAI', color: 'bg-green-500' },
  { id: 'anthropic', name: 'Anthropic', color: 'bg-amber-700' },
  { id: 'stripe', name: 'Stripe', color: 'bg-indigo-500' },
  { id: 'twilio', name: 'Twilio', color: 'bg-red-500' },
  { id: 'sendgrid', name: 'SendGrid', color: 'bg-blue-500' },
  { id: 'aws', name: 'AWS', color: 'bg-orange-500' },
  { id: 'github', name: 'GitHub', color: 'bg-gray-800' },
  { id: 'supabase', name: 'Supabase', color: 'bg-emerald-500' },
];

const MOCK_KEYS = [
  {
    id: 'key_1',
    name: 'Production Stripe Key',
    service: 'stripe',
    maskedKey: 'sk_live_...8f92',
    linkedProjects: ['E-commerce Dashboard'],
    lastUsed: '2 mins ago',
    createdAt: '2025-10-15',
    status: 'active'
  },
  {
    id: 'key_2',
    name: 'OpenAI GPT-4 Access',
    service: 'openai',
    maskedKey: 'sk-...a1b2',
    linkedProjects: ['Marketing Landing Page', 'AI Assistant'],
    lastUsed: '1 hour ago',
    createdAt: '2026-01-20',
    status: 'active'
  },
  {
    id: 'key_3',
    name: 'Legacy Twilio Auth',
    service: 'twilio',
    maskedKey: 'AC...99x1',
    linkedProjects: [],
    lastUsed: '3 months ago',
    createdAt: '2025-05-10',
    status: 'expiring' // Older than 90 days
  }
];

export default function ApiKeys() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [testingKeyId, setTestingKeyId] = useState<string | null>(null);

  const filteredKeys = MOCK_KEYS.filter(key => 
    key.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    key.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getServiceDetails = (serviceId: string) => {
    return SERVICES.find(s => s.id === serviceId) || { name: serviceId, color: 'bg-gray-500' };
  };

  const handleTestConnection = (id: string) => {
    setTestingKeyId(id);
    setTimeout(() => {
      setTestingKeyId(null);
      toast.success('Connection successful! Key is valid.');
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-text-primary tracking-tight">API Key Manager</h1>
            <p className="text-text-muted mt-1">Secure vault for all your external service credentials.</p>
            <p className="text-xs text-primary/80 mt-2 flex items-center gap-1">
              <Shield className="w-3 h-3" /> Keys updated here automatically sync with your Platform Setup selections.
            </p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)} className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]">
            <Plus className="w-4 h-4 mr-2" /> Add New Key
          </Button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-surface p-4 rounded-xl border border-card">
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input 
              placeholder="Search keys by name or service..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background border-card focus-visible:ring-primary"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-text-muted bg-background px-3 py-1.5 rounded-md border border-card">
            <Shield className="w-4 h-4 text-success" />
            <span>AES-256 Encrypted at Rest</span>
          </div>
        </div>

        {/* Keys Table */}
        <div className="bg-surface border border-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-text-muted uppercase bg-background/50 border-b border-card">
                <tr>
                  <th className="px-6 py-4 font-medium">Name & Service</th>
                  <th className="px-6 py-4 font-medium">Key Value</th>
                  <th className="px-6 py-4 font-medium">Linked Projects</th>
                  <th className="px-6 py-4 font-medium">Last Used</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card">
                {filteredKeys.map((key, i) => {
                  const service = getServiceDetails(key.service);
                  return (
                    <motion.tr 
                      key={key.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-card/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-md flex items-center justify-center text-white font-bold text-xs ${service.color}`}>
                            {service.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-text-primary">{key.name}</div>
                            <div className="text-xs text-text-muted mt-0.5">{service.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 font-mono text-xs bg-background border border-card px-2 py-1 rounded w-fit">
                          <Key className="w-3 h-3 text-text-muted" />
                          {key.maskedKey}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {key.linkedProjects.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {key.linkedProjects.map(p => (
                              <Badge key={p} variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-[10px]">
                                {p}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-text-muted text-xs italic">Unlinked</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-text-muted text-xs flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" /> {key.lastUsed}
                      </td>
                      <td className="px-6 py-4">
                        {key.status === 'active' ? (
                          <Badge variant="secondary" className="bg-success/10 text-success border-success/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Active</Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20"><AlertTriangle className="w-3 h-3 mr-1" /> Expiring Soon</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 border-card bg-background hover:bg-card"
                            onClick={() => handleTestConnection(key.id)}
                            disabled={testingKeyId === key.id}
                          >
                            {testingKeyId === key.id ? <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5 mr-1.5" />}
                            Test
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-text-primary hover:bg-card">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-surface border-card">
                              <DropdownMenuItem className="hover:bg-card cursor-pointer"><LinkIcon className="w-4 h-4 mr-2" /> Link to Project</DropdownMenuItem>
                              <DropdownMenuItem className="hover:bg-card cursor-pointer"><Clock className="w-4 h-4 mr-2" /> View Audit Log</DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-card" />
                              <DropdownMenuItem className="text-error focus:bg-error/10 focus:text-error cursor-pointer">
                                <Trash2 className="w-4 h-4 mr-2" /> Delete Key
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
            
            {filteredKeys.length === 0 && (
              <div className="text-center py-12">
                <Key className="w-12 h-12 text-card mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-1">No API keys found</h3>
                <p className="text-text-muted">Try adjusting your search or add a new key.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Key Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-surface border-card text-text-primary">
          <DialogHeader>
            <DialogTitle>Add New API Key</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Service</Label>
              <Select>
                <SelectTrigger className="bg-background border-card">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent className="bg-surface border-card">
                  {SERVICES.map(s => (
                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                  ))}
                  <SelectItem value="custom">Custom Service...</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Key Name</Label>
              <Input placeholder="e.g., Production Stripe Key" className="bg-background border-card" />
            </div>
            <div className="space-y-2">
              <Label>API Key Value</Label>
              <Input type="password" placeholder="sk_live_..." className="bg-background border-card font-mono" />
              <p className="text-xs text-text-muted flex items-center gap-1 mt-1">
                <Shield className="w-3 h-3" /> Encrypted at rest. Never shown in full again.
              </p>
            </div>
            <div className="space-y-2">
              <Label>Link to Projects (Optional)</Label>
              <Select>
                <SelectTrigger className="bg-background border-card">
                  <SelectValue placeholder="Select projects to auto-inject" />
                </SelectTrigger>
                <SelectContent className="bg-surface border-card">
                  <SelectItem value="p1">E-commerce Dashboard</SelectItem>
                  <SelectItem value="p2">Marketing Landing Page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="border-card bg-background hover:bg-card">Cancel</Button>
            <Button onClick={() => {
              toast.success('API Key added securely');
              setIsAddModalOpen(false);
            }} className="bg-primary hover:bg-primary/90 text-white">Save Key</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </DashboardLayout>
  );
}
