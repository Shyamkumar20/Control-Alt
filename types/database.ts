export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      software: {
        Row: {
          id: number;
          github_repo_id: number;
          full_name: string;
          name: string;
          description: string | null;
          html_url: string;
          homepage: string | null;
          license_spdx: string | null;
          language: string | null;
          topics: string[] | null;
          stars: number;
          forks: number;
          open_issues: number;
          created_at: string;
          pushed_at: string;
          readme_excerpt: string | null;
          fetched_at: string;
        };
        Insert: never; // read-only
        Update: never; // read-only
        Delete: never; // read-only
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

export type Software = Database["public"]["Tables"]["software"]["Row"];
