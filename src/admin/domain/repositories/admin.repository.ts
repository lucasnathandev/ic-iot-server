import { Repository } from 'src/shared/domain/repository/repository';
import { AdminEntity } from '../entities/admin.entity';

export interface AdminRepository extends Repository<AdminEntity> {
  findByEmail(email: string): Promise<AdminEntity>;
}
