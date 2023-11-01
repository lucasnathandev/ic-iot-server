import { CustomerEntity } from 'src/customer/domain/entites/customer.entity';
import { CustomerRepository } from 'src/customer/domain/repositories/customer.repository';

export class CustomerRepositoryDatabase {
  findByEmail(email: string) {
    throw new Error('Method not implemented.');
  }
  findByCpf(cpf: string) {
    throw new Error('Method not implemented.');
  }
  get(id: string): Promise<CustomerEntity> {
    throw new Error('Method not implemented.');
  }
  save(entity: CustomerEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(entity: CustomerEntity | Partial<CustomerEntity>): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
