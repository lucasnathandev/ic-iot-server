import { Entity } from 'src/shared/domain/entities/entity';

import { IotBoxProps } from './interfaces/iot-box-props.interface';
import { IotBoxMethods } from './interfaces/iot-box-methods.interface';
import { IGPS } from './interfaces/gps.interface';
import { ISensorFields } from './interfaces/sensor-fields.interface';
import { BatteryStatus } from './interfaces/enum.battery-status';

import { BoxDataEntity } from './box-data.entity';
import { BoxDataProps } from './interfaces/box-data-props.interface';

export class IotBoxEntity extends Entity<IotBoxProps> implements IotBoxMethods {
  private batteryStatus: BatteryStatus;
  private battery: number;
  private boxData: BoxDataEntity[];

  private _isActive: boolean;
  constructor(props: IotBoxProps, id?: string) {
    super(props, id);
    this._isActive = true;
    this.boxData = [];
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

  setBoxOwnerId(id: string) {
    this.props.customerId = id;
    this.updatedAt = new Date();
  }

  unbindOwnerCustomer(): void {
    this.props.customerId = null;
    this.updatedAt = new Date();
  }

  updateGPSLocation(coordinates: IGPS): void {
    this.sensors.gps = coordinates;
    this.updatedAt = new Date();
  }

  updateAllSensors(data: Partial<ISensorFields>) {
    this.sensors = {
      ...this.sensors,
      ...data,
    };
    this.updatedAt = new Date();
  }

  registerBoxData(data: BoxDataEntity): void {
    this.boxData.push(data);
  }
  getBoxData(id: string): BoxDataProps {
    const boxData = this.boxData.find((boxData) => boxData.id === id);
    return boxData.getBoxData();
  }
  getAllBoxData(): BoxDataProps[] {
    return this.boxData.map((boxData) => boxData.getBoxData());
  }
  getFilteredBoxData(filter: {
    startDate?: Date;
    endDate?: Date;
  }): BoxDataProps[] {
    const filteredBoxData = this.boxData
      .filter((boxData) => {
        if (filter.startDate && !filter.endDate)
          return boxData.date >= filter.startDate;

        if (!filter.startDate && filter.endDate)
          return boxData.date <= filter.endDate;

        if (filter.startDate && filter.endDate)
          return (
            boxData.date >= filter.startDate && boxData.date <= filter.endDate
          );
      })
      .map((filtered) => filtered.getBoxData());

    return filteredBoxData;
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

  getIotBoxData() {
    return {
      id: this.id,
      ...this.props,
      batteryStatus: this.getBatteryStatus(),
      battery: this.battery,
      boxData: this.getAllBoxData(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
