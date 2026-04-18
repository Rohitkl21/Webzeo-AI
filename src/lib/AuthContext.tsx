import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userRole: 'admin' | 'user' | 'team-owner' | 'viewer' | null;
}

const AuthContext = createContext<AuthContextType>({ user: null, session: null, loading: false, userRole: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true); // Start true so ProtectedRoute waits for session check
  const [userRole, setUserRole] = useState<'admin' | 'user' | 'team-owner' | 'viewer' | null>(null);

  useEffect(() => {
    // Check if Supabase is properly configured
    const isSupabaseConfigured = import.meta.env.VITE_SUPABASE_URL && 
                                  import.meta.env.VITE_SUPABASE_URL !== 'YOUR_SUPABASE_URL_HERE';
    
    if (!isSupabaseConfigured) {
      // Skip Supabase initialization - app works in demo mode
      setLoading(false);
      return;
    }

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (session?.user) {
          setSession(session);
          setUser(session.user);
          await checkAndSetRole(session.user);
        }
      } catch (e) {
        console.warn("Supabase auth initialization failed:", e);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for changes (auth state changes after initial load)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        await checkAndSetRole(currentSession.user);
      } else {
        setUserRole(null);
      }
      // Note: setLoading(false) is only handled by initializeAuth to avoid race condition
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAndSetRole = async (currentUser: User) => {
    // Skip if Supabase is not properly configured
    const isSupabaseConfigured = import.meta.env.VITE_SUPABASE_URL && 
                                  import.meta.env.VITE_SUPABASE_URL !== 'YOUR_SUPABASE_URL_HERE';
    if (!isSupabaseConfigured) {
      setUserRole('user');
      return;
    }

    try {
      const { data: userData, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', currentUser.id)
        .single();

      // PGRST116 is the error code for "0 rows returned" from .single()
      if (error && error.code === 'PGRST116' || (!userData && !error)) {
        // Create new user document (mock logic mapping)
        const isFirstUser = currentUser.email === 'rohitpatel11032004@gmail.com';
        const role = isFirstUser ? 'admin' : 'user';
        
        await supabase.from('users').insert({
          id: currentUser.id,
          email: currentUser.email,
          name: currentUser.user_metadata?.full_name || currentUser.email,
          photoURL: currentUser.user_metadata?.avatar_url || '',
          role: role,
          createdAt: new Date().toISOString(),
          subscription: 'free'
        });
        
        setUserRole(role);
      } else if (userData) {
        setUserRole(userData.role || 'user');
      }
    } catch (e) {
      console.warn("Error setting up user role:", e);
      setUserRole('user'); // Fallback
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
