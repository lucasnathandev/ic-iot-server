import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';

import { IotBoxSocketService } from './iot-box.socket.service';
import { Socket } from 'socket.io';
import { CreateBoxDataDto } from './dto/create-box-data.dto';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  namespace: 'iot-box',
  cors: {
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization', 'Content-type'],
    origin: '*',
  },
})
export class IotBoxGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger(IotBoxGateway.name);
  constructor(private readonly iotBoxSocketService: IotBoxSocketService) {}

  handleConnection() {
    this.logger.log('someone connected');
    return 'connected on ws server';
  }

  handleDisconnect() {
    return 'disconnected on ws server';
  }

  @SubscribeMessage('send-box-data')
  async handleBoxData(
    @MessageBody() data: CreateBoxDataDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.log(data);
    await this.iotBoxSocketService.createBoxData(data);
    client.emit('send-box-data', {
      message: 'BoxData created',
    });
  }

  @SubscribeMessage('get-box-data')
  async handleGetBoxData(
    @MessageBody() id: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.log(id);
    client.emit('get-box-data', await this.iotBoxSocketService.getBoxData(id));
  }
}
