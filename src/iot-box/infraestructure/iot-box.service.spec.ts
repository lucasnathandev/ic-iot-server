import { Test, TestingModule } from '@nestjs/testing';
import { IotBoxService } from './iot-box.service';

describe('IotBoxService', () => {
  let service: IotBoxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IotBoxService],
    }).compile();

    service = module.get<IotBoxService>(IotBoxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
