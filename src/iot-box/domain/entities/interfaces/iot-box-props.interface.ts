import { ISensorFields } from './sensor-fields.interface';

export interface IotBoxProps {
  name: string;
  sensors: ISensorFields;
  customerId?: string;
}
