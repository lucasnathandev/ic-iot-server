import { Entity } from 'src/shared/domain/entities/entity';
import { ISensorFields } from './interfaces/sensor-fields.interface';

export interface IotBoxProps {
  id: string;
  customerId?: string;
  date: Date;
  hourTime: string;
  battery: number;
  sensors: ISensorFields;
}

export class IotBoxEntity extends Entity<IotBoxProps> {
  props: IotBoxProps;
  constructor(props: IotBoxProps) {
    super(props);
    this.props = props;
  }
}
