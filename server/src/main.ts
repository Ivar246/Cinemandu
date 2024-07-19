import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common"
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );
  await app.listen(3000);
}
bootstrap();
