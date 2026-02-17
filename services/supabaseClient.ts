
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Keys for localStorage fallback
const STORAGE_KEYS = {
  URL: 'IBU_TINI_SUPABASE_URL',
  KEY: 'IBU_TINI_SUPABASE_KEY'
};

const getInitialConfig = () => {
  // Use optional chaining and nullish coalescing for safe access
  const envUrl = typeof process !== 'undefined' ? process.env?.SUPABASE_URL : null;
  const envKey = typeof process !== 'undefined' ? process.env?.SUPABASE_ANON_KEY : null;
  
  const url = envUrl || localStorage.getItem(STORAGE_KEYS.URL);
  const key = envKey || localStorage.getItem(STORAGE_KEYS.KEY);
  return { url, key };
};

let supabaseInstance: SupabaseClient | null = null;

export const isSupabaseConfigured = () => {
  const { url, key } = getInitialConfig();
  return Boolean(url && key && url.startsWith('https://'));
};

export const getSupabase = (): SupabaseClient => {
  const { url, key } = getInitialConfig();
  
  if (!url || !key) {
    // Return a dummy client to prevent hard crashes in downstream code
    // The UI should handle the "not configured" state
    return createClient('https://placeholder.supabase.co', 'placeholder');
  }

  if (!supabaseInstance) {
    supabaseInstance = createClient(url, key);
  }
  
  return supabaseInstance;
};

export const saveSupabaseConfig = (url: string, key: string) => {
  localStorage.setItem(STORAGE_KEYS.URL, url);
  localStorage.setItem(STORAGE_KEYS.KEY, key);
  // Force reload to re-initialize everything with the new keys
  window.location.reload();
};

export const clearSupabaseConfig = () => {
  localStorage.removeItem(STORAGE_KEYS.URL);
  localStorage.removeItem(STORAGE_KEYS.KEY);
  window.location.reload();
};