import { Repository } from 'src/shared/domain/repository/repository';
import { IotBoxEntity } from '../entities/iot-box.entity';
import { BoxDataEntity } from '../entities/box-data.entity';

export interface IotBoxRepository extends Repository<IotBoxEntity> {
  getAllActive(): Promise<IotBoxEntity[]>;
  findByName(name: string): Promise<IotBoxEntity>;
  updateBoxData(id: string, data: BoxDataEntity): Promise<void>;
}
