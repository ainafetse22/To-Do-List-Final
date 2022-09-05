import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hoddmqtdwhkpaxczmppj.supabase.co';
const supabaseAnonToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvZGRtcXRkd2hrcGF4Y3ptcHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE4ODAxMjgsImV4cCI6MTk3NzQ1NjEyOH0.IOkS8DduckCRNXrnEe7Ip7VW6qQgEb6haONMUZuBAAI';

export default createClient(supabaseUrl, supabaseAnonToken);
