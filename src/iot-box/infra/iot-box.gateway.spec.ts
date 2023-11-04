import { Test, TestingModule } from '@nestjs/testing';
import { IotBoxGateway } from './iot-box.gateway';
import { IotBoxService } from './iot-box.service';

import { faker } from '@faker-js/faker';
import iotBoxDatabase from 'src/shared/infra/data/iot-box-database';
import userDatabase from 'src/shared/infra/data/user-database';
import { CustomerEntity } from 'src/customer/domain/entites/customer.entity';
import { CPF } from 'src/shared/application/lib/CPF';
import { IotBoxEntity } from '../domain/entities/iot-box.entity';

describe('IotBoxGateway', () => {
  let gateway: IotBoxGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IotBoxGateway, IotBoxService],
    }).compile();

    gateway = module.get<IotBoxGateway>(IotBoxGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should run methods correctly', async () => {
    const repo = iotBoxDatabase.iotBoxRepository;
    const customerRepo = userDatabase.customerRepository;

    const customer = new CustomerEntity(
      {
        name: faker.person.fullName(),
        age: faker.number.int(),
        email: faker.internet.email(),
        cpf: new CPF().generateRandomCpf(),
        password: faker.internet.password(),
        boxes: [],
      },
      faker.string.uuid(),
    );

    await customerRepo.save(customer);

    const box: IotBoxEntity = new IotBoxEntity(
      {
        name: 'Lucas box',
        sensors: {
          gps: {
            latitude: faker.location.latitude(),
            longitude: faker.location.longitude(),
          },
        },
      },
      faker.string.uuid(),
    );

    await repo.save(box);

    const boxData = {
      battery: 0.5,
      date: new Date(),
      time: '12:30',
      boxId: box.id,
      sensors: {
        gps: {
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
        },
      },
      customerId: customer.id,
    };

    await gateway.boxDataHandler(boxData);
    const boxReportData = await gateway.boxDataHandler(null, box.id);

    expect(boxReportData).toHaveLength(1);
    expect(boxReportData).toStrictEqual(box.getAllBoxData());
  });
});
