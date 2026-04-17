import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Supabase puts the code in ?code= query param (PKCE flow)
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
          navigate('/dashboard', { replace: true });
          return;
        }

        // Fallback: hash-based token (implicit flow / magic link)
        const hash = window.location.hash;
        if (hash) {
          // Supabase JS client automatically processes the hash on getSession
          const { data: { session }, error } = await supabase.auth.getSession();
          if (error) throw error;
          if (session) {
            navigate('/dashboard', { replace: true });
            return;
          }
        }

        // If we get here with no code/hash, something went wrong
        setError('Invalid or expired verification link. Please try again.');
      } catch (err: any) {
        console.error('Auth callback error:', err);
        setError(err.message || 'Verification failed. Please try logging in again.');
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-text-primary p-6">
        <div className="max-w-md w-full bg-surface border border-white/10 p-8 rounded-2xl text-center">
          <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold font-display mb-3">Verification Failed</h2>
          <p className="text-text-muted mb-6">{error}</p>
          <a
            href="/login"
            className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            Back to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-text-primary">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-text-muted">Verifying your email...</p>
      </div>
    </div>
  );
}
