import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AdminModule } from 'src/admin/infra/admin.module';
import { AdminService } from 'src/admin/infra/admin.service';
import { AdminEntity } from 'src/admin/domain/entities/admin.entity';
import { makeFakeAdmin } from './fakerjs';
import { AdminController } from 'src/admin/infra/admin.controller';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let sut: request.SuperTest<request.Test>;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AdminModule],
      controllers: [AdminController],
      providers: [AdminService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    sut = request(app.getHttpServer());
  });

  it('/', () => {
    return sut
      .post('/admin/create')
      .send(new AdminEntity(makeFakeAdmin()))
      .expect(201);
  });
});
