import { IotBoxEntity } from 'src/iot-box/domain/entities/iot-box.entity';
import { IPerson } from 'src/shared/domain/entities/interfaces/person.interface';

export interface CustomerProps extends IPerson {
  name: string;
  email: string;
  age: number;
  readonly cpf: string;
  boxes: IotBoxEntity[];
}
