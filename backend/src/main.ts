import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environemt } from './environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    app.enableCors(
   { origin: environemt.frontendUrl,
    credentials: false,}
  );
  await app.listen(3000);
}
bootstrap();
