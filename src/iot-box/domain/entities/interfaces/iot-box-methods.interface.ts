import { IGPS } from './gps.interface';
import { ISensorFields } from './sensor-fields.interface';

export interface IotBoxMethods {
  setBoxOwnerId(id: string): void;
  updateGPSLocation(coordinates: IGPS): void;
  updateAllSensors(data: Partial<ISensorFields>): void;
}
