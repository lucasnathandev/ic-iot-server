import { Entity } from 'src/shared/domain/entities/entity';

import { IotBoxProps } from './interfaces/iot-box-props.interface';
import { IotBoxMethods } from './interfaces/iot-box-methods.interface';
import { IGPS } from './interfaces/gps.interface';

export class IotBoxEntity extends Entity<IotBoxProps> implements IotBoxMethods {
  props: IotBoxProps;
  constructor(props: IotBoxProps) {
    super(props);
    this.props = props;
  }
  updateGPSLocation(coordinates: IGPS): void {
    this.props.sensors.gps = coordinates;
  }
}
