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
  }

  activateBox(): void {
    this._isActive = true;
  }

  updateBatteryStatus(battery: number): void {
    this.battery = battery;
    this.batteryStatus = this.calculateBatteryStatus();
  }

  checkBatteryStatus(): BatteryStatus {
    return this.calculateBatteryStatus();
  }

  getBatteryStatus(): BatteryStatus {
    return this.batteryStatus;
  }

  public setBoxOwnerId(id: string) {
    this.props.customerId = id;
  }

  public unbindOwnerCustomer(): void {
    this.props.customerId = null;
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
    if (this.battery <= BatteryStatus.Low) return BatteryStatus.Low;
    if (this.battery <= BatteryStatus.Medium) return BatteryStatus.Medium;
    if (this.battery <= BatteryStatus.High) return BatteryStatus.High;
  }
}
