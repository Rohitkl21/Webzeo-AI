import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Mail, ArrowRight, Layout, Zap, Code2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function AuthPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const handleGoogleLogin = async () => {
  try {
    const redirectTo = `${window.location.origin}/auth/callback`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo }
    });
    if (error) throw error;
  } catch (error: any) {
    toast.error(error.message || "Failed to login with Google");
  }
};

  const handleGithubLogin = async () => {
    try {
      const redirectTo = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo }
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Failed to login with GitHub");
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (forgotPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        toast.success("Password reset email sent!");
        setForgotPassword(false);
      } else if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("Account created! Please check your email to verify.");
        // Usually Supabase handles the redirection or user can login if auto-confirm is enabled
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background text-text-primary font-sans overflow-hidden">
      {/* Left Side - Animated Builder Preview */}
      <div className="hidden lg:flex flex-1 relative bg-surface border-r border-white/5 items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 z-0"></div>
        
        {/* Animated grid background */}
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#7C3AED 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="relative z-10 w-full max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold font-display mb-4">Build at the speed of thought.</h2>
            <p className="text-text-muted text-lg">Join thousands of developers building the next generation of web applications.</p>
          </motion.div>

          {/* Mock Builder UI */}
          <div className="bg-card rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[400px]">
            {/* Header */}
            <div className="h-12 border-b border-white/5 flex items-center px-4 gap-2 bg-surface/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-error/80"></div>
                <div className="w-3 h-3 rounded-full bg-warning/80"></div>
                <div className="w-3 h-3 rounded-full bg-success/80"></div>
              </div>
              <div className="ml-4 flex-1 h-6 bg-background rounded border border-white/5 flex items-center px-3">
                <span className="text-xs text-text-muted font-mono">webzeo.app/builder</span>
              </div>
            </div>
            
            {/* Body */}
            <div className="flex-1 flex">
              {/* Sidebar */}
              <div className="w-16 border-r border-white/5 flex flex-col items-center py-4 gap-4 bg-surface/30">
                <Layout className="w-5 h-5 text-text-muted" />
                <Zap className="w-5 h-5 text-primary" />
                <Code2 className="w-5 h-5 text-text-muted" />
              </div>
              
              {/* Canvas */}
              <div className="flex-1 p-6 relative overflow-hidden">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="w-full h-full border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center bg-background/50 relative"
                >
                  <div className="absolute inset-0 overflow-hidden rounded-xl">
                    <motion.div 
                      animate={{ y: ["0%", "-50%"] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="w-full p-4 space-y-4 opacity-30"
                    >
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-full h-24 bg-surface rounded-lg border border-white/5"></div>
                      ))}
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative z-10 bg-primary/20 text-primary px-6 py-3 rounded-full font-mono text-sm backdrop-blur-md border border-primary/30 flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4" /> Generating UI...
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-12 relative">
        <div className="absolute top-8 left-8 lg:hidden">
          <div className="flex items-center gap-2">
            <Logo className="w-6 h-6" />
            <span className="text-xl font-bold font-display">Webzeo</span>
          </div>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-bold font-display mb-2">
              {forgotPassword ? "Reset Password" : isLogin ? "Welcome back" : "Create an account"}
            </h1>
            <p className="text-text-muted">
              {forgotPassword 
                ? "Enter your email to receive a reset link." 
                : isLogin 
                  ? "Enter your details to access your workspace." 
                  : "Start building your next big idea today."}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={forgotPassword ? "forgot" : isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-surface border-white/10 focus-visible:ring-primary"
                  />
                </div>
                
                {!forgotPassword && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      {isLogin && (
                        <button 
                          type="button"
                          onClick={() => setForgotPassword(true)}
                          className="text-xs text-primary hover:underline"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-surface border-white/10 focus-visible:ring-primary"
                    />
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 mt-2"
                  disabled={loading}
                >
                  {loading ? "Please wait..." : forgotPassword ? "Send Reset Link" : isLogin ? "Sign In" : "Sign Up"}
                  {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
                </Button>
              </form>

              {forgotPassword ? (
                <div className="text-center mt-6">
                  <button 
                    onClick={() => setForgotPassword(false)}
                    className="text-sm text-text-muted hover:text-primary transition-colors"
                  >
                    Back to login
                  </button>
                </div>
              ) : (
                <>
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-text-muted">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleGoogleLogin}
                      className="bg-surface border-white/10 hover:bg-white/5 h-11"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Google
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleGithubLogin}
                      className="bg-surface border-white/10 hover:bg-white/5 h-11"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      GitHub
                    </Button>
                  </div>

                  <div className="text-center mt-8">
                    <p className="text-sm text-text-muted">
                      {isLogin ? "Don't have an account? " : "Already have an account? "}
                      <button 
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-primary hover:underline font-medium"
                      >
                        {isLogin ? "Sign up" : "Log in"}
                      </button>
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
