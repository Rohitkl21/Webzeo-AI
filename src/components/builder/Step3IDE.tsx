import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, FileCode2, FileJson, FileType2, FileText, ImageIcon,
  ChevronRight, ChevronDown, Plus, MoreVertical, Search,
  Play, RotateCcw, Monitor, Tablet, Smartphone, Share2,
  MessageSquare, X, Send, Check, Sparkles, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Editor from '@monaco-editor/react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

interface Step3Props {
  config: any;
}

const MOCK_PRESENCE = [
  { id: '1', name: 'Rohit Patel', color: '#10b981', status: 'online', avatar: '' },
  { id: '2', name: 'Jane Doe', color: '#8b5cf6', status: 'online', avatar: 'https://i.pravatar.cc/150?u=jane' },
  { id: '3', name: 'Sarah Wilson', color: '#f59e0b', status: 'idle', avatar: 'https://i.pravatar.cc/150?u=sarah' },
];

const initialFiles = [
  { name: 'src', type: 'folder', children: [
    { name: 'components', type: 'folder', children: [
      { name: 'Header.tsx', type: 'file', language: 'typescript', content: 'export default function Header() {\n  return <header>Header</header>;\n}' },
      { name: 'Hero.tsx', type: 'file', language: 'typescript', content: 'export default function Hero() {\n  return <section>Hero</section>;\n}' },
    ]},
    { name: 'App.tsx', type: 'file', language: 'typescript', content: 'import Header from "./components/Header";\nimport Hero from "./components/Hero";\n\nexport default function App() {\n  return (\n    <div>\n      <Header />\n      <Hero />\n    </div>\n  );\n}' },
    { name: 'main.tsx', type: 'file', language: 'typescript', content: 'import React from "react";\nimport ReactDOM from "react-dom/client";\nimport App from "./App";\nimport "./index.css";\n\nReactDOM.createRoot(document.getElementById("root")!).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);' },
    { name: 'index.css', type: 'file', language: 'css', content: '@tailwind base;\n@tailwind components;\n@tailwind utilities;' },
  ]},
  { name: 'package.json', type: 'file', language: 'json', content: '{\n  "name": "project",\n  "version": "1.0.0"\n}' },
  { name: 'vite.config.ts', type: 'file', language: 'typescript', content: 'import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\n\nexport default defineConfig({\n  plugins: [react()],\n});' },
];

