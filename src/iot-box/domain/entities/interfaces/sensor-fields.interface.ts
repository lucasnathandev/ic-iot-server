import { IGPS } from './gps.interface';

export interface ISensorFields {
  heat?: number;
  acceleration?: number;
  gps: IGPS;
  umity?: number;
  ultrasonic?: number;
  infraRed?: number;
  weight?: number;
  gas?: number;
  flux?: number;
  magnetic?: number;
  soundIntensity?: number;
}
