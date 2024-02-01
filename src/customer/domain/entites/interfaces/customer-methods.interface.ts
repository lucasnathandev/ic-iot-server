import { IotBoxEntity } from 'src/iot-box/domain/entities/iot-box.entity';

export interface CustomerMethods {
  acquireBox(box: IotBoxEntity): void;
  releaseBox(id: string): void;
  updateName(name: string): void;
  changePassword(newPassword: string): void;
  unactivateUser(): void;
}
