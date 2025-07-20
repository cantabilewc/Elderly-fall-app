import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://obqxzejwbzvyirswfnnc.supabase.co/';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9icXh6ZWp3Ynp2eWlyc3dmbm5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyNzQ5MTgsImV4cCI6MjA2Njg1MDkxOH0.xJ4X8XowOhvuAMTXWmmH2EIrDQ7X1jZXEg1xQGdwO0I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);