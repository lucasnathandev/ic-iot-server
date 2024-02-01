import { AppModule } from '../src/shared/infra/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { AppController } from 'src/shared/infra/app.controller';
import { AppService } from 'src/shared/infra/app.service';
import envConfig from 'src/shared/infra/env.config';
import { LoggerModule } from 'nestjs-pino';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let sut: request.SuperTest<request.Test>;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        LoggerModule.forRoot({
          pinoHttp: {
            name: 'Pino',
            level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
            // stream: pino.destination({
            //   dest: 'logs/pino-logs',
            //   minLength: 4096,
            //   sync: false,
            // }),
          },
        }),
        ThrottlerModule.forRoot([
          {
            ttl: 10000,
            limit: 100,
          },
        ]),
        ConfigModule.forRoot({ isGlobal: true, load: [envConfig] }),

        AppModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    sut = request(app.getHttpServer());
  });

  it('/', () => {
    return sut.get('/').expect(200);
  });
});
