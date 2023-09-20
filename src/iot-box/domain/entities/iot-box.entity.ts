import { Entity } from '@/shared/domain/entities/entity';
import { ISensorFields } from './interfaces/sensor-fields.interface';
import { IGPS } from './interfaces/gps.interface';

export interface IotBoxProps {
  id: string;
  customerId?: string;
  date: Date;
  hourTime: Date;
  battery: number;
  gps: IGPS;
  sensors: Partial<ISensorFields>;
}

export class IotBox extends Entity<IotBoxProps> {
  public props: IotBoxProps;
  constructor(props: IotBoxProps) {
    super(props);
  }
}
