import { IotBoxEntity } from 'src/iot-box/domain/entities/iot-box.entity';

import { UpdateIotBoxDto } from '../dto/update-iot-box.dto';
import { IotBoxRepository } from 'src/iot-box/domain/repositories/iot-box.repository';

export class IotBoxRepositoryMemory implements IotBoxRepository {
  constructor() {
    this.iotBoxes = [];
  }

  async getAllActive(): Promise<IotBoxEntity[]> {
    const found = this.iotBoxes.filter((iotBox) => iotBox.isActive);
    return found;
  }

  async findByName(name: string): Promise<IotBoxEntity> {
    const found = this.iotBoxes.find(
      (iotBox) => iotBox.name === name && iotBox.isActive,
    );
    if (!found) throw new Error(`Cannot find iotBox by name ${name}`);
    return found;
  }

  async get(id: string): Promise<IotBoxEntity> {
    const found = this.iotBoxes.find((iotBox) => iotBox.id === id);
    if (!found) throw new Error(`Cannot find iotBox by id ${id}`);
    return found;
  }

  async getAll(): Promise<IotBoxEntity[]> {
    return this.iotBoxes;
  }

  async save(entity: IotBoxEntity): Promise<void> {
    if (!(entity instanceof IotBoxEntity))
      throw new Error(
        'Cannot create iotBox due to entity data is not compatible',
      );

    this.iotBoxes.push(entity);
  }

  async update(id: string, data: UpdateIotBoxDto): Promise<void> {
    const index = this.iotBoxes.findIndex((iotBox) => iotBox.id === id);
    if (index === -1) throw new Error(`Cannot find iotBox to update`);
    const iotBox = this.iotBoxes[index];
    data.sensors && iotBox.updateAllSensors(data.sensors);
    data.customerId && iotBox.setBoxOwnerId(data.customerId);
    data.battery && iotBox.updateBatteryStatus(data.battery);
  }

  async delete(id: string): Promise<void> {
    const index = this.iotBoxes.findIndex((iotBox) => iotBox.id === id);
    if (index === -1) throw new Error(`Cannot delete iotBox with id ${id}`);
    this.iotBoxes[index].inactivateBox();
  }

  private iotBoxes: IotBoxEntity[];
}
