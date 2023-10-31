import { AppModule } from '../src/shared/infra/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let sut: request.SuperTest<request.Test>;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    sut = request(app.getHttpServer());
  });

  it('/', () => {
    return sut.get('/').expect(200);
  });
});
