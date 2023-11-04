import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { IotBoxService } from './iot-box.service';
import { CreateBoxDataDto } from './dto/create-box-data.dto';

@WebSocketGateway({ namespace: 'iot-box' })
export class IotBoxGateway {
  constructor(private readonly iotBoxService: IotBoxService) {}

  @SubscribeMessage('box-data')
  async boxDataHandler(
    @MessageBody() boxData?: CreateBoxDataDto,
    @MessageBody('id') id?: string,
  ) {
    if (boxData) return await this.iotBoxService.createBoxData(boxData);
    return await this.iotBoxService.getBoxDataReport(id);
  }
}
