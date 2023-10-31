import { AdminRepository } from 'src/admin/domain/repositories/admin.repository';
import { CustomerRepository } from '../../../customer/domain/repositories/customer.repository';
import { AdminRepositoryMemory } from 'src/admin/infraestructure/repositories/in-memory-admin.repository';
import { CustomerRepositoryMemory } from 'src/customer/infraestructure/repositories/in-memory-customer.repository';

class UserDatabase {
  public readonly adminRepository: AdminRepository;
  public readonly customerRepository: CustomerRepository;
  constructor() {
    this.adminRepository = new AdminRepositoryMemory();
    this.customerRepository = new CustomerRepositoryMemory();
  }
}

export default new UserDatabase();
