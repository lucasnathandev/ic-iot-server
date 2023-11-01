import { NestFactory } from '@nestjs/core';
import { AppModule } from './shared/infra/app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('IC Iot API routes documentation')
    .setVersion('0.8')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  const port = process.env.PORT || 8000;
  await app.listen(port, () => logger.log(`Server listening on port ${port}`));
}
bootstrap();
