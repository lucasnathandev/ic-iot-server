import { Injectable } from '@nestjs/common';
import { IotBoxService } from './iot-box.service';

import { CreateBoxDataDto } from './dto/create-box-data.dto';

@Injectable()
export class IotBoxSocketService {
  constructor(private readonly iotBoxService: IotBoxService) {}

  async createBoxData(data: CreateBoxDataDto) {
    return await this.iotBoxService.createBoxData(data);
  }

  async getBoxData(id: string) {
    const data = await this.iotBoxService.getBoxDataReport(id);
    console.log(data);

    return data;
  }
}