export default function Step3IDE({ config }: Step3Props) {
  const [activeFile, setActiveFile] = useState<any>(null);
  const [openFiles, setOpenFiles] = useState<any[]>([]);
  const [deviceView, setDeviceView] = useState('desktop');
  const [mobileTab, setMobileTab] = useState<'explorer' | 'editor' | 'preview'>('editor');
  const [chatOpen, setChatOpen] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Project generated successfully! What would you like to change? You can ask me to add features, fix bugs, or modify the design.' }
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Find first file to open
    const findFirstFile = (nodes: any[]): any => {
      for (const node of nodes) {
        if (node.type === 'file') return node;
        if (node.children) {
          const found = findFirstFile(node.children);
          if (found) return found;
        }
      }
      return null;
    };
    const first = findFirstFile(initialFiles);
    if (first) {
      setActiveFile(first);
      setOpenFiles([first]);
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      const term = new XTerm({
        theme: {
          background: '#0a0a0a',
          foreground: '#d4d4d4',
          cursor: '#ffffff',
        },
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        fontSize: 12,
      });
      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(terminalRef.current);
      fitAddon.fit();
      term.write('\x1b[32m$\x1b[0m npm run dev\r\n');
      term.write('\x1b[36m  VITE\x1b[0m v5.0.0  ready in 250 ms\r\n\r\n');
      term.write('  \x1b[32m➜\x1b[0m  \x1b[1mLocal:\x1b[0m   http://localhost:5173/\r\n');
      
      const resizeObserver = new ResizeObserver(() => {
        fitAddon.fit();
      });
      resizeObserver.observe(terminalRef.current);

      return () => {
        resizeObserver.disconnect();
        term.dispose();
      };
    }
  }, []);

  const handleFileClick = (file: any) => {
    if (file.type === 'file') {
      if (!openFiles.find(f => f.name === file.name)) {
        setOpenFiles([...openFiles, file]);
      }
      setActiveFile(file);
    }
  };

  const closeFile = (e: React.MouseEvent, file: any) => {
    e.stopPropagation();
    const newOpenFiles = openFiles.filter(f => f.name !== file.name);
    setOpenFiles(newOpenFiles);
    if (activeFile?.name === file.name) {
      setActiveFile(newOpenFiles.length > 0 ? newOpenFiles[newOpenFiles.length - 1] : null);
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages([...messages, { role: 'user', content: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: 'I can help with that. Let me analyze the codebase and prepare the changes...' }]);
    }, 1000);
  };

  const renderTree = (nodes: any[], depth = 0) => {
    return nodes.map((node, i) => (
      <div key={i}>
        <div 
          className={`flex items-center gap-1.5 py-1 px-2 hover:bg-gray-800 cursor-pointer text-sm ${activeFile?.name === node.name ? 'bg-gray-800 text-white' : 'text-gray-400'}`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => handleFileClick(node)}
        >
          {node.type === 'folder' ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <span className="w-3.5" />
          )}
          {node.type === 'folder' ? (
            <Folder className="w-4 h-4 text-blue-400" />
          ) : node.name.endsWith('.tsx') || node.name.endsWith('.ts') ? (
            <FileCode2 className="w-4 h-4 text-blue-500" />
          ) : node.name.endsWith('.json') ? (
            <FileJson className="w-4 h-4 text-yellow-500" />
          ) : node.name.endsWith('.css') ? (
            <FileType2 className="w-4 h-4 text-sky-400" />
          ) : (
            <FileText className="w-4 h-4 text-gray-400" />
          )}
          <span className="truncate">{node.name}</span>
        </div>
        {node.children && renderTree(node.children, depth + 1)}
      </div>
    ));
  };

  return (
    <div className="h-screen w-full bg-[#1e1e1e] text-gray-300 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-12 bg-[#252526] border-b border-[#333] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="font-semibold text-white">Webzeo IDE</div>
          <div className="h-4 w-px bg-[#444]"></div>
          <div className="text-sm text-gray-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success"></span>
            Development Server Running
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Live Presence */}
          <div className="flex items-center -space-x-2 mr-2">
            {MOCK_PRESENCE.map((user) => (
              <div key={user.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Avatar className={`h-7 w-7 border-2 border-[#252526] ring-2 ring-offset-0 ring-[${user.color}]`}>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-gray-700 text-xs text-white" style={{ backgroundColor: user.color }}>
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#252526] ${user.status === 'online' ? 'bg-success' : 'bg-warning'}`}></span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-surface border-card text-text-primary">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-text-muted capitalize">{user.status}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
            <div className="h-7 w-7 rounded-full bg-gray-800 border-2 border-[#252526] flex items-center justify-center text-xs text-gray-400 z-10">
              +2
            </div>
          </div>

          <Button variant="ghost" size="sm" className="h-8 text-gray-400 hover:text-white hover:bg-[#333]">
            <Share2 className="w-4 h-4 mr-2" /> Share Preview
          </Button>
          <Button size="sm" className="h-8 bg-primary text-primary-foreground hover:bg-primary/90">
            Deploy to Production
          </Button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* PANEL A: File Explorer */}
        <div className={`w-full md:w-64 bg-[#252526] border-r border-[#333] flex-col shrink-0 ${mobileTab === 'explorer' ? 'flex' : 'hidden md:flex'}`}>
          <div className="h-10 flex items-center justify-between px-4 border-b border-[#333]">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Explorer</span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white"><Plus className="w-3.5 h-3.5" /></Button>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white"><Search className="w-3.5 h-3.5" /></Button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
            {renderTree(initialFiles)}
          </div>
        </div>

        {/* PANEL B: Code Editor */}
        <div className={`flex-1 flex-col min-w-0 border-r border-[#333] ${mobileTab === 'editor' ? 'flex' : 'hidden md:flex'}`}>
          {/* Editor Tabs */}
          <div className="h-10 bg-[#2d2d2d] flex overflow-x-auto custom-scrollbar shrink-0">
            {openFiles.map(file => (
              <div 
                key={file.name}
                className={`flex items-center gap-2 px-4 h-full border-r border-[#1e1e1e] cursor-pointer min-w-[120px] max-w-[200px] group ${activeFile?.name === file.name ? 'bg-[#1e1e1e] text-white border-t-2 border-t-primary' : 'text-gray-400 hover:bg-[#252526]'}`}
                onClick={() => setActiveFile(file)}
              >
                <FileCode2 className="w-3.5 h-3.5 shrink-0" />
                <span className="text-sm truncate flex-1">{file.name}</span>
                <button 
                  className={`p-0.5 rounded hover:bg-[#444] ${activeFile?.name === file.name ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                  onClick={(e) => closeFile(e, file)}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          
          {/* Monaco Editor */}
          <div className="flex-1 bg-[#1e1e1e] relative">
            {activeFile ? (
              <>
                <Editor
                  height="100%"
                  language={activeFile.language}
                  theme="vs-dark"
                  value={activeFile.content}
                  options={{
                    minimap: { enabled: true },
                    fontSize: 14,
                    fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                    lineHeight: 24,
                    padding: { top: 16 },
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                    cursorBlinking: "smooth",
                    cursorSmoothCaretAnimation: "on",
                    formatOnPaste: true,
                  }}
                />
                {/* Mock Live Cursors */}
                <div className="absolute top-24 left-32 pointer-events-none z-10">
                  <div className="relative">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-1 -left-1" style={{ color: '#8b5cf6' }}>
                      <path d="M2.5 14.5L1.5 1.5L14.5 7.5L8.5 9.5L2.5 14.5Z" fill="currentColor" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                    <div className="absolute top-4 left-4 bg-[#8b5cf6] text-white text-[10px] font-medium px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
                      Jane Doe
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 opacity-20">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <p>Select a file to start editing</p>
                </div>
              </div>
            )}
          </div>

          {/* Terminal Panel */}
          <div className="h-48 border-t border-[#333] flex flex-col shrink-0 bg-[#1e1e1e]">
            <div className="h-8 flex items-center px-4 border-b border-[#333] bg-[#252526]">
              <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Terminal</span>
            </div>
            <div className="flex-1 p-2 overflow-hidden" ref={terminalRef}></div>
          </div>
        </div>

        {/* PANEL C: Live Preview */}
        <div className={`w-full md:w-[40%] md:min-w-[400px] bg-white flex-col shrink-0 relative ${mobileTab === 'preview' ? 'flex' : 'hidden md:flex'}`}>
          <div className="h-10 bg-[#f3f4f6] border-b border-gray-200 flex items-center justify-between px-4 shrink-0 text-gray-700">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-7 w-7"><RotateCcw className="w-3.5 h-3.5" /></Button>
              <div className="bg-white border border-gray-300 rounded px-3 py-1 text-xs font-mono w-64 truncate">
                http://localhost:5173/
              </div>
            </div>
            <div className="flex items-center gap-1 bg-gray-200 rounded-md p-0.5">
              <Button variant="ghost" size="icon" className={`h-6 w-6 rounded ${deviceView === 'desktop' ? 'bg-white shadow-sm' : ''}`} onClick={() => setDeviceView('desktop')}><Monitor className="w-3.5 h-3.5" /></Button>
              <Button variant="ghost" size="icon" className={`h-6 w-6 rounded ${deviceView === 'tablet' ? 'bg-white shadow-sm' : ''}`} onClick={() => setDeviceView('tablet')}><Tablet className="w-3.5 h-3.5" /></Button>
              <Button variant="ghost" size="icon" className={`h-6 w-6 rounded ${deviceView === 'mobile' ? 'bg-white shadow-sm' : ''}`} onClick={() => setDeviceView('mobile')}><Smartphone className="w-3.5 h-3.5" /></Button>
            </div>
          </div>
          <div className="flex-1 bg-gray-100 flex items-center justify-center p-4 overflow-hidden">
            <div 
              className="bg-white shadow-lg border border-gray-200 transition-all duration-300 flex flex-col"
              style={{
                width: deviceView === 'desktop' ? '100%' : deviceView === 'tablet' ? '768px' : '375px',
                height: '100%',
                borderRadius: deviceView === 'desktop' ? '4px' : '24px',
                overflow: 'hidden'
              }}
            >
              {/* Mock Preview Content */}
              <div className="flex-1 p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to your new app</h1>
                <p className="text-gray-600 mb-8">Generated by Webzeo AI based on your prompt.</p>
                <Button className="bg-primary hover:bg-primary/90 text-white">Get Started</Button>
              </div>
            </div>
          </div>

          {/* AI Assistant Toggle */}
          {!chatOpen && (
            <Button 
              className="absolute bottom-4 right-4 rounded-full w-12 h-12 shadow-xl bg-primary hover:bg-primary/90 text-white"
              onClick={() => setChatOpen(true)}
            >
              <MessageSquare className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* AI Assistant & Team Chat Drawer */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div 
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              className="w-80 bg-[#252526] border-l border-[#333] flex flex-col shrink-0 absolute right-0 top-0 bottom-0 z-50 shadow-2xl"
            >
              <div className="h-12 border-b border-[#333] flex items-center justify-between px-2 shrink-0">
                <Tabs defaultValue="ai" className="w-full h-full flex flex-col">
                  <div className="flex items-center justify-between w-full h-full">
                    <TabsList className="bg-transparent h-full p-0 gap-4">
                      <TabsTrigger value="ai" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-2 text-gray-400 hover:text-gray-200">
                        <Sparkles className="w-4 h-4 mr-2" /> AI
                      </TabsTrigger>
                      <TabsTrigger value="team" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-2 text-gray-400 hover:text-gray-200">
                        <Users className="w-4 h-4 mr-2" /> Team
                      </TabsTrigger>
                    </TabsList>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white" onClick={() => setChatOpen(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex-1 overflow-hidden relative">
                    <TabsContent value="ai" className="h-full flex flex-col m-0 absolute inset-0">
                      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                        {messages.map((msg, i) => (
                          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] rounded-lg p-3 text-sm ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-[#333] text-gray-200'}`}>
                              {msg.content}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 border-t border-[#333] bg-[#1e1e1e]">
                        <div className="relative">
                          <Textarea 
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Ask me to change anything..."
                            className="w-full bg-[#333] border-none text-white placeholder:text-gray-500 resize-none min-h-[80px] pr-10 focus-visible:ring-1 focus-visible:ring-primary"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                              }
                            }}
                          />
                          <Button 
                            size="icon" 
                            className="absolute bottom-2 right-2 h-8 w-8 bg-primary hover:bg-primary/90 text-white rounded-md"
                            onClick={handleSendMessage}
                            disabled={!chatInput.trim()}
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="mt-2 flex gap-2 overflow-x-auto custom-scrollbar pb-1">
                          <Badge variant="outline" className="shrink-0 cursor-pointer hover:bg-[#333] border-[#444] text-gray-400">Add dark mode</Badge>
                          <Badge variant="outline" className="shrink-0 cursor-pointer hover:bg-[#333] border-[#444] text-gray-400">Make it responsive</Badge>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="team" className="h-full flex flex-col m-0 absolute inset-0">
                      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                        <div className="text-center text-xs text-gray-500 mb-4">Today</div>
                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8 shrink-0">
                            <AvatarFallback className="bg-[#8b5cf6] text-white text-xs">JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-sm font-medium text-white">Jane Doe</span>
                              <span className="text-xs text-gray-500">10:42 AM</span>
                            </div>
                            <p className="text-sm text-gray-300 mt-1">I'm updating the hero section copy now.</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8 shrink-0">
                            <AvatarFallback className="bg-primary text-white text-xs">RP</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-sm font-medium text-white">You</span>
                              <span className="text-xs text-gray-500">10:45 AM</span>
                            </div>
                            <p className="text-sm text-gray-300 mt-1">Sounds good. I'll work on the API integration.</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border-t border-[#333] bg-[#1e1e1e]">
                        <div className="relative">
                          <Input 
                            placeholder="Message team..."
                            className="w-full bg-[#333] border-none text-white placeholder:text-gray-500 pr-10 focus-visible:ring-1 focus-visible:ring-primary"
                          />
                          <Button 
                            size="icon" 
                            variant="ghost"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-white hover:bg-[#444] rounded-md"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Mobile Tab Switcher */}
        <div className="md:hidden flex h-14 bg-[#252526] border-t border-[#333] shrink-0 justify-around items-center absolute bottom-0 left-0 right-0 z-40">
          <Button variant="ghost" className={`h-full flex-1 rounded-none flex-col gap-1 ${mobileTab === 'explorer' ? 'text-primary bg-[#1e1e1e]' : 'text-gray-400 hover:text-white'}`} onClick={() => setMobileTab('explorer')}>
            <Folder className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Files</span>
          </Button>
          <Button variant="ghost" className={`h-full flex-1 rounded-none flex-col gap-1 ${mobileTab === 'editor' ? 'text-primary bg-[#1e1e1e]' : 'text-gray-400 hover:text-white'}`} onClick={() => setMobileTab('editor')}>
            <FileCode2 className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Code</span>
          </Button>
          <Button variant="ghost" className={`h-full flex-1 rounded-none flex-col gap-1 ${mobileTab === 'preview' ? 'text-primary bg-[#1e1e1e]' : 'text-gray-400 hover:text-white'}`} onClick={() => setMobileTab('preview')}>
            <Monitor className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Preview</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
