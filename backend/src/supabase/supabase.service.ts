import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import path from 'path';
import fs from 'fs';


function readSecret(file: string): string | undefined {
  try {
    return fs.readFileSync(path.join('/etc/secrets', file), 'utf8').trim();
  } catch {
    return undefined;
  }
}

@Injectable()
export class SupabaseService {

    private readonly supabase: SupabaseClient;

    constructor() {
      this.supabase = createClient(
        readSecret('SUPABASE_URL')!,
        readSecret('SUPABASE_KEY')!,
      );
    }

    getClient(): SupabaseClient {
      return this.supabase;
    }
    

}