import { ISensorFields } from './sensor-fields.interface';

export interface IotBoxProps {
  id: string;
  customerId?: string;
  date: Date;
  hourTime: string;
  battery: number;
  sensors: ISensorFields;
}
