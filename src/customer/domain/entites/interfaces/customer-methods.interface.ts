import { IotBoxEntity } from '@/iot-box/domain/entities/iot-box.entity';

export interface CustomerMethods {
  acquireBox(box: IotBoxEntity): void;
}
