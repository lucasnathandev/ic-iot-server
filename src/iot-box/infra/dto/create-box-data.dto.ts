import { ISensorFields } from 'src/iot-box/domain/entities/interfaces/sensor-fields.interface';
import { BoxDataProps } from './../../domain/entities/interfaces/box-data.interface';
export class CreateBoxDataDto implements BoxDataProps {
  battery: number;
  date: Date;
  time: string;
  sensors: ISensorFields;
  boxId: string;
  customerId: string;
}
