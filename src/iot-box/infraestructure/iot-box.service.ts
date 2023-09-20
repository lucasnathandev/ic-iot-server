import { Injectable } from '@nestjs/common';
import { CreateIotBoxDto } from './dto/create-iot-box.dto';
import { UpdateIotBoxDto } from './dto/update-iot-box.dto';

@Injectable()
export class IotBoxService {
  create(createIotBoxDto: CreateIotBoxDto) {
    return 'This action adds a new iotBox';
  }

  findAll() {
    return `This action returns all iotBox`;
  }

  findOne(id: number) {
    return `This action returns a #${id} iotBox`;
  }

  update(id: number, updateIotBoxDto: UpdateIotBoxDto) {
    return `This action updates a #${id} iotBox`;
  }

  remove(id: number) {
    return `This action removes a #${id} iotBox`;
  }
}
