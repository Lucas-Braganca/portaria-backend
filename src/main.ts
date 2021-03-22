import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

dotenv.config();
async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(process.env.PORT));
  logger.log(`Application listening on port ${process.env.PORT}`);
}
bootstrap();
