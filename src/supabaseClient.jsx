import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vhzmoieunypoledibcqa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoem1vaWV1bnlwb2xlZGliY3FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NjYwMTMsImV4cCI6MjA2MDI0MjAxM30.qLvewkSAwcmg5-7mH10RMz2wGCUlmkz19P00nYjtuzY';

export const supabase = createClient(supabaseUrl, supabaseKey);