import { Test, TestingModule } from '@nestjs/testing';
import { IotBoxController } from './iot-box.controller';
import { IotBoxService } from './iot-box.service';

describe('IotBoxController', () => {
  let controller: IotBoxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IotBoxController],
      providers: [IotBoxService],
    }).compile();

    controller = module.get<IotBoxController>(IotBoxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
