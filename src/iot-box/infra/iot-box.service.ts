import { Injectable } from '@nestjs/common';
import { CreateIotBoxDto } from './dto/create-iot-box.dto';
import { UpdateIotBoxDto } from './dto/update-iot-box.dto';
import { IotBoxApplicationService } from '../application/service/iot-box.application-service';
import { IotBoxEntity } from '../domain/entities/iot-box.entity';

@Injectable()
export class IotBoxService {
  constructor(private readonly application: IotBoxApplicationService) {}
  async create(iotBox: CreateIotBoxDto) {
    return await this.application.createBox(new IotBoxEntity(iotBox));
  }

  async findAll() {
    return await this.application.findAll();
  }

  async getSensorData(id: string) {
    const box = await this.application.findBox(id);
    box.sensors;
    return;
  }

  async findOne(id: string) {
    return await this.application.findBox(id);
  }

  update(id: string, updateIotBoxDto: UpdateIotBoxDto) {
    return Promise.all([
      this.application.updateBatteryStatus(id, updateIotBoxDto.battery),
      this.application.updateBoxSensors(id, updateIotBoxDto.sensors),
    ]);
  }

  inactivate(id: string) {
    return this.application.inactivateBox(id);
  }
}