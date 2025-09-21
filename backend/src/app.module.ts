import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from './payment/payment.module';
import { Payment } from './payment/entities/payment.entity';
console.log('HOST:', process.env.HOST);
console.log('PORT:', process.env.PORT);
console.log('USER:', process.env.USER);


@Module({
  imports: [UsersModule,    ConfigModule.forRoot({
      isGlobal: true,
     // envFilePath: '.env',
    }), 
    TypeOrmModule.forRoot({
      type: 'postgres',   // or 'mysql' | 'sqlite' | 'mariadb'
      host: process.env.HOST,  // e.g., 'localhost'
      port: process.env.PORT ? parseInt(process.env.PORT) : 6543, // default port for Postgres
      username: process.env.USER, 
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
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
