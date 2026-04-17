import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Database, Table as TableIcon, Code, Settings, Sparkles, 
  Plus, Play, ArrowLeft, Download, Search, Filter, Edit2, Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout';
import Editor from '@monaco-editor/react';

const MOCK_TABLES = [
  { name: 'users', rows: 1250 },
  { name: 'posts', rows: 450 },
  { name: 'comments', rows: 3200 },
  { name: 'tags', rows: 24 }
];

const MOCK_DATA = [
  { id: 1, email: 'john@example.com', name: 'John Doe', role: 'admin', created_at: '2026-01-15' },
  { id: 2, email: 'jane@example.com', name: 'Jane Smith', role: 'user', created_at: '2026-02-20' },
  { id: 3, email: 'bob@example.com', name: 'Bob Johnson', role: 'user', created_at: '2026-03-10' },
  { id: 4, email: 'alice@example.com', name: 'Alice Brown', role: 'editor', created_at: '2026-04-05' },
];

export default function DatabaseStudio() {
  const { dbId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('explorer');
  const [selectedTable, setSelectedTable] = useState('users');
  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM users LIMIT 100;');
  const [queryResult, setQueryResult] = useState<any[] | null>(null);
  const [isQuerying, setIsQuerying] = useState(false);

  const handleRunQuery = () => {
    setIsQuerying(true);
    setTimeout(() => {
      setQueryResult(MOCK_DATA);
      setIsQuerying(false);
    }, 800);
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto h-[calc(100vh-80px)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 shrink-0">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/databases')} className="text-text-muted hover:text-text-primary">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                <h1 className="text-2xl font-bold font-display text-text-primary tracking-tight">ecommerce-prod-db</h1>
                <Badge variant="secondary" className="bg-success/10 text-success ml-2">Connected</Badge>
              </div>
              <p className="text-text-muted text-sm mt-1">PostgreSQL • Webzeo Hosted</p>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="bg-surface border border-card p-1 rounded-lg">
              <TabsTrigger value="explorer" className="data-[state=active]:bg-card data-[state=active]:text-text-primary"><TableIcon className="w-4 h-4 mr-2" /> Data Explorer</TabsTrigger>
              <TabsTrigger value="schema" className="data-[state=active]:bg-card data-[state=active]:text-text-primary"><Database className="w-4 h-4 mr-2" /> Schema Designer</TabsTrigger>
              <TabsTrigger value="sql" className="data-[state=active]:bg-card data-[state=active]:text-text-primary"><Code className="w-4 h-4 mr-2" /> SQL Editor</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-surface border border-card rounded-xl overflow-hidden flex flex-col min-h-0">
          
          {/* DATA EXPLORER TAB */}
          {activeTab === 'explorer' && (
            <div className="flex h-full">
              {/* Sidebar */}
              <div className="w-64 border-r border-card bg-background/50 flex flex-col">
                <div className="p-4 border-b border-card">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <Input placeholder="Search tables..." className="pl-8 bg-background border-card h-8 text-sm" />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                  {MOCK_TABLES.map(table => (
                    <button
                      key={table.name}
                      onClick={() => setSelectedTable(table.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${selectedTable === table.name ? 'bg-primary/10 text-primary font-medium' : 'text-text-muted hover:bg-card hover:text-text-primary'}`}
                    >
                      <div className="flex items-center gap-2">
                        <TableIcon className="w-4 h-4" />
                        {table.name}
                      </div>
                      <span className="text-xs opacity-60">{table.rows}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Data Grid */}
              <div className="flex-1 flex flex-col min-w-0">
                <div className="h-12 border-b border-card flex items-center justify-between px-4 bg-background/30">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-text-primary">{selectedTable}</span>
                    <Badge variant="outline" className="text-xs border-card text-text-muted">100 rows</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 border-card bg-background"><Filter className="w-3.5 h-3.5 mr-2" /> Filter</Button>
                    <Button variant="outline" size="sm" className="h-8 border-card bg-background"><Download className="w-3.5 h-3.5 mr-2" /> Export</Button>
                    <Button size="sm" className="h-8 bg-primary hover:bg-primary/90 text-white"><Plus className="w-3.5 h-3.5 mr-2" /> Add Row</Button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-auto bg-background">
                  <table className="w-full text-sm text-left whitespace-nowrap">
                    <thead className="text-xs text-text-muted uppercase bg-surface sticky top-0 z-10 shadow-sm">
                      <tr>
                        <th className="px-4 py-3 font-medium border-b border-r border-card w-10 text-center">
                          <input type="checkbox" className="rounded border-card bg-background" />
                        </th>
                        {Object.keys(MOCK_DATA[0]).map(key => (
                          <th key={key} className="px-4 py-3 font-medium border-b border-r border-card">{key}</th>
                        ))}
                        <th className="px-4 py-3 font-medium border-b border-card w-20">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-card">
                      {MOCK_DATA.map((row, i) => (
                        <tr key={i} className="hover:bg-card/50 transition-colors group">
                          <td className="px-4 py-2 border-r border-card text-center">
                            <input type="checkbox" className="rounded border-card bg-background" />
                          </td>
                          {Object.values(row).map((val, j) => (
                            <td key={j} className="px-4 py-2 border-r border-card text-text-primary font-mono text-xs">
                              {String(val)}
                            </td>
                          ))}
                          <td className="px-4 py-2">
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="text-text-muted hover:text-primary"><Edit2 className="w-3.5 h-3.5" /></button>
                              <button className="text-text-muted hover:text-error"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SCHEMA DESIGNER TAB */}
          {activeTab === 'schema' && (
            <div className="flex flex-col h-full bg-background relative overflow-hidden">
              {/* AI Prompt Bar */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[600px] z-10 bg-surface/80 backdrop-blur-md border border-primary/30 rounded-full p-1.5 flex items-center shadow-lg shadow-primary/5">
                <Sparkles className="w-5 h-5 text-primary ml-3 mr-2 shrink-0" />
                <Input 
                  placeholder="Describe your schema (e.g., 'A blog with users, posts, and comments')" 
                  className="border-0 bg-transparent focus-visible:ring-0 text-text-primary placeholder:text-text-muted/70"
                />
                <Button className="rounded-full bg-primary hover:bg-primary/90 text-white px-6 shrink-0">Generate</Button>
              </div>

              {/* Mock ERD Canvas */}
              <div className="flex-1 relative p-8 mt-16 overflow-auto">
                {/* Table Node 1 */}
                <div className="absolute top-10 left-10 w-64 bg-surface border border-card rounded-lg shadow-md overflow-hidden">
                  <div className="bg-primary/10 border-b border-primary/20 px-4 py-2 flex items-center justify-between">
                    <span className="font-semibold text-primary text-sm">users</span>
                    <Settings className="w-3.5 h-3.5 text-primary/70" />
                  </div>
                  <div className="p-2 space-y-1">
                    <div className="flex items-center justify-between text-xs px-2 py-1 hover:bg-card rounded">
                      <span className="text-text-primary font-medium flex items-center gap-1">id <span className="text-[10px] text-text-muted">PK</span></span>
                      <span className="text-text-muted font-mono">uuid</span>
                    </div>
                    <div className="flex items-center justify-between text-xs px-2 py-1 hover:bg-card rounded">
                      <span className="text-text-primary">email</span>
                      <span className="text-text-muted font-mono">varchar</span>
                    </div>
                    <div className="flex items-center justify-between text-xs px-2 py-1 hover:bg-card rounded">
                      <span className="text-text-primary">password</span>
                      <span className="text-text-muted font-mono">varchar</span>
                    </div>
                  </div>
                  <div className="border-t border-card p-2 text-center">
                    <button className="text-xs text-text-muted hover:text-primary flex items-center justify-center w-full gap-1"><Plus className="w-3 h-3" /> Add Field</button>
                  </div>
                </div>

                {/* Table Node 2 */}
                <div className="absolute top-20 left-[400px] w-64 bg-surface border border-card rounded-lg shadow-md overflow-hidden">
                  <div className="bg-accent/10 border-b border-accent/20 px-4 py-2 flex items-center justify-between">
                    <span className="font-semibold text-accent text-sm">posts</span>
                    <Settings className="w-3.5 h-3.5 text-accent/70" />
                  </div>
                  <div className="p-2 space-y-1">
                    <div className="flex items-center justify-between text-xs px-2 py-1 hover:bg-card rounded">
                      <span className="text-text-primary font-medium flex items-center gap-1">id <span className="text-[10px] text-text-muted">PK</span></span>
                      <span className="text-text-muted font-mono">uuid</span>
                    </div>
                    <div className="flex items-center justify-between text-xs px-2 py-1 hover:bg-card rounded">
                      <span className="text-text-primary flex items-center gap-1">author_id <span className="text-[10px] text-accent">FK</span></span>
                      <span className="text-text-muted font-mono">uuid</span>
                    </div>
                    <div className="flex items-center justify-between text-xs px-2 py-1 hover:bg-card rounded">
                      <span className="text-text-primary">title</span>
                      <span className="text-text-muted font-mono">varchar</span>
                    </div>
                  </div>
                </div>

                {/* Mock SVG Line connecting them */}
                <svg className="absolute inset-0 pointer-events-none w-full h-full">
                  <path d="M 296 100 C 350 100, 350 140, 400 140" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                </svg>
              </div>
            </div>
          )}

          {/* SQL EDITOR TAB */}
          {activeTab === 'sql' && (
            <div className="flex flex-col h-full">
              <div className="h-1/2 border-b border-card flex flex-col">
                <div className="h-10 bg-surface border-b border-card flex items-center justify-between px-4">
                  <div className="text-sm font-medium text-text-muted">New Query</div>
                  <Button size="sm" onClick={handleRunQuery} disabled={isQuerying} className="h-7 bg-primary hover:bg-primary/90 text-white text-xs">
                    <Play className="w-3 h-3 mr-1.5" /> {isQuerying ? 'Running...' : 'Run Query'}
                  </Button>
                </div>
                <div className="flex-1 relative">
                  <Editor
                    height="100%"
                    defaultLanguage="sql"
                    theme="vs-dark"
                    value={sqlQuery}
                    onChange={(val) => setSqlQuery(val || '')}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      fontFamily: 'JetBrains Mono, monospace',
                      padding: { top: 16 },
                      scrollBeyondLastLine: false,
                    }}
                  />
                </div>
              </div>
              <div className="h-1/2 bg-background flex flex-col">
                <div className="h-10 bg-surface border-b border-card flex items-center px-4 text-sm font-medium text-text-muted">
                  Results
                </div>
                <div className="flex-1 overflow-auto p-4">
                  {queryResult ? (
                    <table className="w-full text-sm text-left whitespace-nowrap">
                      <thead className="text-xs text-text-muted uppercase bg-surface">
                        <tr>
                          {Object.keys(queryResult[0]).map(key => (
                            <th key={key} className="px-4 py-2 font-medium border border-card">{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {queryResult.map((row, i) => (
                          <tr key={i} className="hover:bg-card/50">
                            {Object.values(row).map((val, j) => (
                              <td key={j} className="px-4 py-2 border border-card text-text-primary font-mono text-xs">
                                {String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="h-full flex items-center justify-center text-text-muted text-sm">
                      Run a query to see results here.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </DashboardLayout>
  );
}
