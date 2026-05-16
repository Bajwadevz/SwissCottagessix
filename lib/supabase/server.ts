import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://rfxvqzmmzuzlkggeekqq.supabase.co";
// Public anon key — safe to embed; write access governed by RLS policies
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmeHZxem1tenV6bGtnZ2Vla3FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NzEwNTMsImV4cCI6MjA5NDQ0NzA1M30.TC9D4mVra-PKTBRC0CEEcSiFd7x0n-WYd3NnhZhm1PQ";

let _client: SupabaseClient | null = null;

/** Server-side Supabase client. Prefers SUPABASE_SERVICE_ROLE_KEY; falls back to the project anon key (write RLS policies allow anon writes to sync tables). */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? SUPABASE_URL;
    // Only use service role key if it looks like a valid 3-part JWT
    const srKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
    const key =
      srKey.split(".").length === 3 && srKey.length > 100
        ? srKey
        : (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ANON_KEY);
    _client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _client;
}
