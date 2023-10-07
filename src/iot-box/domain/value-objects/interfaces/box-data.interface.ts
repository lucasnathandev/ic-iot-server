import { ISensorFields } from '../../entities/interfaces/sensor-fields.interface';

export interface IBoxData {
  battery: number;
  date: Date;
  time: string;
  sensors: ISensorFields;
  readonly customerId?: string;
}
