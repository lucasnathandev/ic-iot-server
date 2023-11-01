import { ISensorFields } from 'src/iot-box/domain/entities/interfaces/sensor-fields.interface';
import { IotBoxEntity } from 'src/iot-box/domain/entities/iot-box.entity';

export interface IotBoxServiceMethods {
  createBox(box: IotBoxEntity): Promise<void>;
  findAll(): Promise<IotBoxEntity[]>;
  findBox(id: string): Promise<IotBoxEntity>;
  findBoxByName(id: string): Promise<IotBoxEntity>;
  updateBoxSensors(id: string, data: Partial<ISensorFields>): Promise<void>;
  updateBatteryStatus(id: string, battery: number): Promise<void>;
  activateBox(id: string): Promise<void>;
  inactivateBox(id: string): Promise<void>;
}
