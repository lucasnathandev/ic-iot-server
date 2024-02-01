import { Test, TestingModule } from '@nestjs/testing';
import { IotBoxSocketService } from './iot-box.socket.service';
import { IotBoxService } from './iot-box.service';

describe('IotBoxSocketService', () => {
  let service: IotBoxSocketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IotBoxSocketService, IotBoxService],
    }).compile();

    service = module.get<IotBoxSocketService>(IotBoxSocketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
