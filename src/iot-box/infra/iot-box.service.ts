import { Injectable } from '@nestjs/common';
import { CreateIotBoxDto } from './dto/create-iot-box.dto';
import { UpdateIotBoxDto } from './dto/update-iot-box.dto';
import { IotBoxApplicationService } from '../application/service/iot-box.application-service';
import { IotBoxEntity } from '../domain/entities/iot-box.entity';
import iotBoxDatabase from 'src/shared/infra/data/iot-box-database';
import { CreateBoxDataDto } from './dto/create-box-data.dto';
import uuid from 'src/shared/infra/lib/uuid';

@Injectable()
export class IotBoxService {
  private readonly application: IotBoxApplicationService;
  constructor() {
    this.application = new IotBoxApplicationService(
      iotBoxDatabase.iotBoxRepository,
    );
  }
  async create(iotBox: CreateIotBoxDto) {
    return await this.application.createBox(new IotBoxEntity(iotBox));
  }

  async createBoxData(data: CreateBoxDataDto) {
    const id = uuid();
    return await this.application.createBoxData(id, data);
  }

  async findAll() {
    return await this.application.findAll();
  }

  async getBoxDataReport(id: string) {
    const box = await this.application.findBox(id);
    return box.getAllBoxData();
  }

  async findByName(name: string) {
    return await this.application.findBoxByName(name);
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
