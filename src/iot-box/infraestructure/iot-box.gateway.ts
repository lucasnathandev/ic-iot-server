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

  @SubscribeMessage('createIotBox')
  create(@MessageBody() createIotBoxDto: CreateIotBoxDto) {
    return this.iotBoxService.create(createIotBoxDto);
  }

  @SubscribeMessage('findAllIotBox')
  findAll() {
    return this.iotBoxService.findAll();
  }

  @SubscribeMessage('findOneIotBox')
  findOne(@MessageBody() id: number) {
    return this.iotBoxService.findOne(id);
  }

  @SubscribeMessage('updateIotBox')
  update(@MessageBody() updateIotBoxDto: UpdateIotBoxDto) {
    return this.iotBoxService.update(updateIotBoxDto.id, updateIotBoxDto);
  }

  @SubscribeMessage('removeIotBox')
  remove(@MessageBody() id: number) {
    return this.iotBoxService.remove(id);
  }
}
