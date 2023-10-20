import { Repository } from 'src/shared/domain/repository/repository';
import { CustomerEntity } from '../entites/customer.entity';

export interface CustomerRepository extends Repository<CustomerEntity> {
  findByEmail(email: string): Promise<CustomerEntity>;
  findByCpf(cpf: string): Promise<CustomerEntity>;
  getAll(): Promise<CustomerEntity[]>;
}
