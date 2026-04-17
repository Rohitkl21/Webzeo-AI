import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, List as ListIcon, Plus, Search, Filter, 
  MoreVertical, Clock, Globe, AlertCircle, PauseCircle,
  CheckCircle2, Trash2, Download, Archive, Share2, Settings, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import DashboardLayout from '@/components/DashboardLayout';

// Mock data for projects
const MOCK_PROJECTS = [
  {
    id: '1',
    name: 'E-commerce Dashboard',
    description: 'Admin panel for managing products and orders.',
    thumbnail: 'https://picsum.photos/seed/ecommerce/400/250',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    type: 'Full-Stack',
    status: 'live',
    lastModified: '2 hours ago',
    createdAt: '2026-04-10T10:00:00Z',
  },
  {
    id: '2',
    name: 'Marketing Landing Page',
    description: 'High-converting landing page for SaaS product.',
    thumbnail: 'https://picsum.photos/seed/marketing/400/250',
    stack: ['Next.js', 'Tailwind'],
    type: 'Frontend',
    status: 'paused',
    lastModified: '1 day ago',
    createdAt: '2026-04-12T14:30:00Z',
  },
  {
    id: '3',
    name: 'User Authentication API',
    description: 'Microservice for handling user auth and sessions.',
    thumbnail: 'https://picsum.photos/seed/api/400/250',
    stack: ['Express', 'MongoDB', 'Redis'],
    type: 'API-only',
    status: 'error',
    lastModified: '3 days ago',
    createdAt: '2026-04-05T09:15:00Z',
  },
  {
    id: '4',
    name: 'Portfolio Website',
    description: 'Personal portfolio with blog and projects showcase.',
    thumbnail: 'https://picsum.photos/seed/portfolio/400/250',
    stack: ['Vue', 'Nuxt'],
    type: 'Frontend',
    status: 'draft',
    lastModified: '1 week ago',
    createdAt: '2026-03-20T11:45:00Z',
  },
  {
    id: '5',
    name: 'Fitness Tracker iOS App',
    description: 'Webzeo Mobile generated Expo app with offline sync. Features OTA update support.',
    thumbnail: 'https://picsum.photos/seed/mobileapp/400/250',
    stack: ['React Native', 'Expo', 'SQLite'],
    type: 'Mobile App',
    status: 'live',
    lastModified: '5 mins ago',
    createdAt: '2026-04-16T08:15:00Z',
  }
];

