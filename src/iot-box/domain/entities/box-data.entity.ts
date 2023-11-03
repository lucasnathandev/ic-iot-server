import { BoxDataProps } from './interfaces/box-data.interface';
import { Entity } from 'src/shared/domain/entities/entity';

export class BoxDataEntity extends Entity<BoxDataProps> {
  constructor(props: BoxDataProps, id: string) {
    super(props, id);
  }

  get boxId() {
    return this.props.boxId;
  }

  get battery(): number {
    return this.props.battery;
  }

  get date(): Date {
    return this.props.date;
  }
  get time(): string {
    return this.props.time;
  }

  get sensors() {
    return this.props.sensors;
  }

  get customerId() {
    return this.props.customerId;
  }

  getBoxData() {
    return {
      ...this.props,
      createdAt: this.createdAt,
    };
  }
}
