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
    return await this.application.createBox(new IotBoxEntity(iotBox, uuid()));
  }

  async createBoxData(data: CreateBoxDataDto) {
    const id = uuid();
    const time = new Date(data.date).toTimeString();
    data.time = time;
    return await this.application.createBoxData(id, data);
  }

  async findAll() {
    const iotBoxList = await this.application.findAll();
    return this.getDataFromIotBox(iotBoxList);
  }

  async getBoxDataReport(id: string) {
    const box = await this.application.findBox(id);
    return box.getAllBoxData();
  }

  async getFilteredBoxDataReport(
    id: string,
    filter?: Partial<{ startDate: Date; endDate: Date }>,
  ) {
    const box = await this.application.findBox(id);
    return box.getFilteredBoxData(filter);
  }

  async findByName(name: string) {
    const iotBox = await this.application.findBoxByName(name);
    return this.getDataFromIotBox(iotBox);
  }

  async findOne(id: string) {
    const iotBox = await this.application.findBox(id);
    return this.getDataFromIotBox(iotBox);
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

  private getDataFromIotBox(arg: IotBoxEntity | IotBoxEntity[]) {
    if (arg instanceof Array) return arg.map((o) => o.getIotBoxData());
    return arg.getIotBoxData();
  }
}
