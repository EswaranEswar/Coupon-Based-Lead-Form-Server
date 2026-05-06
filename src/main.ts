import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {

  const app =
    await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.useGlobalPipes(
    new ZodValidationPipe(),
  );

 const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}/`);
}

bootstrap();