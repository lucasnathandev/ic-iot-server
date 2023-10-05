import { Entity } from 'src/shared/domain/entities/entity';
import { CustomerProps } from './interfaces/customer-props.interface';
import { CustomerMethods } from './interfaces/customer-methods.interface';
import { IotBoxEntity } from 'src/iot-box/domain/entities/iot-box.entity';

export class CustomerEntity
  extends Entity<CustomerProps>
  implements CustomerMethods
{
  public props: CustomerProps;
  constructor(props: CustomerProps, id?: string) {
    super(props, id);
    this.props = props;
  }
  acquireBox(box: IotBoxEntity): void {
    this.props.boxes.push(box);
  }

  get name() {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get age() {
    return this.props.age;
  }

  set age(value: number) {
    this.props.age = value;
  }

  get cpf() {
    return this.props.cpf;
  }
}
