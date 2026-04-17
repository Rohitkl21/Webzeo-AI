import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, CheckCircle2, Circle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface Step2Props {
  config: any;
  onComplete: () => void;
  onCancel: () => void;
}

const steps = [
  "Analyzing requirements...",
  "Designing architecture...",
  "Generating frontend components...",
  "Building API routes...",
  "Setting up database schema...",
  "Writing tests...",
  "Deploying to sandbox..."
];

export default function Step2Generation({ config, onComplete, onCancel }: Step2Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    // Simulate generation process
    const totalTime = 15000; // 15 seconds total
    const stepTime = totalTime / steps.length;

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        setTimeout(onComplete, 1000);
        return prev;
      });
    }, stepTime);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, totalTime / 100);

    // Simulate file creation
    const fileInterval = setInterval(() => {
      const newFiles = [
        "package.json",
        "src/main.tsx",
        "src/App.tsx",
        "src/index.css",
        "src/components/Header.tsx",
        "src/components/Hero.tsx",
        "src/components/Features.tsx",
        "src/lib/utils.ts",
        "vite.config.ts",
        "tailwind.config.js"
      ];
      setFiles(prev => {
        if (prev.length < newFiles.length) {
          return [...prev, newFiles[prev.length]];
        }
        clearInterval(fileInterval);
        return prev;
      });
    }, totalTime / 10);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
      clearInterval(fileInterval);
    };
  }, [onComplete]);

  return (
    <div className="h-screen w-full bg-[#0a0a0a] text-gray-300 flex flex-col font-mono">
      {/* Header */}
      <header className="h-14 border-b border-gray-800 flex items-center justify-between px-6 shrink-0 bg-[#0f0f0f]">
        <div className="flex items-center gap-4 flex-1">
          <Terminal className="w-5 h-5 text-primary" />
          <span className="font-semibold text-white">Webzeo AI Engine</span>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md bg-gray-900 rounded-full h-2.5 border border-gray-800 overflow-hidden">
            <div 
              className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          <Button variant="ghost" size="sm" onClick={onCancel} className="text-gray-400 hover:text-white hover:bg-gray-800">
            <X className="w-4 h-4 mr-2" /> Cancel & Edit Prompt
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Terminal Output */}
        <div className="flex-1 border-r border-gray-800 p-8 overflow-y-auto bg-[#0a0a0a]">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Building your project...</h2>
              <p className="text-gray-500">Prompt: "{config.prompt.substring(0, 50)}..."</p>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                
                return (
                  <motion.div 
                    key={step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: index <= currentStep ? 1 : 0.3, x: 0 }}
                    className={`flex items-center gap-4 ${isCurrent ? 'text-white' : isCompleted ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : isCurrent ? (
                      <Spinner size="sm" className="text-primary" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                    <span className="text-lg">{step}</span>
                    {isCurrent && (
                      <motion.span 
                        animate={{ opacity: [0, 1, 0] }} 
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-2 h-5 bg-primary ml-1"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel - File Tree */}
        <div className="w-80 bg-[#0f0f0f] p-6 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Generated Files</h3>
          <div className="space-y-2">
            {files.map((file, index) => (
              <motion.div 
                key={file}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm text-gray-300"
              >
                <div className="w-4 h-4 text-primary">
                  {file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') ? '📄' : 
                   file.endsWith('.css') ? '🎨' : 
                   file.endsWith('.json') ? '⚙️' : '📄'}
                </div>
                {file}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
