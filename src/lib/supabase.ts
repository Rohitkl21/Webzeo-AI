import { createClient } from '@supabase/supabase-js';

// Get environment variables or provide fallback mock values for UI demonstration
const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Use fallback if environment variables are missing OR if they are still the placeholder strings
const supabaseUrl = (rawUrl && rawUrl !== 'YOUR_SUPABASE_URL_HERE' && rawUrl !== '') 
  ? rawUrl 
  : 'https://mock-project-id.supabase.co';

const supabaseAnonKey = (rawKey && rawKey !== 'YOUR_SUPABASE_ANON_KEY_HERE' && rawKey !== '') 
  ? rawKey 
  : 'mock-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
