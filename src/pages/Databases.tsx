import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Database, Plus, Search, MoreVertical, Server, 
  Settings, ExternalLink, Trash2, Activity, HardDrive
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

const MOCK_DATABASES = [
  {
    id: 'db_1',
    name: 'ecommerce-prod-db',
    type: 'PostgreSQL',
    provider: 'Webzeo Hosted',
    status: 'healthy',
    size: '2.4 GB',
    region: 'us-east-1',
    linkedProjects: ['E-commerce Dashboard']
  },
  {
    id: 'db_2',
    name: 'marketing-analytics',
    type: 'MongoDB',
    provider: 'External',
    status: 'healthy',
    size: '-',
    region: 'eu-central-1',
    linkedProjects: ['Marketing Landing Page']
  },
  {
    id: 'db_3',
    name: 'user-sessions-cache',
    type: 'Redis',
    provider: 'Webzeo Hosted',
    status: 'warning',
    size: '1.1 GB',
    region: 'us-west-2',
    linkedProjects: ['User Authentication API']
  }
];

export default function Databases() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [connectionType, setConnectionType] = useState<'hosted' | 'external'>('hosted');

  const filteredDbs = MOCK_DATABASES.filter(db => 
    db.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    db.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDbIcon = (type: string) => {
    // In a real app, use specific SVG logos. Using generic Server/Database for now.
    return <Database className="w-5 h-5 text-primary" />;
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-text-primary tracking-tight">Databases</h1>
            <p className="text-text-muted mt-1">Manage hosted databases and external connections.</p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)} className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]">
            <Plus className="w-4 h-4 mr-2" /> New Database
          </Button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-surface p-4 rounded-xl border border-card">
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input 
              placeholder="Search databases..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background border-card focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Databases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDbs.map((db, i) => (
            <motion.div 
              key={db.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-surface border border-card rounded-xl overflow-hidden hover:border-primary/30 transition-colors group cursor-pointer"
              onClick={() => navigate(`/databases/${db.id}`)}
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      {getDbIcon(db.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary font-display group-hover:text-primary transition-colors">{db.name}</h3>
                      <p className="text-xs text-text-muted">{db.type} • {db.provider}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-text-primary hover:bg-card -mr-2 -mt-2">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-surface border-card" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenuItem onClick={() => navigate(`/databases/${db.id}`)} className="hover:bg-card cursor-pointer"><ExternalLink className="w-4 h-4 mr-2" /> Open Studio</DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-card cursor-pointer"><Settings className="w-4 h-4 mr-2" /> Settings</DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-card" />
                      <DropdownMenuItem className="text-error focus:bg-error/10 focus:text-error cursor-pointer">
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-background rounded-lg p-3 border border-card">
                    <div className="text-xs text-text-muted mb-1 flex items-center gap-1"><Activity className="w-3 h-3" /> Status</div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${db.status === 'healthy' ? 'bg-success' : 'bg-warning'}`}></div>
                      <span className="text-sm font-medium capitalize">{db.status}</span>
                    </div>
                  </div>
                  <div className="bg-background rounded-lg p-3 border border-card">
                    <div className="text-xs text-text-muted mb-1 flex items-center gap-1"><HardDrive className="w-3 h-3" /> Size</div>
                    <div className="text-sm font-medium">{db.size}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-card flex items-center justify-between text-xs text-text-muted">
                  <span>{db.region}</span>
                  <span>{db.linkedProjects.length} linked project(s)</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredDbs.length === 0 && (
          <div className="text-center py-24 bg-surface border border-card rounded-xl border-dashed">
            <Database className="w-12 h-12 text-card mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2 font-display text-text-primary">No databases found</h3>
            <p className="text-text-muted mb-6">Create a new hosted database or connect an external one.</p>
            <Button onClick={() => setIsAddModalOpen(true)} className="bg-primary hover:bg-primary/90 text-white">New Database</Button>
          </div>
        )}
      </div>

      {/* Add Database Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-surface border-card text-text-primary">
          <DialogHeader>
            <DialogTitle>Add Database</DialogTitle>
          </DialogHeader>
          
          <div className="flex gap-2 p-1 bg-background rounded-lg border border-card mb-4">
            <button 
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${connectionType === 'hosted' ? 'bg-surface shadow-sm text-primary' : 'text-text-muted hover:text-text-primary'}`}
              onClick={() => setConnectionType('hosted')}
            >
              Webzeo Hosted
            </button>
            <button 
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${connectionType === 'external' ? 'bg-surface shadow-sm text-primary' : 'text-text-muted hover:text-text-primary'}`}
              onClick={() => setConnectionType('external')}
            >
              Connect External
            </button>
          </div>

          <div className="space-y-4 py-2">
            {connectionType === 'hosted' ? (
              <>
                <div className="space-y-2">
                  <Label>Database Engine</Label>
                  <Select defaultValue="postgres">
                    <SelectTrigger className="bg-background border-card">
                      <SelectValue placeholder="Select engine" />
                    </SelectTrigger>
                    <SelectContent className="bg-surface border-card">
                      <SelectItem value="postgres">PostgreSQL</SelectItem>
                      <SelectItem value="mysql">MySQL</SelectItem>
                      <SelectItem value="redis">Redis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Database Name</Label>
                  <Input placeholder="e.g., my-app-db" className="bg-background border-card" />
                </div>
                <div className="space-y-2">
                  <Label>Region</Label>
                  <Select defaultValue="us-east-1">
                    <SelectTrigger className="bg-background border-card">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent className="bg-surface border-card">
                      <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                      <SelectItem value="eu-central-1">EU (Frankfurt)</SelectItem>
                      <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label>Database Type</Label>
                  <Select defaultValue="postgres">
                    <SelectTrigger className="bg-background border-card">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-surface border-card">
                      <SelectItem value="postgres">PostgreSQL</SelectItem>
                      <SelectItem value="mysql">MySQL</SelectItem>
                      <SelectItem value="mongodb">MongoDB</SelectItem>
                      <SelectItem value="supabase">Supabase</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Connection String (URI)</Label>
                  <Input type="password" placeholder="postgres://user:pass@host:5432/db" className="bg-background border-card font-mono text-sm" />
                  <p className="text-xs text-text-muted mt-1">Stored securely and injected as an environment variable.</p>
                </div>
                <div className="space-y-2">
                  <Label>Display Name</Label>
                  <Input placeholder="e.g., External Prod DB" className="bg-background border-card" />
                </div>
              </>
            )}
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="border-card bg-background hover:bg-card">Cancel</Button>
            <Button onClick={() => {
              toast.success(connectionType === 'hosted' ? 'Provisioning database...' : 'External database connected');
              setIsAddModalOpen(false);
            }} className="bg-primary hover:bg-primary/90 text-white">
              {connectionType === 'hosted' ? 'Create Database' : 'Connect'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
