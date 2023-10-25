import { CustomerEntity } from 'src/customer/domain/entites/customer.entity';
import { CustomerRepository } from 'src/customer/domain/repositories/customer.repository';
import { BoxAcquisitionService } from 'src/customer/domain/services/box-acquisition.service';

export class CustomerApplicationService {
  constructor(private customerRepository: CustomerRepository) {}

  public boxAcquisitionService: BoxAcquisitionService =
    new BoxAcquisitionService();

  async create(customer: CustomerEntity) {
    await this.customerRepository.save(customer);
  }

  async findAll(): Promise<CustomerEntity[]> {
    return await this.customerRepository.getAll();
  }

  async findOne(id: string) {
    return await this.customerRepository.get(id);
  }

  async searchCustomer(query: {
    email?: string;
    cpf?: string;
  }): Promise<CustomerEntity> {
    if (query.email) return this.customerRepository.findByEmail(query.email);
    if (query.cpf) return this.customerRepository.findByCpf(query.cpf);
  }

  async update(id: string, data: Partial<CustomerEntity>) {
    return await this.customerRepository.update(id, data);
  }

  async delete(id: string) {
    return await this.customerRepository.delete(id);
  }

  async getCustomerBoxes(id: string) {
    const customer = await this.customerRepository.get(id);
    return customer.boxes;
  }
}
