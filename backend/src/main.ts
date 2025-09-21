import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();
  
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    app.enableCors(
   { origin: process.env.NODE_ENV === 'production' ? 'http://frontend-service.development.svc.cluster.local' : 'http://localhost:4200',
    credentials: false,}
  );
  await app.listen(3000);
}
bootstrap();
