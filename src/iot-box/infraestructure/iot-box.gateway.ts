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

  @SubscribeMessage('registerIotBox')
  create(@MessageBody() createIotBoxDto: CreateIotBoxDto) {
    return this.iotBoxService.create(createIotBoxDto);
  }

  @SubscribeMessage('saveIotBoxData')
  findAll() {
    return this.iotBoxService.findAll();
  }

  @SubscribeMessage('updateIotBoxSensorData')
  findOne(@MessageBody() id: string) {
    return this.iotBoxService.findOne(id);
  }

  @SubscribeMessage('updateIotBox')
  update(@MessageBody() updateIotBoxDto: UpdateIotBoxDto & { id: string }) {
    return this.iotBoxService.update(updateIotBoxDto.id, updateIotBoxDto);
  }

  @SubscribeMessage('removeIotBox')
  remove(@MessageBody() id: string) {
    return this.iotBoxService.remove(id);
  }
}
