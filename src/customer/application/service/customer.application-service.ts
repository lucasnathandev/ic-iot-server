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

  async findById(id: string) {
    return await this.customerRepository.get(id);
  }

  async findByEmail(name: string) {
    return await this.customerRepository.findByEmail(name);
  }

  async findByCpf(cpf: string) {
    return await this.customerRepository.findByCpf(cpf);
  }

  async update(data: Partial<CustomerEntity>) {
    return await this.customerRepository.update(data.id, data);
  }

  async delete(id: string) {
    return await this.customerRepository.delete(id);
  }
}
