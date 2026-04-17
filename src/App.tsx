/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/AuthContext';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import SiteBuilder from './pages/SiteBuilder';
import Settings from './pages/Settings';
import PlaceholderPage from './pages/PlaceholderPage';
import Projects from './pages/Projects';
import ProjectSettings from './pages/ProjectSettings';
import Deployments from './pages/Deployments';
import ApiKeys from './pages/ApiKeys';
import Databases from './pages/Databases';
import DatabaseStudio from './pages/DatabaseStudio';
import Team from './pages/Team';
import Analytics from './pages/Analytics';
import Templates from './pages/Templates';
import Docs from './pages/Docs';
import Marketplace from './pages/Marketplace';
import PromptLibrary from './pages/PromptLibrary';
import WebzeoFlow from './pages/WebzeoFlow';
import AiDesignMode from './pages/AiDesignMode';
import MultiAgentMode from './pages/MultiAgentMode';
import AiErrorMonitoring from './pages/AiErrorMonitoring';
import AuthCallback from './pages/AuthCallback';
import { Toaster } from 'sonner';

import { TooltipProvider } from '@/components/ui/tooltip';

const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) => {
  const { user, loading, userRole } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  
  // Require email verification ONLY for email/password accounts that haven't confirmed yet.
  // OAuth providers (Google, GitHub) always have email_confirmed_at set automatically.
  const provider = user.app_metadata?.provider ?? 'email';
  const isEmailProvider = provider === 'email' || provider === 'email_signup';
  if (isEmailProvider && !user.email_confirmed_at) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-text-primary p-6">
        <div className="max-w-md w-full bg-surface border border-white/10 p-8 rounded-2xl text-center">
          <h2 className="text-2xl font-bold font-display mb-4">Verify your email</h2>
          <p className="text-text-muted mb-6">
            We've sent a verification email to <strong>{user.email}</strong>. 
            Please verify your email to access the dashboard.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:bg-primary/90"
          >
            I've verified my email
          </button>
        </div>
      </div>
    );
  }

  if (requireAdmin && userRole !== 'admin') return <Navigate to="/dashboard" />;

  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
            <Route path="/project/:siteId/settings" element={<ProtectedRoute><ProjectSettings /></ProtectedRoute>} />
            <Route path="/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
            <Route path="/deployments" element={<ProtectedRoute><Deployments /></ProtectedRoute>} />
            <Route path="/databases" element={<ProtectedRoute><Databases /></ProtectedRoute>} />
            <Route path="/databases/:dbId" element={<ProtectedRoute><DatabaseStudio /></ProtectedRoute>} />
            <Route path="/api-keys" element={<ProtectedRoute><ApiKeys /></ProtectedRoute>} />
            <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/error-monitoring" element={<ProtectedRoute><AiErrorMonitoring /></ProtectedRoute>} />
            <Route path="/docs" element={<ProtectedRoute><Docs /></ProtectedRoute>} />
            <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
            <Route path="/prompts" element={<ProtectedRoute><PromptLibrary /></ProtectedRoute>} />
            <Route path="/flow" element={<ProtectedRoute><WebzeoFlow /></ProtectedRoute>} />
            <Route path="/design" element={<ProtectedRoute><AiDesignMode /></ProtectedRoute>} />
            <Route path="/agents" element={<ProtectedRoute><MultiAgentMode /></ProtectedRoute>} />
            <Route path="/builder/:siteId?" element={<ProtectedRoute><SiteBuilder /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminPanel /></ProtectedRoute>} />
            {/* 404 catch-all */}
            <Route path="*" element={
              <div className="min-h-screen flex flex-col items-center justify-center bg-background text-text-primary">
                <h1 className="text-6xl font-bold font-display text-primary mb-4">404</h1>
                <p className="text-text-muted text-lg mb-8">Page not found.</p>
                <a href="/" className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors">Go Home</a>
              </div>
            } />
          </Routes>
          <Toaster position="top-right" richColors closeButton />
        </Router>
      </TooltipProvider>
    </AuthProvider>
  );
}
