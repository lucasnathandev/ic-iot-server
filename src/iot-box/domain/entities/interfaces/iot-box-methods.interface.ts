import { IGPS } from './gps.interface';

export interface IotBoxMethods {
  updateGPSLocation(coordinates: IGPS): void;
}
