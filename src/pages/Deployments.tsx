import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, Globe, CheckCircle2, XCircle, Clock, RotateCcw, 
  MoreVertical, ExternalLink, Terminal, Search, Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger, DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import DashboardLayout from '@/components/DashboardLayout';
import DeployModal from '@/components/deploy/DeployModal';

const MOCK_DEPLOYMENTS = [
  {
    id: 'dep_1',
    project: 'E-commerce Dashboard',
    environment: 'Production',
    status: 'live',
    url: 'https://ecommerce-admin.webzeo.app',
    deployedAt: '10 mins ago',
    duration: '45s',
    provider: 'Webzeo Cloud'
  },
  {
    id: 'dep_2',
    project: 'Marketing Landing Page',
    environment: 'Preview',
    status: 'building',
    url: 'https://preview-xyz.webzeo.app',
    deployedAt: 'Just now',
    duration: '-',
    provider: 'Vercel'
  },
  {
    id: 'dep_3',
    project: 'User Authentication API',
    environment: 'Production',
    status: 'failed',
    url: '-',
    deployedAt: '2 hours ago',
    duration: '1m 12s',
    provider: 'Railway'
  },
  {
    id: 'dep_4',
    project: 'Portfolio Website',
    environment: 'Production',
    status: 'rolled_back',
    url: 'https://portfolio.webzeo.app',
    deployedAt: '1 day ago',
    duration: '30s',
    provider: 'Netlify'
  },
  {
    id: 'dep_5',
    project: 'E-commerce Dashboard',
    environment: 'Preview',
    status: 'live',
    url: 'https://pr-12.ecommerce.webzeo.app',
    deployedAt: '2 days ago',
    duration: '42s',
    provider: 'Webzeo Cloud'
  }
];

export default function Deployments() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  const filteredDeployments = MOCK_DEPLOYMENTS.filter(dep => {
    const matchesSearch = dep.project.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && dep.environment.toLowerCase() === activeTab;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'live': 
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Live</Badge>;
      case 'building': 
        return <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 animate-pulse"><Rocket className="w-3 h-3 mr-1" /> Building</Badge>;
      case 'failed': 
        return <Badge variant="secondary" className="bg-error/10 text-error border-error/20"><XCircle className="w-3 h-3 mr-1" /> Failed</Badge>;
      case 'rolled_back': 
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20"><RotateCcw className="w-3 h-3 mr-1" /> Rolled Back</Badge>;
      default: 
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-text-primary tracking-tight">Deployments</h1>
            <p className="text-text-muted mt-1">Monitor and manage your application deployments.</p>
          </div>
          <Button onClick={() => setIsDeployModalOpen(true)} className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]">
            <Rocket className="w-4 h-4 mr-2" /> Deploy Project
          </Button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-surface p-4 rounded-xl border border-card">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="bg-background border border-card">
              <TabsTrigger value="all">All Environments</TabsTrigger>
              <TabsTrigger value="production">Production</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="development">Development</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <Input 
                placeholder="Search deployments..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background border-card focus-visible:ring-primary"
              />
            </div>
            <Button variant="outline" size="icon" className="border-card bg-background shrink-0">
              <Filter className="w-4 h-4 text-text-muted" />
            </Button>
          </div>
        </div>

        {/* Deployments Table */}
        <div className="bg-surface border border-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-text-muted uppercase bg-background/50 border-b border-card">
                <tr>
                  <th className="px-6 py-4 font-medium">Project</th>
                  <th className="px-6 py-4 font-medium">Environment</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">URL</th>
                  <th className="px-6 py-4 font-medium">Deployed At</th>
                  <th className="px-6 py-4 font-medium">Duration</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card">
                {filteredDeployments.map((dep, i) => (
                  <motion.tr 
                    key={dep.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-card/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-text-primary">{dep.project}</div>
                      <div className="text-xs text-text-muted mt-0.5">{dep.provider}</div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="bg-background border-card text-text-muted">
                        {dep.environment}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(dep.status)}
                    </td>
                    <td className="px-6 py-4">
                      {dep.url !== '-' ? (
                        <a href={dep.url} target="_blank" rel="noreferrer" className="flex items-center text-primary hover:underline max-w-[200px] truncate">
                          {dep.url.replace('https://', '')} <ExternalLink className="w-3 h-3 ml-1 shrink-0" />
                        </a>
                      ) : (
                        <span className="text-text-muted">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-text-muted flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {dep.deployedAt}
                    </td>
                    <td className="px-6 py-4 text-text-muted font-mono text-xs">
                      {dep.duration}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-text-primary hover:bg-card opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-surface border-card">
                          <DropdownMenuItem className="hover:bg-card cursor-pointer"><Terminal className="w-4 h-4 mr-2" /> View Build Logs</DropdownMenuItem>
                          {dep.url !== '-' && (
                            <DropdownMenuItem className="hover:bg-card cursor-pointer"><ExternalLink className="w-4 h-4 mr-2" /> Open URL</DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator className="bg-card" />
                          <DropdownMenuItem className="text-warning focus:bg-warning/10 focus:text-warning cursor-pointer">
                            <RotateCcw className="w-4 h-4 mr-2" /> Rollback to this
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            
            {filteredDeployments.length === 0 && (
              <div className="text-center py-12">
                <Globe className="w-12 h-12 text-card mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-1">No deployments found</h3>
                <p className="text-text-muted">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <DeployModal 
        isOpen={isDeployModalOpen} 
        onClose={() => setIsDeployModalOpen(false)} 
        projectName="Selected Project" 
      />
    </DashboardLayout>
  );
}
