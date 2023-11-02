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
  async create(@MessageBody() createIotBoxDto: CreateIotBoxDto) {
    console.log('a');

    return await this.iotBoxService.create(createIotBoxDto);
  }

  @SubscribeMessage('findAll')
  async findAll() {
    return await this.iotBoxService.findAll();
  }

  @SubscribeMessage('findOne')
  async findOne(@MessageBody() id: string) {
    return await this.iotBoxService.findOne(id);
  }

  @SubscribeMessage('sensorData')
  async getSensorData(@MessageBody() id: string) {
    return await this.iotBoxService.getSensorData(id);
  }

  @SubscribeMessage('update')
  async update(
    @MessageBody() updateIotBoxDto: UpdateIotBoxDto & { id: string },
  ) {
    return await this.iotBoxService.update(updateIotBoxDto.id, updateIotBoxDto);
  }

  @SubscribeMessage('inactivate')
  async inactivate(@MessageBody() id: string) {
    return await this.iotBoxService.inactivate(id);
  }
}
