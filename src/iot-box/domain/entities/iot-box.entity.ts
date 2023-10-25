import { Entity } from 'src/shared/domain/entities/entity';

import { IotBoxProps } from './interfaces/iot-box-props.interface';
import { IotBoxMethods } from './interfaces/iot-box-methods.interface';
import { IGPS } from './interfaces/gps.interface';
import { ISensorFields } from './interfaces/sensor-fields.interface';
import { BatteryStatus } from './interfaces/enum.battery-status';

export class IotBoxEntity extends Entity<IotBoxProps> implements IotBoxMethods {
  private batteryStatus: BatteryStatus;
  private battery: number;

  private _isActive: boolean;
  constructor(props: IotBoxProps, id?: string) {
    super(props, id);
    this._isActive = true;
  }
  inactivateBox(): void {
    this._isActive = false;
    this.updatedAt = new Date();
  }

  activateBox(): void {
    this._isActive = true;
    this.updatedAt = new Date();
  }

  updateBatteryStatus(battery: number): void {
    this.battery = battery;
    this.batteryStatus = this.calculateBatteryStatus();
    this.updatedAt = new Date();
  }

  checkBatteryStatus(): BatteryStatus {
    return this.calculateBatteryStatus();
  }

  getBatteryStatus(): BatteryStatus {
    return this.batteryStatus;
  }

  public setBoxOwnerId(id: string) {
    this.props.customerId = id;
    this.updatedAt = new Date();
  }

  public unbindOwnerCustomer(): void {
    this.props.customerId = null;
    this.updatedAt = new Date();
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
    this.updatedAt = new Date();
  }

  get isActive() {
    return this._isActive;
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

  get sensors() {
    return this.props.sensors;
  }

  private set sensors(value: ISensorFields) {
    this.props.sensors = value;
  }

  private calculateBatteryStatus(): BatteryStatus {
    if (this.battery <= 0.2) return BatteryStatus.Low;
    if (this.battery <= 0.6) return BatteryStatus.Medium;
    return BatteryStatus.High;
  }
}
