import { ISensorFields } from '../entities/interfaces/sensor-fields.interface';
import { IBoxData } from './interfaces/box-data.interface';

export class BoxData implements IBoxData {
  battery: number;
  date: Date;
  time: string;
  sensors: ISensorFields;
  customerId?: string;
  constructor(data: IBoxData) {
    Object.entries(data).forEach((pair) => {
      this[pair[0]] = pair[1];
    });
  }
}
