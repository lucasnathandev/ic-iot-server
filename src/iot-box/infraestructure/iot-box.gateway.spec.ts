import { Test, TestingModule } from '@nestjs/testing';
import { IotBoxGateway } from './iot-box.gateway';
import { IotBoxService } from './iot-box.service';

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
});
