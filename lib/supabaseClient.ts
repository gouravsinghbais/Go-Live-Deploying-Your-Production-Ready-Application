import { createClient } from '@supabase/supabase-js'

// These must be provided in your environment (local .env.local or Vercel vars)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// createClient returns a typed Supabase client you can use across the app
export const supabase = createClient(supabaseUrl, supabaseAnonKey)