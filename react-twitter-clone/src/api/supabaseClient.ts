import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = 'https://xtddtfvvitighhdfshxu.supabase.co' || '';
const supabaseKey: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0ZGR0ZnZ2aXRpZ2hoZGZzaHh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDg5MDI0NTQsImV4cCI6MTk2NDQ3ODQ1NH0.S75F2mJmps4hyVoBiBwNqdgxQm083-dZSMoquDH78wk' ||
  '';

export const supabaseClient = createClient(supabaseUrl, supabaseKey);
