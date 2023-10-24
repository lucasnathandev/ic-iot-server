import { Repository } from 'src/shared/domain/repository/repository';
import { AdminEntity } from '../entities/admin.entity';

export interface AdminRepository extends Repository<AdminEntity> {
  getAllActive(): Promise<AdminEntity[]>;
  findByEmail(email: string): Promise<AdminEntity>;
  findByCPF(cpf: string): Promise<AdminEntity>;
}
