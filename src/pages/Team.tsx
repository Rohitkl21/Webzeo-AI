import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Plus, Search, MoreVertical, Shield, Mail, 
  Activity, Settings, Building2, Check, X, Clock, Globe
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from 'sonner';

const MOCK_MEMBERS = [
  { id: '1', name: 'Rohit Patel', email: 'rohitpatel11032004@gmail.com', role: 'Owner', status: 'Active', avatar: '' },
  { id: '2', name: 'Jane Doe', email: 'jane@example.com', role: 'Admin', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=jane' },
  { id: '3', name: 'Alex Smith', email: 'alex@example.com', role: 'Developer', status: 'Pending', avatar: '' },
  { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Viewer', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=sarah' },
];

const MOCK_ACTIVITY = [
  { id: '1', user: 'Jane Doe', action: 'deployed', target: 'E-commerce Dashboard', time: '10 mins ago' },
  { id: '2', user: 'Rohit Patel', action: 'invited', target: 'Alex Smith', time: '2 hours ago' },
  { id: '3', user: 'Sarah Wilson', action: 'commented on', target: 'Marketing Landing Page', time: '1 day ago' },
  { id: '4', user: 'Jane Doe', action: 'created project', target: 'User Authentication API', time: '2 days ago' },
];

const MOCK_TEAM_PROJECTS = [
  { id: '1', name: 'E-commerce Dashboard', type: 'Full-Stack', lastModified: '2 hours ago' },
  { id: '2', name: 'Marketing Landing Page', type: 'Frontend', lastModified: '1 day ago' },
  { id: '3', name: 'User Authentication API', type: 'API-only', lastModified: '2 days ago' },
];

export default function Team() {
  const [activeTab, setActiveTab] = useState('members');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Developer');

  const handleInvite = () => {
    if (!inviteEmail) return;
    toast.success(`Invitation sent to ${inviteEmail} via Resend`);
    setIsInviteModalOpen(false);
    setInviteEmail('');
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display text-text-primary tracking-tight">Acme Corp Team</h1>
              <p className="text-text-muted mt-1 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" /> acme-corp.webzeo.app
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-card bg-surface hover:bg-card">
              <Settings className="w-4 h-4 mr-2" /> Workspace Settings
            </Button>
            <Button onClick={() => setIsInviteModalOpen(true)} className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]">
              <Plus className="w-4 h-4 mr-2" /> Invite Member
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-surface border border-card p-1 rounded-lg mb-6">
            <TabsTrigger value="members" className="data-[state=active]:bg-card data-[state=active]:text-text-primary"><Users className="w-4 h-4 mr-2" /> Members & Roles</TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-card data-[state=active]:text-text-primary"><Globe className="w-4 h-4 mr-2" /> Team Projects</TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-card data-[state=active]:text-text-primary"><Activity className="w-4 h-4 mr-2" /> Activity Feed</TabsTrigger>
            <TabsTrigger value="permissions" className="data-[state=active]:bg-card data-[state=active]:text-text-primary"><Shield className="w-4 h-4 mr-2" /> Permissions Matrix</TabsTrigger>
          </TabsList>

          {/* MEMBERS TAB */}
          <TabsContent value="members" className="space-y-6">
            <div className="bg-surface border border-card rounded-xl overflow-hidden">
              <div className="p-4 border-b border-card flex items-center justify-between bg-background/50">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input placeholder="Search members..." className="pl-9 bg-background border-card h-9" />
                </div>
              </div>
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-text-muted uppercase bg-background/30 border-b border-card">
                  <tr>
                    <th className="px-6 py-4 font-medium">User</th>
                    <th className="px-6 py-4 font-medium">Role</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-card">
                  {MOCK_MEMBERS.map((member) => (
                    <tr key={member.id} className="hover:bg-card/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-card">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="bg-primary/20 text-primary">{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-text-primary">{member.name}</div>
                            <div className="text-xs text-text-muted">{member.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="bg-background border-card">
                          {member.role}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        {member.status === 'Active' ? (
                          <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Active</Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Pending Invite</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-text-primary hover:bg-card">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-surface border-card">
                            <DropdownMenuItem className="hover:bg-card cursor-pointer">Change Role</DropdownMenuItem>
                            {member.status === 'Pending' && (
                              <DropdownMenuItem className="hover:bg-card cursor-pointer">Resend Invite</DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator className="bg-card" />
                            <DropdownMenuItem className="text-error focus:bg-error/10 focus:text-error cursor-pointer">
                              Remove from Team
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* PROJECTS TAB */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_TEAM_PROJECTS.map((project) => (
                <div key={project.id} className="bg-surface border border-card rounded-xl p-5 hover:border-primary/30 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center">
                      <Globe className="w-5 h-5 text-text-muted" />
                    </div>
                    <Badge variant="secondary" className="bg-background border-card">{project.type}</Badge>
                  </div>
                  <h3 className="font-semibold text-text-primary font-display mb-1">{project.name}</h3>
                  <p className="text-xs text-text-muted flex items-center gap-1.5 mt-4">
                    <Clock className="w-3.5 h-3.5" /> Updated {project.lastModified}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ACTIVITY TAB */}
          <TabsContent value="activity" className="space-y-6">
            <div className="bg-surface border border-card rounded-xl p-6">
              <h3 className="text-lg font-semibold font-display mb-6">Recent Activity</h3>
              <div className="relative border-l-2 border-card ml-3 space-y-8 pb-4">
                {MOCK_ACTIVITY.map((activity) => (
                  <div key={activity.id} className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-surface bg-primary"></div>
                    <div className="bg-background border border-card rounded-lg p-4">
                      <p className="text-sm text-text-primary">
                        <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.target}</span>
                      </p>
                      <p className="text-xs text-text-muted mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* PERMISSIONS TAB */}
          <TabsContent value="permissions" className="space-y-6">
            <div className="bg-surface border border-card rounded-xl overflow-hidden">
              <div className="p-6 border-b border-card bg-background/50">
                <h3 className="text-lg font-semibold font-display">Role Permissions</h3>
                <p className="text-sm text-text-muted">Matrix of what each role can do within the workspace.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-text-muted uppercase bg-surface border-b border-card">
                    <tr>
                      <th className="px-6 py-4 font-medium">Permission</th>
                      <th className="px-6 py-4 font-medium text-center">Owner</th>
                      <th className="px-6 py-4 font-medium text-center">Admin</th>
                      <th className="px-6 py-4 font-medium text-center">Developer</th>
                      <th className="px-6 py-4 font-medium text-center">Viewer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-card">
                    {[
                      { name: 'View Projects', roles: [true, true, true, true] },
                      { name: 'Edit Code', roles: [true, true, true, false] },
                      { name: 'Deploy to Preview', roles: [true, true, true, false] },
                      { name: 'Deploy to Production', roles: [true, true, false, false] },
                      { name: 'Manage Environment Variables', roles: [true, true, false, false] },
                      { name: 'Create/Delete Projects', roles: [true, true, false, false] },
                      { name: 'Manage Team Members', roles: [true, true, false, false] },
                      { name: 'Manage Billing', roles: [true, false, false, false] },
                      { name: 'Delete Workspace', roles: [true, false, false, false] },
                    ].map((perm, i) => (
                      <tr key={i} className="hover:bg-card/50">
                        <td className="px-6 py-4 font-medium text-text-primary">{perm.name}</td>
                        {perm.roles.map((hasPerm, j) => (
                          <td key={j} className="px-6 py-4 text-center">
                            {hasPerm ? (
                              <Check className="w-4 h-4 text-success mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-text-muted/30 mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Invite Modal */}
      <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-surface border-card text-text-primary">
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input 
                placeholder="colleague@example.com" 
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="bg-background border-card" 
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger className="bg-background border-card">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="bg-surface border-card">
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Developer">Developer</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex items-start gap-3 text-sm">
              <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-primary/80">An invitation email will be sent via Resend to join the <strong>Acme Corp Team</strong> workspace.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteModalOpen(false)} className="border-card bg-background hover:bg-card">Cancel</Button>
            <Button onClick={handleInvite} className="bg-primary hover:bg-primary/90 text-white">Send Invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
