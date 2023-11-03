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
  async boxDataHandler(@MessageBody() boxData?: CreateBoxDataDto) {
    console.log(boxData);
    if (boxData.boxId) return await this.iotBoxService.createBoxData(boxData);
    return await this.iotBoxService.getBoxDataReport(boxData.boxId);
  }
}
