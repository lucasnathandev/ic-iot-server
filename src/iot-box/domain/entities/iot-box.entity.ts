import { Entity } from 'src/shared/domain/entities/entity';

import { IotBoxProps } from './interfaces/iot-box-props.interface';
import { IotBoxMethods } from './interfaces/iot-box-methods.interface';
import { IGPS } from './interfaces/gps.interface';
import { ISensorFields } from './interfaces/sensor-fields.interface';

export class IotBoxEntity extends Entity<IotBoxProps> implements IotBoxMethods {
  constructor(props: IotBoxProps, id?: string) {
    super(props, id);
  }

  get name() {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
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

  get sensors() {
    return this.props.sensors;
  }

  private set sensors(value: ISensorFields) {
    this.props.sensors = value;
  }

  public setBoxOwnerId(id: string) {
    this.props.customerId = id;
  }

  public updateGPSLocation(coordinates: IGPS): void {
    this.sensors.gps = coordinates;
    this.updatedAt = new Date();
  }

  public updateAllSensors(data: Partial<ISensorFields>) {
    this.sensors = {
      ...this.sensors,
      ...data,
    };
  }
}
