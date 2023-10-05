import { IGPS } from './gps.interface';
import { ISensorFields } from './sensor-fields.interface';

export interface IotBoxMethods {
  updateGPSLocation(coordinates: IGPS): void;
  updateAllSensors(data: Partial<ISensorFields>): void;
}
