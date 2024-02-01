import { ISensorFields } from 'src/iot-box/domain/entities/interfaces/sensor-fields.interface';
import { IotBoxEntity } from 'src/iot-box/domain/entities/iot-box.entity';
import { IotBoxRepository } from 'src/iot-box/domain/repositories/iot-box.repository';
import { IotBoxServiceMethods } from './interfaces/iot-box-service-methods.interface';
import { BoxDataProps } from 'src/iot-box/domain/entities/interfaces/box-data-props.interface';
import { BoxDataEntity } from 'src/iot-box/domain/entities/box-data.entity';

export class IotBoxApplicationService implements IotBoxServiceMethods {
  constructor(private iotBoxRepository: IotBoxRepository) {}

  async createBox(box: IotBoxEntity): Promise<void> {
    await this.iotBoxRepository.save(box);
  }

  async findBox(id: string): Promise<IotBoxEntity> {
    return await this.iotBoxRepository.get(id);
  }

  async findAll(): Promise<IotBoxEntity[]> {
    return await this.iotBoxRepository.getAllActive();
  }

  async findBoxByName(name: string): Promise<IotBoxEntity> {
    return await this.iotBoxRepository.findByName(name);
  }

  async createBoxData(id: string, boxData: BoxDataProps): Promise<void> {
    const box = new BoxDataEntity(boxData, id);
    return await this.iotBoxRepository.updateBoxData(boxData.boxId, box);
  }

  async updateBoxSensors(
    id: string,
    data: Partial<ISensorFields>,
  ): Promise<void> {
    const boxToUpdate = await this.iotBoxRepository.get(id);
    boxToUpdate.updateAllSensors(data);
    this.iotBoxRepository.update(id, boxToUpdate);
  }

  async updateBatteryStatus(id: string, battery: number): Promise<void> {
    const box = await this.iotBoxRepository.get(id);
    box.updateBatteryStatus(battery);
    this.iotBoxRepository.update(id, box);
  }

  async activateBox(id: string): Promise<void> {
    const box = await this.iotBoxRepository.get(id);
    if (!box.isActive) {
      box.activateBox();
      this.iotBoxRepository.update(id, box);
    }
  }

  async inactivateBox(id: string): Promise<void> {
    const box = await this.iotBoxRepository.get(id);
    if (box.isActive) {
      box.inactivateBox();
      this.iotBoxRepository.update(id, box);
    }
  }
}
