import { Entity } from 'src/shared/domain/entities/entity';

import { IotBoxProps } from './interfaces/iot-box-props.interface';
import { IotBoxMethods } from './interfaces/iot-box-methods.interface';
import { IGPS } from './interfaces/gps.interface';
import { ISensorFields } from './interfaces/sensor-fields.interface';

export class IotBoxEntity extends Entity<IotBoxProps> implements IotBoxMethods {
  public props: IotBoxProps;

  constructor(props: IotBoxProps, id?: string) {
    super(props, id);
    this.props = props;
  }

  get customerId() {
    return this.props.customerId;
  }

  get battery() {
    return this.props.battery;
  }

  set battery(value: number) {
    this.props.battery = value;
  }

  get date() {
    return this.props.date;
  }

  set date(value: Date) {
    this.props.date = value;
  }

  get hourTime() {
    return this.props.hourTime;
  }

  set hourTime(value: string) {
    this.props.hourTime = value;
  }

  get sensors() {
    return this.props.sensors;
  }

  set sensors(value: ISensorFields) {
    this.props.sensors = value;
  }

  public updateGPSLocation(coordinates: IGPS): void {
    this.sensors.gps = coordinates;
    this.updatedAt = new Date();
  }
}
