import { Entity } from 'src/shared/domain/entities/entity';
import { CustomerProps } from './interfaces/customer-props.interface';
import { CustomerMethods } from './interfaces/customer-methods.interface';
import { IotBoxEntity } from 'src/iot-box/domain/entities/iot-box.entity';

export class CustomerEntity
  extends Entity<CustomerProps>
  implements CustomerMethods
{
  constructor(props: CustomerProps, id?: string) {
    super(props, id);
  }
  releaseBox(id: string): void {
    this.props.boxes = this.props.boxes.filter((box) => box.id !== id);
  }
  acquireBox(box: IotBoxEntity): void {
    this.props.boxes.push(box);
  }

  // Getters and setters

  get email() {
    return this.props.email;
  }

  get name() {
    return this.props.name;
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

  get boxes() {
    return this.props.boxes;
  }
}
