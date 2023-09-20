import { Module } from '@nestjs/common';
import { IotBoxService } from './iot-box.service';
import { IotBoxGateway } from './iot-box.gateway';

@Module({
  providers: [IotBoxGateway, IotBoxService],
})
export class IotBoxModule {}