export default function Projects() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Artificial delay to simulate network request
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort logic
  const filteredProjects = MOCK_PROJECTS.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterBy === 'all') return matchesSearch;
    if (filterBy === 'deployed') return matchesSearch && project.status === 'live';
    if (filterBy === 'drafts') return matchesSearch && project.status === 'draft';
    return matchesSearch && project.type.toLowerCase() === filterBy.toLowerCase();
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'status') return a.status.localeCompare(b.status);
    if (sortBy === 'created') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return 0; // 'recent' is default, assuming mock data is somewhat ordered or we'd parse lastModified
  });

  const toggleProjectSelection = (id: string) => {
    setSelectedProjects(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedProjects.length === filteredProjects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(filteredProjects.map(p => p.id));
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'live': return <CheckCircle2 className="w-3.5 h-3.5 text-success" />;
      case 'paused': return <PauseCircle className="w-3.5 h-3.5 text-warning" />;
      case 'error': return <AlertCircle className="w-3.5 h-3.5 text-error" />;
      default: return <Globe className="w-3.5 h-3.5 text-text-muted" />;
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'live': return 'Live';
      case 'paused': return 'Paused';
      case 'error': return 'Error';
      default: return 'Draft';
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-text-primary tracking-tight">My Projects</h1>
            <p className="text-text-muted mt-1">Manage, deploy, and configure your applications.</p>
          </div>
          <Button onClick={() => navigate('/builder')} className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] shrink-0">
            <Plus className="w-4 h-4 mr-2" /> New Project
          </Button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-surface p-4 rounded-xl border border-card">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <Input 
                placeholder="Search projects..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background border-card focus-visible:ring-primary"
              />
            </div>
            
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-[140px] bg-background border-card">
                <Filter className="w-4 h-4 mr-2 text-text-muted" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="full-stack">Full-Stack</SelectItem>
                <SelectItem value="api-only">API-only</SelectItem>
                <SelectItem value="mobile">Mobile App</SelectItem>
                <SelectItem value="deployed">Deployed</SelectItem>
                <SelectItem value="drafts">Drafts</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] bg-background border-card">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recently Edited</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="created">Date Created</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            {selectedProjects.length > 0 && (
              <div className="flex items-center gap-2 mr-4">
                <span className="text-sm text-text-muted">{selectedProjects.length} selected</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="border-card bg-background">
                      Bulk Actions <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-surface border-card">
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="hover:bg-card cursor-pointer"><Share2 className="w-4 h-4 mr-2" /> Share Selected</DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-card cursor-pointer"><Download className="w-4 h-4 mr-2" /> Export</DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-card cursor-pointer"><Archive className="w-4 h-4 mr-2" /> Archive</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-card" />
                    <DropdownMenuItem className="text-error focus:bg-error/10 focus:text-error cursor-pointer">
                      <Trash2 className="w-4 h-4 mr-2" /> Delete Selected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            <div className="flex items-center bg-background rounded-md border border-card p-0.5 mt-2 md:mt-0">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 rounded-sm ${viewMode === 'grid' ? 'bg-surface shadow-sm text-primary' : 'text-text-muted hover:text-text-primary'}`}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 rounded-sm ${viewMode === 'list' ? 'bg-surface shadow-sm text-primary' : 'text-text-muted hover:text-text-primary'}`}
                onClick={() => setViewMode('list')}
              >
                <ListIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Project List/Grid/Loading */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="glass rounded-xl overflow-hidden shadow-sm">
                <Skeleton className="h-40 rounded-none border-0" />
                <div className="p-4 space-y-4">
                   <Skeleton className="h-5 w-3/4" />
                   <div className="space-y-2">
                     <Skeleton className="h-3 w-full" />
                     <Skeleton className="h-3 w-5/6" />
                   </div>
                   <div className="flex gap-2 pt-2">
                     <Skeleton className="h-4 w-16" />
                     <Skeleton className="h-4 w-12" />
                   </div>
                   <div className="pt-4 border-t border-card flex justify-between">
                     <Skeleton className="h-3 w-20" />
                     <Skeleton className="h-3 w-12" />
                   </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-24 bg-surface border border-card rounded-xl border-dashed">
            <Globe className="w-12 h-12 text-card mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2 font-display text-text-primary">No projects found</h3>
            <p className="text-text-muted mb-6">Try adjusting your search or filters, or create a new project.</p>
            <Button onClick={() => navigate('/builder')} className="bg-primary hover:bg-primary/90 text-white">Create Project</Button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project, i) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`group relative bg-surface/80 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden transition-all hover:shadow-[0_8px_30px_rgb(124,58,237,0.1)] ${selectedProjects.includes(project.id) ? 'border-primary ring-1 ring-primary' : 'hover:border-primary/50'}`}
              >
                <div className="absolute top-3 left-3 z-10">
                  <Checkbox 
                    checked={selectedProjects.includes(project.id)}
                    onCheckedChange={() => toggleProjectSelection(project.id)}
                    className={`bg-background/80 backdrop-blur-sm border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary ${selectedProjects.includes(project.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}
                  />
                </div>
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm border border-white/10 hover:bg-background text-text-primary">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-surface border-card">
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => navigate(`/builder/${project.id}`)} className="hover:bg-card cursor-pointer"><Settings className="w-4 h-4 mr-2" /> Open in Builder</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/project/${project.id}/settings`)} className="hover:bg-card cursor-pointer"><Settings className="w-4 h-4 mr-2" /> Project Settings</DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-card cursor-pointer"><Share2 className="w-4 h-4 mr-2" /> Share</DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator className="bg-card" />
                      <DropdownMenuItem className="text-error focus:bg-error/10 focus:text-error cursor-pointer">
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div 
                  className="h-40 bg-card relative overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/builder/${project.id}`)}
                >
                  <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60"></div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-md border-white/10 text-xs font-medium">
                      {project.type}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 
                      className="font-semibold text-lg text-text-primary truncate cursor-pointer hover:text-primary transition-colors font-display"
                      onClick={() => navigate(`/builder/${project.id}`)}
                    >
                      {project.name}
                    </h3>
                  </div>
                  <p className="text-sm text-text-muted line-clamp-2 mb-4 h-10">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.stack.map(tech => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-card text-text-muted border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-text-muted pt-4 border-t border-card">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {project.lastModified}
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      {getStatusIcon(project.status)}
                      <span className={
                        project.status === 'live' ? 'text-success' : 
                        project.status === 'error' ? 'text-error' : 
                        project.status === 'paused' ? 'text-warning' : 'text-text-muted'
                      }>
                        {getStatusText(project.status)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-surface border border-card rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-card bg-background/50 text-xs font-semibold text-text-muted uppercase tracking-wider">
              <div className="col-span-1 flex items-center justify-center">
                <Checkbox 
                  checked={selectedProjects.length === filteredProjects.length && filteredProjects.length > 0}
                  onCheckedChange={selectAll}
                  className="border-text-muted data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
              </div>
              <div className="col-span-4">Project Name</div>
              <div className="col-span-3">Tech Stack</div>
              <div className="col-span-2">Last Modified</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>
            <div className="divide-y divide-card">
              {filteredProjects.map((project) => (
                <div 
                  key={project.id} 
                  className={`grid grid-cols-12 gap-4 p-4 items-center transition-colors hover:bg-card/50 ${selectedProjects.includes(project.id) ? 'bg-primary/5' : ''}`}
                >
                  <div className="col-span-1 flex items-center justify-center">
                    <Checkbox 
                      checked={selectedProjects.includes(project.id)}
                      onCheckedChange={() => toggleProjectSelection(project.id)}
                      className="border-text-muted data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                  </div>
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md overflow-hidden shrink-0 bg-card border border-card">
                      <img src={project.thumbnail} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h3 
                        className="font-medium text-text-primary cursor-pointer hover:text-primary transition-colors"
                        onClick={() => navigate(`/builder/${project.id}`)}
                      >
                        {project.name}
                      </h3>
                      <p className="text-xs text-text-muted">{project.type}</p>
                    </div>
                  </div>
                  <div className="col-span-3 flex flex-wrap gap-1">
                    {project.stack.slice(0, 3).map(tech => (
                      <span key={tech} className="text-[10px] px-1.5 py-0.5 rounded bg-card text-text-muted border border-white/5">
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-card text-text-muted border border-white/5">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="col-span-2 text-sm text-text-muted flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {project.lastModified}
                  </div>
                  <div className="col-span-1 flex items-center gap-1.5 text-sm font-medium">
                    {getStatusIcon(project.status)}
                    <span className={
                      project.status === 'live' ? 'text-success' : 
                      project.status === 'error' ? 'text-error' : 
                      project.status === 'paused' ? 'text-warning' : 'text-text-muted'
                    }>
                      {getStatusText(project.status)}
                    </span>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-text-primary hover:bg-card">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-surface border-card">
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => navigate(`/builder/${project.id}`)} className="hover:bg-card cursor-pointer"><Settings className="w-4 h-4 mr-2" /> Open in Builder</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/project/${project.id}/settings`)} className="hover:bg-card cursor-pointer"><Settings className="w-4 h-4 mr-2" /> Project Settings</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-card cursor-pointer"><Share2 className="w-4 h-4 mr-2" /> Share</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator className="bg-card" />
                        <DropdownMenuItem className="text-error focus:bg-error/10 focus:text-error cursor-pointer">
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
