import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * Server-only Supabase client. Uses the public anon key exclusively; the
 * service-role key must never be read by the web application.
 */
export function createServerComponentClient(): SupabaseClient<Database> {
  if (typeof window !== "undefined") {
    throw new Error(
      "createServerComponentClient cannot be called client-side to prevent credential exposure."
    );
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase configuration. Provide NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        "x-application-name": "controlalt",
      },
    },
  });
}
