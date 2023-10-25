import { IotBoxEntity } from 'src/iot-box/domain/entities/iot-box.entity';
import { IUser } from 'src/shared/domain/entities/interfaces/user.interface';

export class CreateCustomerDto implements IUser {
  email: string;
  password?: string;
  isActive?: boolean;
  name: string;
  cpf: string;
  age: number;
  boxes: [];
}
