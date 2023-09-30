import { IGPS } from './gps.interface';

export interface ISensorFields {
  heat: number;
  acceleration: number;
  GPS: IGPS;
  umity: number;
  ultrasonic: number;
  infraRed: number;
  weight: number;
  gas: number;
  flux: number;
  magnetic: number;
  soundIntensity: number;
}
