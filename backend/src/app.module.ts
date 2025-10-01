import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from './payment/payment.module';
import { Payment } from './payment/entities/payment.entity';
import path from 'path';
import fs from 'fs';
import { SupabaseModule } from './supabase/supabase.module';


const dbHost = readSecret('HOST');
const dbPort = readSecret('PORT');
const dbUser = readSecret('USER');
const dbPassword = readSecret('PASSWORD');
const dbName = readSecret('DATABASE');
const supabaseUrl = readSecret('SUPABASE_URL');
const supabaseKey = readSecret('SUPABASE_KEY');

console.log('HOST:', dbHost);
console.log('PORT:', dbPort);
console.log('USER:', dbUser);
console.log('PASSWORD:', dbPassword);
console.log('DATABASE:', dbName);
console.log('SUPABASE_URL:', supabaseUrl);
console.log('SUPABASE_KEY:', supabaseKey);

function readSecret(file: string): string | undefined {
  try {
    return fs.readFileSync(path.join('C:\\Users\\gasso\\Dropbox\\PC\\Downloads\\env', file), 'utf8').trim();
  } catch {
    return undefined;
  }
}

@Module({
  imports: [
    UsersModule, SupabaseModule, PaymentModule,
    TypeOrmModule.forRoot({
      type: 'postgres',   // or 'mysql' | 'sqlite' | 'mariadb'
      host: dbHost,  // e.g., 'localhost'
      port: dbPort ? parseInt(dbPort) : 6543, // default port for Postgres
      username: dbUser,
      password: dbPassword,
      database: dbName,
      entities: [User, Payment],
      synchronize: true,  // auto-create tables (only for dev!)
      ssl: { rejectUnauthorized: false },
    }),
    TypeOrmModule.forFeature([User, Payment]),
    PaymentModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
