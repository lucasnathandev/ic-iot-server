import { DateProps } from './interfaces/date-props.interface';

export abstract class Entity<Props> implements DateProps {
  public props: Props;
  public readonly id: string;
  constructor(props: Props, id?: string) {
    this.id =
      id ||
      Array.from({ length: 32 })
        .map(() => String.fromCharCode(Math.floor(Math.random() * 36 + 65)))
        .join();
    this.props = { id: this.id, ...props };
    this.initializeDates();
  }
  createdAt: Date;
  updatedAt: Date;

  private initializeDates() {
    const currentDate = new Date();
    this.createdAt = currentDate;
    this.updatedAt = currentDate;
  }
}
