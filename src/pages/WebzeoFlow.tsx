import React, { useCallback } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ReactFlow, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState, 
  addEdge,
  MiniMap,
  Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Play, Save, Code, Zap, Database, Globe, ArrowRight } from 'lucide-react';

const initialNodes = [
  { id: '1', position: { x: 250, y: 50 }, data: { label: 'Frontend Input (React)' }, type: 'input', className: 'bg-primary/20 border-primary text-text-primary rounded-xl px-4 py-2 font-medium w-48 shadow-lg' },
  { id: '2', position: { x: 250, y: 150 }, data: { label: 'Validation Logic (Edge)' }, className: 'bg-surface border-card text-text-primary rounded-xl px-4 py-2 w-48 shadow-lg' },
  { id: '3', position: { x: 100, y: 300 }, data: { label: 'DB Query (Firebase)' }, className: 'bg-success/20 border-success text-text-primary rounded-xl px-4 py-2 w-48 shadow-lg' },
  { id: '4', position: { x: 400, y: 300 }, data: { label: 'API Call (Stripe)' }, className: 'bg-amber-500/20 border-amber-500 text-text-primary rounded-xl px-4 py-2 w-48 shadow-lg' },
  { id: '5', position: { x: 250, y: 450 }, data: { label: 'Return Response UI' }, type: 'output', className: 'bg-primary border-primary text-white rounded-xl px-4 py-2 font-medium w-48 shadow-lg' },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#7c3aed', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', label: 'if valid user', style: { stroke: '#10b981', strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', label: 'if checkout', style: { stroke: '#f59e0b', strokeWidth: 2 } },
  { id: 'e3-5', source: '3', target: '5', animated: true, style: { stroke: '#7c3aed', strokeWidth: 2 } },
  { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#7c3aed', strokeWidth: 2 } },
];

export default function WebzeoFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-100px)] flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight font-display text-text-primary flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" /> Webzeo Flow <Badge className="ml-2 bg-primary/20 text-primary hover:bg-primary/30 border-none">BETA</Badge>
            </h2>
            <p className="text-sm text-text-muted mt-1">Visual logic builder. Connect UI to APIs and Databases entirely visually.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-card gap-2"><Play className="w-4 h-4" /> Test Flow</Button>
            <Button variant="outline" className="border-card gap-2"><Code className="w-4 h-4" /> View Generated Code</Button>
            <Button className="bg-primary hover:bg-primary/90 text-white gap-2"><Save className="w-4 h-4" /> Save Logic</Button>
          </div>
        </div>

        <Card className="flex-1 overflow-hidden bg-background border-card relative rounded-2xl">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            className="bg-[#0f1115]"
            colorMode="dark"
          >
            <Background color="#1f2937" gap={16} />
            <Controls className="bg-surface border-card fill-text-primary" />
            <MiniMap 
              nodeColor="#7c3aed"
              maskColor="rgba(15, 17, 21, 0.7)"
              className="bg-surface border-card rounded-lg"
            />
            <Panel position="top-left" className="bg-surface/80 backdrop-blur-xl border border-white/5 rounded-2xl p-3 shadow-2xl flex gap-2">
              <Button size="sm" variant="outline" className="border-card bg-background/50 backdrop-blur gap-2"><Globe className="w-4 h-4" /> Add UI Event</Button>
              <Button size="sm" variant="outline" className="border-card bg-background/50 backdrop-blur gap-2"><Database className="w-4 h-4" /> Add DB Query</Button>
              <Button size="sm" variant="outline" className="border-card bg-background/50 backdrop-blur gap-2"><Zap className="w-4 h-4" /> Add Logic Check</Button>
            </Panel>
          </ReactFlow>
        </Card>
      </div>
    </DashboardLayout>
  );
}

// Temporary Badge mockup for internal file use
function Badge({ children, className }: any) {
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>{children}</span>
}
