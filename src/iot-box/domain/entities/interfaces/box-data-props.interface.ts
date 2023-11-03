import { ISensorFields } from './sensor-fields.interface';

export interface BoxDataProps {
  battery: number;
  date: Date;
  time: string;
  sensors: ISensorFields;
  boxId: string;
  readonly customerId?: string;
}
