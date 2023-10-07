import { ISensorFields } from './sensor-fields.interface';

export interface IotBoxProps {
  name: string;
  battery: number;
  sensors: ISensorFields;
  customerId: string;
}
