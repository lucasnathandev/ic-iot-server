import { NestFactory } from '@nestjs/core';
import { Logger as NativeLogger } from '@nestjs/common';
import { AppModule } from './shared/infra/app.module';
import { Logger } from 'nestjs-pino';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useLogger(app.get(Logger));

  const logger = new NativeLogger(bootstrap.name);

  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('IC Iot API routes documentation')
    .setVersion('0.8')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  app.enableCors({ origin: 'http://localhost:5173' });
  const port = process.env.PORT || 8000;
  await app.listen(port, async () =>
    logger.log(`Server listening on ${await app.getUrl()}`),
  );
}
bootstrap();
