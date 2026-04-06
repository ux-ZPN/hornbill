import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qfaolkfjkoiprunnhyyt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmYW9sa2Zqa29pcHJ1bm5oeXl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0Njk1MzMsImV4cCI6MjA5MTA0NTUzM30.yqjTengvvarqX7tKzULzT8LXqjpUCSnY935OEv0WSWM' // Anon key

const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
  const { data, error } = await supabase.from('tickets').select('*');
  console.log('Error:', error);
  console.log('Data:', data);
}

test();
