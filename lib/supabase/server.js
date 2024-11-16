import { createClient as supabaseCreateClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Ensure this is defined
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Ensure this is defined

export function createClient() {
    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase environment variables are not set.');
    }

    return supabaseCreateClient(supabaseUrl, supabaseKey);
}