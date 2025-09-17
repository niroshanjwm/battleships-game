import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionsFilter } from './filters/global.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalFilters(new GlobalExceptionsFilter());

  await app.listen(process.env.PORT ?? 8000);
}
void bootstrap();
