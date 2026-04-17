import React, { useEffect, useState } from 'react';
import { useAuth as useAuthContext } from "@/lib/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, Globe, LayoutTemplate, Rocket, Database, 
  Key, Users, BarChart3, Settings, HelpCircle, 
  LogOut, ShieldAlert, Bell, Check, ChevronDown, 
  Search, Plus, PanelLeftClose, PanelLeftOpen, CreditCard, User,
  Wand2, Zap, Bug, Keyboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
import { 
  CommandDialog, CommandEmpty, CommandGroup, 
  CommandInput, CommandItem, CommandList 
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, userRole } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Cmd+K for command palette
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
      // ? for shortcuts (only if not typing in an input)
      if (e.key === "?" && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setShortcutsOpen(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (!user) return;
    
    const fetchNotifications = async () => {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('userId', user.id)
        .order('createdAt', { ascending: false });
      
      if (data) {
        setNotifications(data);
        setUnreadCount(data.filter(n => !n.read).length);
      }
    };

    fetchNotifications();

    const channel = supabase.channel('user-notifications')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notifications', filter: `userId=eq.${user.id}` },
        () => {
          fetchNotifications(); // Re-fetch on any change
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const markAsRead = async (id: string) => {
    try {
      await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);
    } catch (error) {
      console.error("Error marking notification as read", error);
    }
  };

  const navItems = [
    { name: "Home", path: "/dashboard", icon: LayoutDashboard, mobileVisible: true },
    { name: "My Projects", path: "/projects", icon: Globe, mobileVisible: true },
    { name: "Design Mode", path: "/design", icon: Wand2, mobileVisible: false },
    { name: "Webzeo Flow", path: "/flow", icon: Zap, mobileVisible: false },
    { name: "Multi-Agent Build", path: "/agents", icon: Users, mobileVisible: false },
    { name: "Templates", path: "/templates", icon: LayoutTemplate, mobileVisible: false },
    { name: "Marketplace", path: "/marketplace", icon: Plus, mobileVisible: true },
    { name: "Deployments", path: "/deployments", icon: Rocket, mobileVisible: false },
    { name: "Databases", path: "/databases", icon: Database, mobileVisible: false },
    { name: "Team", path: "/team", icon: Users, mobileVisible: false },
    { name: "Analytics", path: "/analytics", icon: BarChart3, mobileVisible: true },
    { name: "Error Monitor", path: "/error-monitoring", icon: Bug, mobileVisible: false },
    { name: "Prompts", path: "/prompts", icon: Search, mobileVisible: false },
    { name: "Settings", path: "/settings", icon: Settings, mobileVisible: true },
    { name: "Help & Docs", path: "/docs", icon: HelpCircle, mobileVisible: false },
  ];

  if (userRole === 'admin') {
    navItems.push({ name: "Admin Panel", path: "/admin", icon: ShieldAlert, mobileVisible: false });
  }

  // Breadcrumb logic
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    return { name, path };
  });

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row text-text-primary font-sans">
      {/* Sidebar (Desktop) */}
      <motion.aside 
        initial={false}
        animate={{ width: isCollapsed ? 80 : 256 }}
        className="hidden md:flex bg-surface border-r border-card flex-col relative z-20"
      >
        {/* Workspace Switcher */}
        <div className="h-16 flex items-center px-4 border-b border-card">
          <DropdownMenu>
            <DropdownMenuTrigger render={
              <Button variant="ghost" className={cn("w-full justify-start px-2 hover:bg-card", isCollapsed && "justify-center")} />
            }>
              <div className="flex items-center gap-3 w-full">
                <Logo className="w-6 h-6 shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="font-semibold truncate flex-1 text-left">Personal Workspace</span>
                    <ChevronDown className="w-4 h-4 text-text-muted shrink-0" />
                  </>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 bg-surface border-card text-text-primary">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                <DropdownMenuItem className="hover:bg-card cursor-pointer">Personal Workspace</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-card cursor-pointer">Acme Corp Team</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-card" />
              <DropdownMenuItem className="hover:bg-card cursor-pointer"><Plus className="w-4 h-4 mr-2" /> Create Workspace</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Nav Items */}
        <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path + '/'));
            
            const NavButton = (
              <Button 
                variant="ghost"
                className={cn(
                  "w-full relative transition-all duration-200",
                  isCollapsed ? "justify-center px-0 h-10" : "justify-start px-3 h-10",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium hover:bg-primary/15 hover:text-primary" 
                    : "text-text-muted hover:text-text-primary hover:bg-card/50"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeNavIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full shadow-[0_0_10px_rgba(124,58,237,0.5)]"
                  />
                )}
                <item.icon className={cn("shrink-0", isCollapsed ? "w-5 h-5" : "w-4 h-4 mr-3")} />
                {!isCollapsed && <span>{item.name}</span>}
              </Button>
            );

            return (
              <Link key={item.path} to={item.path}>
                {isCollapsed ? (
                  <Tooltip>
                    <TooltipTrigger render={NavButton} />
                    <TooltipContent side="right" className="bg-surface border-card text-text-primary">{item.name}</TooltipContent>
                  </Tooltip>
                ) : (
                  NavButton
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="p-3 border-t border-card flex flex-col gap-2">
           <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShortcutsOpen(true)}
            className={cn("text-text-muted hover:text-text-primary hover:bg-card mb-1", isCollapsed ? "justify-center" : "justify-start")}
          >
            {isCollapsed ? <Keyboard className="w-4 h-4" /> : <><Keyboard className="w-4 h-4 mr-2" /> Keyboard Shortcuts</>}
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn("text-text-muted hover:text-text-primary hover:bg-card", isCollapsed ? "justify-center" : "justify-start")}
          >
            {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <><PanelLeftClose className="w-4 h-4 mr-2" /> Collapse</>}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger render={
              <Button variant="ghost" className={cn("w-full px-2 hover:bg-card h-auto py-2", isCollapsed ? "justify-center" : "justify-start")} />
            }>
                <Avatar className="h-8 w-8 shrink-0 border border-card">
                  <AvatarImage src={user?.photoURL || ''} />
                  <AvatarFallback className="bg-primary text-primary-foreground">{user?.displayName?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="flex flex-col items-start text-sm overflow-hidden ml-3">
                    <span className="font-medium truncate w-full text-text-primary">{user?.displayName || 'User'}</span>
                    <Badge variant="outline" className="text-[10px] h-4 px-1 mt-0.5 bg-primary/10 text-primary border-primary/20">Pro Plan</Badge>
                  </div>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right" className="w-56 bg-surface border-card text-text-primary mb-2">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-card" />
                <DropdownMenuItem className="hover:bg-card cursor-pointer"><User className="w-4 h-4 mr-2" /> Profile</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-card cursor-pointer"><CreditCard className="w-4 h-4 mr-2" /> Billing</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-card cursor-pointer"><Settings className="w-4 h-4 mr-2" /> Settings</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-card" />
              <DropdownMenuItem onClick={handleLogout} className="text-error focus:bg-error/10 focus:text-error cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.aside>

      {/* Bottom Nav (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-md border-t border-card z-50 flex items-center justify-around h-16 px-2 pb-safe">
         {navItems.filter(i => i.mobileVisible).slice(0, 5).map(item => {
           const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path + '/'));
           return (
             <Link key={item.path} to={item.path} className="flex-1 max-w-[80px]">
               <div className={cn("flex flex-col items-center justify-center min-h-[44px] min-w-[44px] rounded-xl transition-all", isActive ? "text-primary" : "text-text-muted hover:text-text-primary")}>
                 <item.icon className={cn("w-5 h-5 mb-1", isActive && "fill-primary/20")} />
                 <span className="text-[10px] text-center font-medium leading-none">{item.name}</span>
               </div>
             </Link>
           );
         })}
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10 md:pb-0 pb-16">
        {/* Top Nav */}
        <header className="h-16 bg-background/80 backdrop-blur-xl border-b border-card flex items-center justify-between px-4 md:px-6 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Workspace Dropdown */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="w-10 h-10 -ml-2" />}>
                  <Logo className="w-6 h-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 bg-surface border-card text-text-primary">
                  <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                  <DropdownMenuItem className="hover:bg-card">Personal Workspace</DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-card"/>
                  <DropdownMenuItem onClick={() => setShortcutsOpen(true)} className="hover:bg-card"><Keyboard className="w-4 h-4 mr-2"/> Keyboard Shortcuts</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Breadcrumbs */}
            <div className="hidden sm:flex items-center text-sm text-text-muted">
              <Link to="/dashboard" className="hover:text-text-primary transition-colors">Webzeo</Link>
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.path}>
                  <span className="mx-2 text-card">/</span>
                  <Link 
                    to={crumb.path} 
                    className={cn(
                      "transition-colors", 
                      idx === breadcrumbs.length - 1 ? "text-text-primary font-medium" : "hover:text-text-primary"
                    )}
                  >
                    {crumb.name}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Global Search */}
            <Button 
              variant="outline" 
              className="hidden md:flex items-center gap-2 text-text-muted bg-surface/50 border-card hover:bg-card hover:text-text-primary w-64 justify-between"
              onClick={() => setSearchOpen(true)}
            >
              <span className="flex items-center gap-2"><Search className="w-4 h-4" /> Search...</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-card bg-background px-1.5 font-mono text-[10px] font-medium text-text-muted opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
            
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSearchOpen(true)} aria-label="Open Search">
              <Search className="w-5 h-5 text-text-muted" />
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <Button variant="outline" size="icon" className="rounded-full relative border-card bg-surface hover:bg-card text-text-muted hover:text-text-primary min-h-[40px] min-w-[40px]" aria-label="Notifications" />
              }>
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface"></span>
                  )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-surface border-card text-text-primary">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="flex items-center justify-between">
                    Notifications
                    {unreadCount > 0 && <Badge variant="secondary" className="bg-primary text-primary-foreground">{unreadCount} new</Badge>}
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-card" />
                <div className="max-h-80 overflow-y-auto custom-scrollbar">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-text-muted">No notifications yet</div>
                  ) : (
                    notifications.map(notif => (
                      <div key={notif.id} className={`p-3 border-b border-card last:border-0 flex gap-3 ${!notif.read ? 'bg-primary/5' : ''}`}>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-text-primary">{notif.title}</p>
                          <p className="text-xs text-text-muted mt-1">{notif.message}</p>
                          <p className="text-[10px] text-text-muted/70 mt-2 font-mono">{new Date(notif.createdAt).toLocaleString()}</p>
                        </div>
                        {!notif.read && (
                          <Button variant="ghost" size="icon" className="h-6 w-6 min-h-[44px] min-w-[44px] text-text-muted hover:text-primary hover:bg-primary/10" onClick={() => markAsRead(notif.id)}>
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* New Project Button */}
            <Link to="/builder">
              <Button className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] transition-all">
                <Plus className="w-4 h-4 mr-2" /> New Project
              </Button>
              <Button size="icon" className="md:hidden bg-primary text-primary-foreground rounded-full h-10 w-10">
                <Plus className="w-5 h-5" />
              </Button>
            </Link>

            {/* User Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <Button variant="ghost" size="icon" className="rounded-full relative border border-card bg-surface hover:bg-card md:ml-2 h-10 w-10 min-w-[44px] min-h-[44px]" aria-label="User menu" />
              }>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.photoURL || ''} />
                  <AvatarFallback className="bg-primary text-primary-foreground">{user?.displayName?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-surface border-card text-text-primary">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-card" />
                  <DropdownMenuItem className="hover:bg-card cursor-pointer min-h-[44px]"><User className="w-4 h-4 mr-2" /> Profile</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-card cursor-pointer min-h-[44px]"><Settings className="w-4 h-4 mr-2" /> Settings</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-card cursor-pointer min-h-[44px]"><CreditCard className="w-4 h-4 mr-2" /> Billing</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-card" />
                <DropdownMenuItem onClick={handleLogout} className="text-error focus:bg-error/10 focus:text-error cursor-pointer min-h-[44px]">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Scrollable Content with Page Animation */}
        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Command Palette */}
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen} shouldFilter={true}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => { navigate('/builder'); setSearchOpen(false); }}>
              <Plus className="mr-2 h-4 w-4" />
              <span>Create New Project</span>
            </CommandItem>
            <CommandItem onSelect={() => { navigate('/templates'); setSearchOpen(false); }}>
              <LayoutTemplate className="mr-2 h-4 w-4" />
              <span>Browse Templates</span>
            </CommandItem>
            <CommandItem onSelect={() => { navigate('/docs'); setSearchOpen(false); }}>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Search Documentation</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Navigation">
            {navItems.map(item => (
              <CommandItem key={item.path} onSelect={() => { navigate(item.path); setSearchOpen(false); }}>
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Keyboard Shortcuts Dialog */}
      <Dialog open={shortcutsOpen} onOpenChange={setShortcutsOpen}>
        <DialogContent className="max-w-md bg-surface border-card text-text-primary">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Keyboard className="w-5 h-5"/> Keyboard Shortcuts</DialogTitle>
            <DialogDescription className="text-text-muted">
              Master the platform with these quick keys.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Command Palette</span>
                <kbd className="bg-background border border-card rounded px-2 py-1 text-xs font-mono">⌘K</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Show Shortcuts</span>
                <kbd className="bg-background border border-card rounded px-2 py-1 text-xs font-mono">?</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Create Project</span>
                <kbd className="bg-background border border-card rounded px-2 py-1 text-xs font-mono">N</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Go to Dashboard</span>
                <kbd className="bg-background border border-card rounded px-2 py-1 text-xs font-mono">G D</kbd>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
