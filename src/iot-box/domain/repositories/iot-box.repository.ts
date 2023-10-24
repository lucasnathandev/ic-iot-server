import { Repository } from 'src/shared/domain/repository/repository';
import { IotBoxEntity } from '../entities/iot-box.entity';

export interface IotBoxRepository extends Repository<IotBoxEntity> {
  getAllActive(): Promise<IotBoxEntity[]>;
  findByName(name: string): Promise<IotBoxEntity>;
}
