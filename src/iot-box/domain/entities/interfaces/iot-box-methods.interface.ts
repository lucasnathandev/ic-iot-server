import { BoxDataEntity } from '../box-data.entity';
import { BoxDataProps } from './box-data.interface';
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
  registerBoxData(data: BoxDataEntity): void;
  getBoxData(id: string): BoxDataProps;
  getAllBoxData(): BoxDataProps[];
  getFilteredBoxData(
    filter: Partial<{
      startDate: Date;
      endDate: Date;
    }>,
  ): BoxDataProps[];
}
