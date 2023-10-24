import { ISensorFields } from 'src/iot-box/domain/entities/interfaces/sensor-fields.interface';
import { IotBoxEntity } from 'src/iot-box/domain/entities/iot-box.entity';
import { IotBoxRepository } from 'src/iot-box/domain/repositories/iot-box.repository';

export class IotBoxApplicationService {
  constructor(private iotBoxRepository: IotBoxRepository) {}

  async createBox(box: IotBoxEntity): Promise<void> {
    await this.iotBoxRepository.save(box);
  }

  async getBox(id: string): Promise<IotBoxEntity> {
    return await this.iotBoxRepository.get(id);
  }

  async getBoxByName(name: string): Promise<IotBoxEntity> {
    return await this.iotBoxRepository.findByName(name);
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
    await this.iotBoxRepository.update(id, {
      battery,
    } as Partial<IotBoxEntity>);
  }
}
