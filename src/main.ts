import { NestFactory } from '@nestjs/core';
import { AppModule } from './shared/infra/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8000;
  await app.listen(port, () => logger.log(`Server listening on port ${port}`));
}
bootstrap();
