import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { IotBoxService } from './iot-box.service';
import { CreateIotBoxDto } from './dto/create-iot-box.dto';
import { UpdateIotBoxDto } from './dto/update-iot-box.dto';

@WebSocketGateway()
export class IotBoxGateway {
  constructor(private readonly iotBoxService: IotBoxService) {}

  @SubscribeMessage('create')
  create(@MessageBody() createIotBoxDto: CreateIotBoxDto) {
    return this.iotBoxService.create(createIotBoxDto);
  }

  @SubscribeMessage('findAll')
  findAll() {
    return this.iotBoxService.findAll();
  }

  @SubscribeMessage('findOne')
  findOne(@MessageBody() id: string) {
    return this.iotBoxService.findOne(id);
  }

  @SubscribeMessage('sensorData')
  getSensorData(@MessageBody() id: string) {
    return this.iotBoxService.findOne(id);
  }

  @SubscribeMessage('update')
  update(@MessageBody() updateIotBoxDto: UpdateIotBoxDto & { id: string }) {
    return this.iotBoxService.update(updateIotBoxDto.id, updateIotBoxDto);
  }

  @SubscribeMessage('inactivate')
  inactivate(@MessageBody() id: string) {
    return this.iotBoxService.inactivate(id);
  }
}
