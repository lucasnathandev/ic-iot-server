import { CustomerEntity } from 'src/customer/domain/entites/customer.entity';
import { CustomerRepository } from 'src/customer/domain/repositories/customer.repository';

export class CustomerRepositoryMemory implements CustomerRepository {
  constructor() {
    this.customers = [];
  }
  public async getCustomers() {
    return this.customers;
  }

  async findByEmail(email: string) {
    const found = this.customers.find((customer) => customer.email === email);
    if (!found) throw new Error(`Cannot find customer by email ${email}`);
    return found;
  }

  async findByCpf(cpf: string) {
    const found = this.customers.find((customer) => customer.cpf === cpf);
    if (!found) throw new Error(`Cannot find customer by cpf ${cpf}`);
    return found;
  }

  async get(id: string): Promise<CustomerEntity> {
    const found = this.customers.find((customer) => customer.id === id);
    if (!found) throw new Error(`Cannot find customer by id ${id}`);
    return found;
  }

  async getAll(): Promise<CustomerEntity[]> {
    return this.customers;
  }

  async save(entity: CustomerEntity): Promise<void> {
    this.customers.push(entity);
  }
  async update(
    id: string,
    data: CustomerEntity | Partial<CustomerEntity>,
  ): Promise<void> {
    const index = this.customers.findIndex((customer) => customer.id === id);

    if (index === -1) throw new Error(`Cannot find customer to update`);

    const customer = this.customers[index];
    customer.age = data.age;
    customer.updatedAt = new Date();
  }

  async delete(id: string): Promise<void> {
    this.customers = this.customers.filter((customer) => customer.id !== id);
  }
  private customers: CustomerEntity[];
}
