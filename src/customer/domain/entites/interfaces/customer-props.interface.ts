import { IotBoxEntity } from 'src/iot-box/domain/entities/iot-box.entity';
import { IUser } from 'src/shared/domain/entities/interfaces/user.interface';

export interface CustomerProps extends IUser {
  boxes?: IotBoxEntity[];
}
