import { ISensorFields } from './sensor-fields.interface';

export interface IotBoxProps {
  date: Date;
  hourTime: string;
  battery: number;
  sensors: ISensorFields;
  customerId?: string;
}
