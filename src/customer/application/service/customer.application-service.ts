import { CustomerEntity } from 'src/customer/domain/entites/customer.entity';
import { CustomerRepository } from 'src/customer/domain/repositories/customer.repository';
import { BoxAcquisitionService } from 'src/customer/domain/services/box-acquisition.service';
import { UpdateCustomerDto } from 'src/customer/infraestructure/dto/update-customer.dto';
import { IotBoxRepository } from 'src/iot-box/domain/repositories/iot-box.repository';
import { CPF } from 'src/shared/application/lib/CPF';

export class CustomerApplicationService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly iotBoxRepository: IotBoxRepository,
  ) {}

  private readonly boxAcquisitionService: BoxAcquisitionService =
    new BoxAcquisitionService();

  async create(customer: CustomerEntity) {
    const isValidCPF = new CPF().validateCpf(customer.cpf);
    if (!isValidCPF) throw new Error('Invalid CPF');
    await this.customerRepository.save(customer);
  }

  async findAll(): Promise<CustomerEntity[]> {
    return await this.customerRepository.getAll();
  }

  async findOne(id: string) {
    return await this.customerRepository.get(id);
  }

  async acquireBox(id: string, iotBoxId: string) {
    const customer = await this.customerRepository.get(id);
    const box = await this.iotBoxRepository.get(iotBoxId);
    const updated = this.boxAcquisitionService.registerBoxOwnership(
      customer,
      box,
    );

    return Promise.all([
      this.customerRepository.update(updated.customer.id, updated.customer),
      this.iotBoxRepository.update(updated.box.id, updated.box),
    ]);
  }

  async devolveBox(id: string, iotBoxId: string) {
    const customer = await this.customerRepository.get(id);
    const box = await this.iotBoxRepository.get(iotBoxId);
    const updated = this.boxAcquisitionService.unregisterBoxOwnership(
      customer,
      box,
    );

    return Promise.all([
      this.customerRepository.update(updated.customer.id, updated.customer),
      this.iotBoxRepository.update(updated.box.id, updated.box),
    ]);
  }

  async searchCustomer(query: {
    email?: string;
    cpf?: string;
  }): Promise<CustomerEntity> {
    if (query.email) return this.customerRepository.findByEmail(query.email);
    if (query.cpf) return this.customerRepository.findByCpf(query.cpf);
  }

  async update(id: string, data: UpdateCustomerDto) {
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
