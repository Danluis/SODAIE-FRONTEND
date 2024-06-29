
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cvonqacsxlmzeukvsokn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2b25xYWNzeGxtemV1a3Zzb2tuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk1ODA2MTQsImV4cCI6MjAzNTE1NjYxNH0.va7epET2G0kILDNDvokmrmQDgmB18wLfSJ4r4jtIfaw'
export const supabase = createClient(supabaseUrl, supabaseKey)