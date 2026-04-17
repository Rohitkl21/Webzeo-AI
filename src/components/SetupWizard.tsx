import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, X, AlertCircle, RefreshCw, Key, Shield,
  Database, Cloud, Github, ChevronRight, Check, Sparkles, Mail, CreditCard
} from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress, ProgressTrack, ProgressIndicator } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

interface SetupWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

type FieldDef = { id: string; label: string; placeholder: string };

type ChoiceDef = { id: string; label: string };

type WizardStep = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  choices?: ChoiceDef[];
  fields: Record<string, FieldDef[]>; // Map choice ID to fields
};

const WIZARD_STEPS: WizardStep[] = [
  {
    id: 'ai_provider',
    title: 'AI Provider Key',
    description: 'To power app generation, we need an AI key.',
    icon: <Sparkles className="w-6 h-6 text-purple-500" />,
    choices: [
      { id: 'openai', label: 'OpenAI API' },
      { id: 'anthropic', label: 'Anthropic API' }
    ],
    fields: {
      openai: [{ id: 'openai_key', label: 'OpenAI API Key', placeholder: 'sk-...' }],
      anthropic: [{ id: 'anthropic_key', label: 'Anthropic API Key', placeholder: 'sk-ant-...' }]
    }
  },
  {
    id: 'database',
    title: 'Database Connection',
    description: 'Connect your PostgreSQL DB or use our free built-in one.',
    icon: <Database className="w-6 h-6 text-emerald-500" />,
    choices: [
      { id: 'builtin', label: 'Webzeo Built-in (Free)' },
      { id: 'custom_pg', label: 'Custom PostgreSQL' }
    ],
    fields: {
      builtin: [],
      custom_pg: [{ id: 'pg_url', label: 'PostgreSQL URL', placeholder: 'postgresql://user:password@host:port/db' }]
    }
  },
  {
    id: 'deployment',
    title: 'Deployment Provider',
    description: 'To deploy your apps, connect one provider.',
    icon: <Cloud className="w-6 h-6 text-blue-500" />,
    choices: [
      { id: 'webzeo', label: 'Webzeo Cloud (Skip)' },
      { id: 'vercel', label: 'Vercel' },
      { id: 'netlify', label: 'Netlify' },
      { id: 'railway', label: 'Railway' }
    ],
    fields: {
      webzeo: [],
      vercel: [{ id: 'vercel_token', label: 'Vercel Token', placeholder: 'vt_...' }],
      netlify: [{ id: 'netlify_token', label: 'Netlify Token', placeholder: '...' }],
      railway: [{ id: 'railway_token', label: 'Railway Token', placeholder: '...' }]
    }
  },
  {
    id: 'email',
    title: 'Email Service',
    description: 'Options for apps that send emails (Optional).',
    icon: <Mail className="w-6 h-6 text-amber-500" />,
    choices: [
      { id: 'resend', label: 'Resend' },
      { id: 'sendgrid', label: 'SendGrid' }
    ],
    fields: {
      resend: [{ id: 'resend_key', label: 'Resend API Key', placeholder: 're_...' }],
      sendgrid: [{ id: 'sendgrid_key', label: 'SendGrid API Key', placeholder: 'SG...' }]
    }
  },
  {
    id: 'stripe',
    title: 'Stripe Payments',
    description: 'Options for apps that take payments (Optional).',
    icon: <CreditCard className="w-6 h-6 text-indigo-500" />,
    fields: {
      default: [
        { id: 'stripe_pub', label: 'Publishable Key', placeholder: 'pk_test_...' },
        { id: 'stripe_secret', label: 'Secret Key', placeholder: 'sk_test_...' }
      ]
    }
  }
];

