import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, Server, Cloud, Terminal, CheckCircle2, XCircle, 
  ExternalLink, Copy, QrCode, Share2, Globe, Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress, ProgressTrack, ProgressIndicator } from '@/components/ui/progress';
import { Spinner } from '@/components/ui/spinner';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
}

type DeployStep = 'select_provider' | 'checklist' | 'deploying' | 'success' | 'error';

export default function DeployModal({ isOpen, onClose, projectName }: DeployModalProps) {
  const [step, setStep] = useState<DeployStep>('select_provider');
  const [provider, setProvider] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setStep('select_provider');
      setProvider(null);
      setProgress(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (step === 'success') {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#7c3aed', '#10b981', '#3b82f6', '#f59e0b']
      });
    }
  }, [step]);

  // Terminal setup for deploying step
  useEffect(() => {
    if (step === 'deploying' && terminalRef.current && !xtermRef.current) {
      const term = new XTerm({
        theme: {
          background: '#0a0a0a',
          foreground: '#d4d4d4',
          cursor: '#ffffff',
        },
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        fontSize: 12,
        disableStdin: true,
      });
      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(terminalRef.current);
      fitAddon.fit();
      xtermRef.current = term;

      // Simulate deployment process
      let currentProgress = 0;
      const logs = [
        '\x1b[36m[Info]\x1b[0m Starting deployment process...',
        '\x1b[36m[Info]\x1b[0m Fetching source code...',
        '\x1b[32m[Success]\x1b[0m Source code fetched successfully.',
        '\x1b[36m[Info]\x1b[0m Installing dependencies (npm install)...',
        'added 142 packages, and audited 143 packages in 3s',
        '\x1b[32m[Success]\x1b[0m Dependencies installed.',
        '\x1b[36m[Info]\x1b[0m Building application (npm run build)...',
        'vite v5.0.0 building for production...',
        '✓ 34 modules transformed.',
        'dist/index.html                 0.45 kB │ gzip:  0.29 kB',
        'dist/assets/index-Dq2t6Dq0.js  145.23 kB │ gzip: 45.12 kB',
        '\x1b[32m[Success]\x1b[0m Build completed.',
        '\x1b[36m[Info]\x1b[0m Uploading assets to edge network...',
        '\x1b[32m[Success]\x1b[0m Assets uploaded.',
        '\x1b[36m[Info]\x1b[0m Configuring routing and SSL...',
        '\x1b[32m[Success]\x1b[0m Deployment live!'
      ];

      let logIndex = 0;
      const interval = setInterval(() => {
        if (logIndex < logs.length) {
          term.writeln(logs[logIndex]);
          currentProgress += (100 / logs.length);
          setProgress(Math.min(currentProgress, 100));
          logIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => setStep('success'), 1000);
        }
      }, 600);

      return () => {
        clearInterval(interval);
        term.dispose();
        xtermRef.current = null;
      };
    }
  }, [step]);

  const handleStartDeploy = () => {
    setStep('checklist');
    // Simulate checklist
    setTimeout(() => {
      setStep('deploying');
    }, 2000);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText('https://ecommerce-admin.webzeo.app');
    toast.success('URL copied to clipboard');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-surface border-card p-0 overflow-hidden text-text-primary">
        <DialogHeader className="px-6 py-4 border-b border-card bg-background/50">
          <DialogTitle className="flex items-center gap-2 font-display">
            <Rocket className="w-5 h-5 text-primary" />
            Deploy {projectName}
          </DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* STEP 1: Select Provider */}
            {step === 'select_provider' && (
              <motion.div
                key="select"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h3 className="font-medium text-text-primary">Select Deployment Provider</h3>
                  <p className="text-sm text-text-muted">Choose where you want to host your application.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${provider === 'webzeo' ? 'border-primary bg-primary/5' : 'border-card hover:border-primary/30 bg-background'}`}
                    onClick={() => setProvider('webzeo')}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Cloud className="w-6 h-6 text-primary" />
                      <Badge variant="secondary" className="bg-primary/10 text-primary text-[10px]">Default</Badge>
                    </div>
                    <h4 className="font-medium text-text-primary">Webzeo Cloud</h4>
                    <p className="text-xs text-text-muted mt-1">Instant, zero-config global edge network.</p>
                  </div>

                  <div 
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${provider === 'vercel' ? 'border-primary bg-primary/5' : 'border-card hover:border-primary/30 bg-background'}`}
                    onClick={() => setProvider('vercel')}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-6 h-6 bg-white text-black flex items-center justify-center rounded-full font-bold text-xs">V</div>
                      <Badge variant="outline" className="text-[10px]">OAuth</Badge>
                    </div>
                    <h4 className="font-medium text-text-primary">Vercel</h4>
                    <p className="text-xs text-text-muted mt-1">Deploy to your Vercel account.</p>
                  </div>

                  <div 
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${provider === 'netlify' ? 'border-primary bg-primary/5' : 'border-card hover:border-primary/30 bg-background'}`}
                    onClick={() => setProvider('netlify')}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-6 h-6 bg-[#00C7B7] rounded flex items-center justify-center"></div>
                      <Badge variant="outline" className="text-[10px]">OAuth</Badge>
                    </div>
                    <h4 className="font-medium text-text-primary">Netlify</h4>
                    <p className="text-xs text-text-muted mt-1">Deploy to your Netlify account.</p>
                  </div>

                  <div 
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${provider === 'custom' ? 'border-primary bg-primary/5' : 'border-card hover:border-primary/30 bg-background'}`}
                    onClick={() => setProvider('custom')}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Server className="w-6 h-6 text-text-muted" />
                      <Badge variant="outline" className="text-[10px]">SSH</Badge>
                    </div>
                    <h4 className="font-medium text-text-primary">Custom VPS</h4>
                    <p className="text-xs text-text-muted mt-1">Deploy to your own server via SSH.</p>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    onClick={handleStartDeploy} 
                    disabled={!provider}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Continue <Rocket className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Checklist */}
            {step === 'checklist' && (
              <motion.div
                key="checklist"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 py-4"
              >
                <div className="text-center space-y-2 mb-8">
                  <Spinner size="md" className="mx-auto text-primary" />
                  <h3 className="font-medium text-lg text-text-primary">Running Pre-deploy Checks</h3>
                  <p className="text-sm text-text-muted">Ensuring your project is ready for production.</p>
                </div>

                <div className="space-y-4 max-w-sm mx-auto">
                  <div className="flex items-center gap-3 text-text-primary">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span>Environment variables verified</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-primary">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span>package.json is valid</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-primary">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span>No broken imports detected</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-muted">
                    <Spinner size="sm" />
                    <span>Simulating production build...</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Deploying (Terminal) */}
            {step === 'deploying' && (
              <motion.div
                key="deploying"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-text-primary flex items-center gap-2">
                    <Spinner size="sm" className="text-primary" /> Deploying to {provider === 'webzeo' ? 'Webzeo Cloud' : provider}
                  </h3>
                  <span className="text-sm text-text-muted font-mono">{Math.round(progress)}%</span>
                </div>
                
                <Progress value={progress} className="h-2 w-full">
                  <ProgressTrack className="bg-card h-2">
                    <ProgressIndicator className="bg-primary" />
                  </ProgressTrack>
                </Progress>

                <div className="mt-4 rounded-lg overflow-hidden border border-card bg-[#0a0a0a]">
                  <div className="h-8 bg-[#1e1e1e] border-b border-[#333] flex items-center px-4">
                    <Terminal className="w-3.5 h-3.5 text-gray-400 mr-2" />
                    <span className="text-xs text-gray-400 font-mono">Build Logs</span>
                  </div>
                  <div className="h-64 p-2" ref={terminalRef}></div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Success */}
            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8 py-4 text-center"
              >
                <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold font-display text-text-primary mb-2">Deployment Successful!</h3>
                  <p className="text-text-muted">Your application is now live on the edge network.</p>
                </div>

                <div className="bg-background border border-card rounded-xl p-4 flex items-center justify-between max-w-md mx-auto">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Globe className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-mono text-sm text-text-primary truncate">https://ecommerce-admin.webzeo.app</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={copyUrl} className="shrink-0 text-text-muted hover:text-text-primary">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <Button className="bg-primary hover:bg-primary/90 text-white" onClick={() => window.open('https://ecommerce-admin.webzeo.app', '_blank')}>
                    <ExternalLink className="w-4 h-4 mr-2" /> Open App
                  </Button>
                  <Button variant="outline" className="border-card bg-background hover:bg-card">
                    <QrCode className="w-4 h-4 mr-2" /> QR Code
                  </Button>
                  <Button variant="outline" className="border-card bg-background hover:bg-card">
                    <Share2 className="w-4 h-4 mr-2" /> Share
                  </Button>
                  <Button variant="ghost" className="text-text-muted hover:text-text-primary">
                    <Settings className="w-4 h-4 mr-2" /> Custom Domain
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
