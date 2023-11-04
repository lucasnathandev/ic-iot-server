import { Module } from '@nestjs/common';
import { IotBoxService } from './iot-box.service';
import { IotBoxGateway } from './iot-box.gateway';
import { IotBoxApplicationService } from '../application/service/iot-box.application-service';
import { IotBoxController } from './iot-box.controller';

@Module({
  controllers: [IotBoxController],
  providers: [IotBoxGateway, IotBoxService, IotBoxApplicationService],
})
export class IotBoxModule {}