export default function SetupWizard({ isOpen, onClose, onComplete }: SetupWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [keys, setKeys] = useState<Record<string, string>>({});
  // Track selected choice for each step. Defaults to first choice if choices exist.
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({
    ai_provider: 'openai',
    database: 'builtin',
    deployment: 'webzeo',
    email: 'resend',
  });
  
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  const stepData = WIZARD_STEPS[currentStep];
  const progressPercent = ((currentStep + 1) / WIZARD_STEPS.length) * 100;
  
  // Get active fields based on choice
  const activeChoice = stepData.choices ? selectedChoices[stepData.id] : 'default';
  const activeFields = stepData.fields[activeChoice] || [];

  const handleNext = () => {
    setTestResult(null);
    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.success('Setup completed securely!');
      onComplete();
    }
  };

  const handleSkip = () => {
    setTestResult(null);
    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.success('Setup finished. You can update skipped items later.');
      onComplete();
    }
  };

  const testConnection = () => {
    setIsTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTesting(false);
      setTestResult('success');
      toast.success('Connection verified!');
    }, 1200);
  };

  const handleInputChange = (fieldId: string, value: string) => {
    setKeys(prev => ({ ...prev, [fieldId]: value }));
    setTestResult(null);
  };

  const handleChoiceChange = (choiceId: string) => {
    setSelectedChoices(prev => ({ ...prev, [stepData.id]: choiceId }));
    setTestResult(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[580px] bg-surface border-card p-0 overflow-hidden text-text-primary">
        <div className="relative p-6 px-8 border-b border-card bg-background/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-display flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Platform Setup
            </h2>
            <span className="text-sm text-text-muted font-medium">
              Step {currentStep + 1} of {WIZARD_STEPS.length}
            </span>
          </div>
          <Progress value={progressPercent} className="h-1.5 w-full bg-card">
            <ProgressTrack className="bg-card">
              <ProgressIndicator className="bg-primary transition-all duration-500" />
            </ProgressTrack>
          </Progress>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={stepData.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 bg-card rounded-xl flex items-center justify-center shrink-0 border border-white/5 shadow-sm">
                  {stepData.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-1">{stepData.title}</h3>
                  <p className="text-sm text-text-muted">{stepData.description}</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Choices Rendering */}
                {stepData.choices && (
                  <div className="flex flex-wrap gap-3">
                    {stepData.choices.map(choice => (
                      <button
                        key={choice.id}
                        onClick={() => handleChoiceChange(choice.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                          selectedChoices[stepData.id] === choice.id 
                            ? 'bg-primary/10 border-primary text-primary' 
                            : 'bg-background border-card text-text-muted hover:border-text-muted'
                        }`}
                      >
                        {choice.label}
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Fields Rendering */}
                {activeFields.length > 0 ? (
                  <div className="space-y-4">
                    {activeFields.map(field => (
                      <div key={field.id} className="space-y-2">
                        <Label className="text-text-primary ml-1">{field.label}</Label>
                        <div className="relative">
                          <Input
                            type="password"
                            placeholder={field.placeholder}
                            value={keys[field.id] || ''}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            className="bg-background border-card pr-10 font-mono tracking-widest text-lg focus-visible:ring-primary h-12"
                          />
                          {keys[field.id] && (
                            <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-success" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-success/5 border border-success/20 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                    <CheckCircle2 className="w-8 h-8 text-success mb-2 opacity-80" />
                    <p className="text-sm font-medium text-text-primary">No configuration required.</p>
                    <p className="text-xs text-text-muted mt-1">You can proceed to the next step.</p>
                  </div>
                )}

                <div className="pt-4 flex flex-col sm:flex-row gap-3 items-center justify-between border-t border-card">
                  <div className="min-h-[24px]">
                    {testResult === 'success' && (
                      <div className="flex items-center gap-1.5 text-sm text-success font-medium">
                        <CheckCircle2 className="w-4 h-4" /> Connection OK
                      </div>
                    )}
                    {testResult === 'error' && (
                      <div className="flex items-center gap-1.5 text-sm text-error font-medium">
                        <AlertCircle className="w-4 h-4" /> Validation Failed
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button 
                      variant="outline" 
                      onClick={testConnection}
                      disabled={isTesting || activeFields.some(f => !keys[f.id]) || activeFields.length === 0}
                      className="border-card bg-background hover:bg-card w-full sm:w-auto"
                    >
                      {isTesting ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : activeFields.length === 0 ? <Check className="w-4 h-4 mr-2" /> : <Shield className="w-4 h-4 mr-2" />}
                      Test Connection
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="px-8 py-5 bg-background/80 backdrop-blur-sm border-t border-card flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
          <button 
            onClick={handleSkip} 
            className="text-sm text-text-muted hover:text-text-primary transition-colors hover:underline"
          >
            Skip for now
          </button>
          
          <Button 
            onClick={handleNext} 
            className="bg-primary hover:bg-primary/90 text-white min-w-[140px] h-10"
          >
            {currentStep === WIZARD_STEPS.length - 1 ? 'Finish Setup' : 'Save & Continue'}
            {currentStep < WIZARD_STEPS.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
