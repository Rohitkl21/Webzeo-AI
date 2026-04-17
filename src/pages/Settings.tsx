import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useAuth } from '@/lib/AuthContext';
import {
  User, Palette, Bell, CreditCard, AlertTriangle, Monitor,
  Moon, Sun, Github, Shield, KeyRound, Download, Trash2, CheckCircle2,
  Lock, RefreshCw, Smartphone, Copy, Check
} from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [copied, setCopied] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');

  // Example state for Appearance
  const [theme, setTheme] = useState('dark');
  const [accentColor, setAccentColor] = useState('#7c3aed');

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Copied to clipboard');
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-display text-text-primary">Settings</h2>
          <p className="text-text-muted mt-2">Manage your account settings, appearance, and billing.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col md:flex-row gap-6">
          <TabsList className="flex flex-col h-auto w-full md:w-64 bg-transparent p-0 justify-start space-y-1">
            <TabsTrigger 
              value="profile" 
              className={`w-full justify-start px-4 py-2.5 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-medium text-text-muted hover:text-text-primary hover:bg-card/50`}
            >
              <User className="w-4 h-4 mr-3" /> Profile
            </TabsTrigger>
            <TabsTrigger 
              value="appearance" 
              className={`w-full justify-start px-4 py-2.5 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-medium text-text-muted hover:text-text-primary hover:bg-card/50`}
            >
              <Palette className="w-4 h-4 mr-3" /> Appearance
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className={`w-full justify-start px-4 py-2.5 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-medium text-text-muted hover:text-text-primary hover:bg-card/50`}
            >
              <Bell className="w-4 h-4 mr-3" /> Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="billing" 
              className={`w-full justify-start px-4 py-2.5 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-medium text-text-muted hover:text-text-primary hover:bg-card/50`}
            >
              <CreditCard className="w-4 h-4 mr-3" /> Billing & Plans
            </TabsTrigger>
            <TabsTrigger 
              value="danger" 
              className={`w-full justify-start px-4 py-2.5 rounded-lg data-[state=active]:bg-error/10 data-[state=active]:text-error data-[state=active]:font-medium text-text-muted hover:text-error hover:bg-error/10`}
            >
              <AlertTriangle className="w-4 h-4 mr-3" /> Danger Zone
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 min-w-0">
            {/* PROFILE SETTINGS */}
            <TabsContent value="profile" className="m-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <Card className="bg-surface border-card">
                <CardHeader>
                  <CardTitle>Profile Details</CardTitle>
                  <CardDescription>Update your personal information and avatar.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="w-20 h-20 border-2 border-primary/20">
                      <AvatarImage src={user?.photoURL || ''} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xl">
                        {user?.displayName?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Button variant="outline" className="border-card text-text-primary hover:bg-card">Upload new avatar</Button>
                        <Button variant="ghost" className="text-text-muted hover:text-text-primary">Generate AI Avatar</Button>
                      </div>
                      <p className="text-xs text-text-muted">Recommended size: 256x256px. Max 2MB.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input id="displayName" defaultValue={user?.displayName || ''} className="bg-background border-card" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="webzeo_user" className="bg-background border-card" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={user?.email || ''} className="bg-background border-card" disabled />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea 
                      id="bio"
                      className="w-full flex min-h-[100px] rounded-md border border-card bg-background px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                      placeholder="Tell us a little bit about yourself"
                    />
                  </div>
                </CardContent>
                <CardFooter className="border-t border-card py-4 bg-background/50">
                  <Button onClick={handleSaveProfile} className="bg-primary text-white hover:bg-primary/90 ml-auto">
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-surface border-card">
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Manage your password and authentication methods.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between border-b border-card pb-4">
                    <div className="space-y-1">
                      <h4 className="font-medium text-text-primary flex items-center gap-2">
                        <KeyRound className="w-4 h-4 text-text-muted" /> Password
                      </h4>
                      <p className="text-sm text-text-muted">You can easily change your account password.</p>
                    </div>
                    <Button variant="outline" className="border-card">Change Password</Button>
                  </div>

                  <div className="flex items-center justify-between border-b border-card pb-4">
                    <div className="space-y-1 flex-1">
                      <h4 className="font-medium text-text-primary flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-text-muted" /> Two-Factor Authentication (2FA)
                      </h4>
                      <p className="text-sm text-text-muted">Add an extra layer of security to your account using an authenticator app (TOTP).</p>
                    </div>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 ml-4">Setup 2FA</Button>
                  </div>

                  <div className="space-y-4 pt-2">
                    <h4 className="font-medium text-text-primary flex items-center gap-2">
                      <Lock className="w-4 h-4 text-text-muted" /> Connected Accounts
                    </h4>
                    
                    <div className="flex items-center justify-between bg-background border border-card rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Github className="w-5 h-5 text-text-primary" />
                        <div>
                          <p className="font-medium text-sm text-text-primary">GitHub</p>
                          <p className="text-xs text-text-muted">Connected as {user?.email}</p>
                        </div>
                      </div>
                      <Button variant="secondary" size="sm" className="bg-card text-text-primary hover:bg-card/80">Disconnect</Button>
                    </div>

                    <div className="flex items-center justify-between bg-background border border-card rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <div>
                          <p className="font-medium text-sm text-text-primary">Google</p>
                          <p className="text-xs text-text-muted">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-card">Connect</Button>
                    </div>

                    <div className="flex items-center justify-between bg-background border border-card rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-[#FC6D26]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.955 13.587l-1.342-4.135-2.664-8.189c-.155-.477-.852-.477-1.007 0L16.277 9.45H7.722L5.059 1.263c-.155-.477-.852-.477-1.007 0L1.388 9.452.045 13.587c-.121.374.015.787.332 1.018l11.623 8.441 11.623-8.441c.316-.231.453-.644.332-1.018z"/>
                        </svg>
                        <div>
                          <p className="font-medium text-sm text-text-primary">GitLab</p>
                          <p className="text-xs text-text-muted">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-card">Connect</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* APPEARANCE */}
            <TabsContent value="appearance" className="m-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <Card className="bg-surface border-card">
                <CardHeader>
                  <CardTitle>Interface Theme</CardTitle>
                  <CardDescription>Select or customize your UI theme.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <button 
                      onClick={() => setTheme('light')}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-card bg-background hover:border-card/80'}`}
                    >
                      <Sun className="w-8 h-8 mb-2 text-text-primary" />
                      <span className="text-sm font-medium text-text-primary">Light</span>
                    </button>
                    <button 
                      onClick={() => setTheme('dark')}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-primary bg-primary/5' : 'border-card bg-background hover:border-card/80'}`}
                    >
                      <Moon className="w-8 h-8 mb-2 text-text-primary" />
                      <span className="text-sm font-medium text-text-primary">Dark</span>
                    </button>
                    <button 
                      onClick={() => setTheme('system')}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${theme === 'system' ? 'border-primary bg-primary/5' : 'border-card bg-background hover:border-card/80'}`}
                    >
                      <Monitor className="w-8 h-8 mb-2 text-text-primary" />
                      <span className="text-sm font-medium text-text-primary">System</span>
                    </button>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Label>Accent Color</Label>
                    <div className="flex flex-wrap gap-3">
                      {['#7c3aed', '#2563eb', '#16a34a', '#dc2626', '#eab308', '#ec4899', '#f97316'].map(color => (
                        <button
                          key={color}
                          onClick={() => setAccentColor(color)}
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${accentColor === color ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'}`}
                          style={{ backgroundColor: color }}
                        >
                          {accentColor === color && <Check className="w-4 h-4 text-white" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface border-card">
                <CardHeader>
                  <CardTitle>Code Editor Preferences</CardTitle>
                  <CardDescription>Customize the code editor experience.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Editor Font Family</Label>
                      <Select defaultValue="jetbrains">
                        <SelectTrigger className="bg-background border-card">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-surface border-card">
                          <SelectItem value="jetbrains">JetBrains Mono</SelectItem>
                          <SelectItem value="fira">Fira Code</SelectItem>
                          <SelectItem value="cascadia">Cascadia Code</SelectItem>
                          <SelectItem value="plex">IBM Plex Mono</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Font Size</Label>
                      <Select defaultValue="14">
                        <SelectTrigger className="bg-background border-card">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-surface border-card">
                          <SelectItem value="12">12px</SelectItem>
                          <SelectItem value="13">13px</SelectItem>
                          <SelectItem value="14">14px</SelectItem>
                          <SelectItem value="16">16px</SelectItem>
                          <SelectItem value="18">18px</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Tab Size</Label>
                      <Select defaultValue="2">
                        <SelectTrigger className="bg-background border-card">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-surface border-card">
                          <SelectItem value="2">2 spaces</SelectItem>
                          <SelectItem value="4">4 spaces</SelectItem>
                          <SelectItem value="8">8 spaces</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-card">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base text-text-primary">Word Wrap</Label>
                        <p className="text-sm text-text-muted">Break lines that exceed the viewport width.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base text-text-primary">Line Numbers</Label>
                        <p className="text-sm text-text-muted">Show line numbers in the gutter.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base text-text-primary">Minimap</Label>
                        <p className="text-sm text-text-muted">Show a minimap on the right side of the editor.</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* NOTIFICATIONS */}
            <TabsContent value="notifications" className="m-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <Card className="bg-surface border-card">
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>Choose what events you want to be notified about via email.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-text-primary mb-2">Builds & Deployments</h3>
                    <div className="flex items-center justify-between border border-card bg-background px-4 py-3 rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-base text-text-primary">Deployment Complete</Label>
                        <p className="text-sm text-text-muted">Get notified when a build successfully deploys to production.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between border border-card bg-background px-4 py-3 rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-base text-text-primary">Deployment Failed</Label>
                        <p className="text-sm text-text-muted">Crucial alerts when a build crashes or fails to deploy.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-text-primary mb-2">Team & Account</h3>
                    <div className="flex items-center justify-between border border-card bg-background px-4 py-3 rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-base text-text-primary">Workspace Invites</Label>
                        <p className="text-sm text-text-muted">When someone invites you to join their workspace.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between border border-card bg-background px-4 py-3 rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-base text-text-primary">Billing & Usage Alerts</Label>
                        <p className="text-sm text-text-muted">Invoices, failed payments, and quota warnings.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-text-primary mb-2">Updates & Resources</h3>
                    <div className="flex items-center justify-between border border-card bg-background px-4 py-3 rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-base text-text-primary">Feature Announcements</Label>
                        <p className="text-sm text-text-muted">New builder features, integrations, and major updates.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between border border-card bg-background px-4 py-3 rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-base text-text-primary">Weekly Digest</Label>
                        <p className="text-sm text-text-muted">Stats and analytics for your deployed projects.</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* BILLING */}
            <TabsContent value="billing" className="m-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <Card className="bg-surface border-primary/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Current Plan</span>
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-none">Free Tier</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between gap-6 pb-6 border-b border-card">
                    <div>
                      <p className="text-3xl font-bold font-display text-text-primary mb-1">$0<span className="text-base font-normal text-text-muted"> / month</span></p>
                      <p className="text-sm text-text-muted">Your next billing date is on May 16, 2026.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button className="bg-primary text-white hover:bg-primary/90 shadow-md">Upgrade to Pro</Button>
                      <Button variant="outline" className="border-card">Compare Plans</Button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="font-medium text-text-primary">Monthly Usage</h4>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-primary">Bandwidth</span>
                        <span className="text-text-muted">12 GB / 100 GB</span>
                      </div>
                      <Progress value={12} className="h-2 bg-card" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-primary">Serverless Function Executions</span>
                        <span className="text-text-muted">45,000 / 100,000</span>
                      </div>
                      <Progress value={45} className="h-2 bg-card" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-primary">Database Storage</span>
                        <span className="text-text-muted">320 MB / 1 GB</span>
                      </div>
                      <Progress value={32} className="h-2 bg-card" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface border-card">
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-card bg-background flex-col sm:flex-row gap-4 sm:gap-0 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-white rounded flex items-center justify-center p-1">
                        <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="38" height="24" role="img" aria-labelledby="pi-visa"><title id="pi-visa">Visa</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"/><path d="M28.3 5.3h-2.7c-.4 0-.8.2-1 .6l-4.2 10.1h2.9l.6-1.6h3.6l.4 1.6h2.6l-2.2-10.7zM28.6 12l1-2.9 1 2.9h-2M18.8 5.3h-2.6l-2.6 10.7h2.8l2.4-10.7zM11.6 5.3H8.3c-.4 0-.8.3-.9.7l-3 7.8c-.2-.1-.7-.2-1.3-.2C1.9 13.6.8 14.8.8 14.8l2-1.4c.5.5 1.5.8 2.5.8 1.4 0 1.8-.4 1.8-1 0-.6-1.6-.7-2.4-1.2-1-.6-1.5-1.5-1.5-2.6 0-1.6 1.3-3.2 3.8-3.2.8 0 1.6.2 2 .4l-.5 1.8c-.4-.2-1-.3-1.6-.3-1 0-1.5.4-1.5 1 0 .6 1.6.8 2.5 1.2 1 .5 1.4 1.4 1.4 2.5 0 2-1.5 3.3-4 3.3-1 0-2-.2-2.7-.5l.6-1.8c.6.3 1.5.5 2.3.5 1 0 1.6-.4 1.6-1 0-.6-1.6-.7-2.5-1.1l-.3-.2.3-1.1L11.6 5.3z" fill="#1434CB"/></svg>
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">Visa ending in 4242</p>
                        <p className="text-xs text-text-muted">Expires 12/2028</p>
                      </div>
                    </div>
                    <Button variant="outline" className="border-card">Update</Button>
                  </div>
                  <p className="text-xs text-text-muted mt-2 flex items-center justify-center sm:justify-start gap-1">
                    <Shield className="w-3 h-3" /> Securely processed by Stripe Elements
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-surface border-card">
                <CardHeader>
                  <CardTitle>Invoice History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-0 divide-y divide-card border border-card rounded-xl bg-background overflow-hidden">
                    {[
                      { date: 'Apr 16, 2026', amount: '$0.00', status: 'Paid', id: 'INV-2026-004' },
                      { date: 'Mar 16, 2026', amount: '$0.00', status: 'Paid', id: 'INV-2026-003' },
                      { date: 'Feb 16, 2026', amount: '$0.00', status: 'Paid', id: 'INV-2026-002' },
                    ].map((invoice, i) => (
                      <div key={i} className="flex items-center justify-between p-4 hover:bg-card/30 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                          <span className="font-medium text-text-primary text-sm">{invoice.date}</span>
                          <span className="text-text-muted text-xs font-mono hidden sm:block">{invoice.id}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-text-primary font-medium">{invoice.amount}</span>
                          <Badge variant="outline" className="text-success border-success/30 bg-success/10">{invoice.status}</Badge>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-text-primary">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="pt-4 flex justify-start">
                <Button variant="ghost" className="text-text-muted hover:text-error hover:bg-error/10 text-sm h-8 px-3">
                  Cancel Subscription
                </Button>
              </div>
            </TabsContent>

            {/* DANGER ZONE */}
            <TabsContent value="danger" className="m-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <Card className="bg-surface border-error/30 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-error/5 round-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <CardHeader>
                  <CardTitle className="text-error flex items-center gap-2">
                    <Trash2 className="w-5 h-5" /> Delete Account
                  </CardTitle>
                  <CardDescription>
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-error/5 border border-error/20 p-4 rounded-lg">
                    <p className="text-sm text-text-primary font-medium mb-2">If you delete your account:</p>
                    <ul className="list-disc pl-5 text-sm text-text-muted space-y-1">
                      <li>All your websites and deployments will be permanently deleted.</li>
                      <li>Your databases and stored files will be wiped.</li>
                      <li>Custom domains will be unlinked.</li>
                      <li>Your username will become available to others.</li>
                    </ul>
                  </div>

                  <div className="space-y-2 pt-4">
                    <Label htmlFor="confirm-delete">
                      Type <span className="font-mono bg-card px-1 rounded text-text-primary font-bold">webzeo_user</span> to confirm
                    </Label>
                    <Input 
                      id="confirm-delete" 
                      className="bg-background border-card focus-visible:ring-error" 
                      value={deleteConfirm}
                      onChange={(e) => setDeleteConfirm(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="bg-background/50 border-t border-error/20 py-4">
                  <Button 
                    variant="destructive" 
                    className="bg-error text-white hover:bg-error/90 w-full sm:w-auto"
                    disabled={deleteConfirm !== 'webzeo_user'}
                    onClick={() => toast.error("Account deletion requested. (Mock)")}
                  >
                    Delete My Account
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-surface border-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-text-primary" /> Export Data
                  </CardTitle>
                  <CardDescription>
                    Download a copy of all your data (GDPR compliant). This includes your profile info, projects, and deployment history.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text-muted mb-4">
                    Your request will be processed and a download link will be sent to your email address within 24 hours. The export will be in JSON format.
                  </p>
                  <Button variant="outline" className="border-card">
                    Request Data Export
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
