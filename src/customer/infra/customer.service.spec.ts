import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { CustomerRepositoryMemory } from './repositories/in-memory-customer.repository';
import { IotBoxRepositoryMemory } from 'src/iot-box/infra/repositories/in-memory-iot-box.repository';
import { IotBoxEntity } from 'src/iot-box/domain/entities/iot-box.entity';
import { faker } from '@faker-js/faker';
import { CustomerEntity } from '../domain/entites/customer.entity';
import { CPF } from 'src/shared/application/lib/CPF';
import { vitest } from 'vitest';
import userDatabase from 'src/shared/infra/data/user-database';
import iotBoxDatabase from 'src/shared/infra/data/iot-box-database';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should run methods correctly', async () => {
    const repos = {
      customer: userDatabase.customerRepository,

      iotBox: iotBoxDatabase.iotBoxRepository,
    };
    const boxId = faker.string.uuid();

    await repos.iotBox.save(
      new IotBoxEntity(
        {
          name: 'Any name box',
          sensors: {
            gps: {
              latitude: faker.location.latitude(),
              longitude: faker.location.longitude(),
            },
          },
        },
        boxId,
      ),
    );

    const customerId = faker.string.uuid();
    await repos.customer.save(
      new CustomerEntity(
        {
          name: faker.person.fullName(),
          age: faker.number.int(),
          email: faker.internet.email(),
          cpf: new CPF().generateRandomCpf(),
          password: faker.internet.password(),
          boxes: [],
        },
        customerId,
      ),
    );

    expect((await repos.iotBox.get(boxId)).customerId).toBeUndefined();

    await service.acquireBox(customerId, boxId);

    expect((await repos.iotBox.get(boxId)).customerId).toBe(customerId);
  });
});
