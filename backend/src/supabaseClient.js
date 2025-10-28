import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

// Crear el cliente de Supabase usando tus valores
const supabase = createClient(
  'https://db.gompsqjkdyhfzvpdegdq.supabase.co', // SUPABASE_URL
  'EsV07sBBh9TiGvTe'                              // SUPABASE_KEY (Service Role)
);

export default supabase;
