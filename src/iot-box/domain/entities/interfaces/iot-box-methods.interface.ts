import { BatteryStatus } from './enum.battery-status';
import { IGPS } from './gps.interface';
import { ISensorFields } from './sensor-fields.interface';

export interface IotBoxMethods {
  setBoxOwnerId(id: string): void;
  unbindOwnerCustomer(): void;
  updateBatteryStatus(battery: number): void;
  checkBatteryStatus(): BatteryStatus;
  updateGPSLocation(coordinates: IGPS): void;
  updateAllSensors(data: Partial<ISensorFields>): void;
  getBatteryStatus(): BatteryStatus;
  inactivateBox(): void;
  activateBox(): void;
}
