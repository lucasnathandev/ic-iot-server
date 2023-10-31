import { CustomerProps } from './interfaces/customer-props.interface';
import { CustomerMethods } from './interfaces/customer-methods.interface';
import { IotBoxEntity } from 'src/iot-box/domain/entities/iot-box.entity';
import { UserEntity } from 'src/shared/domain/entities/user.entity';

export class CustomerEntity
  extends UserEntity<CustomerProps>
  implements CustomerMethods
{
  private passwordChanged: boolean;
  constructor(props: CustomerProps, id?: string) {
    super(props, id);
    this.passwordChanged = false;
  }
  updateName(name: string): void {
    this.props.name = name;
  }
  changePassword(newPassword: string): void {
    this.props.password = newPassword;
    this.passwordChanged = true;
  }
  unactivateUser(): void {
    this.props.isActive = false;
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

  get password() {
    return this.props.password;
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

  get isActive() {
    return this.props.isActive;
  }
}
