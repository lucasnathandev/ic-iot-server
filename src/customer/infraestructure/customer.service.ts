import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerEntity } from '../domain/entites/customer.entity';
import { CustomerApplicationService } from '../application/service/customer.application-service';
import { CustomerRepository } from '../domain/repositories/customer.repository';
import { CustomerRepositoryMemory } from './repositories/in-memory-customer.repository';

@Injectable()
export class CustomerService {
  private readonly application: CustomerApplicationService;
  private readonly customerRepository: CustomerRepository;
  constructor() {
    this.customerRepository = new CustomerRepositoryMemory();
    this.application = new CustomerApplicationService(this.customerRepository);
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<void> {
    const customer = new CustomerEntity(createCustomerDto, uuid());
    await this.application.create(customer);
  }

  async findAll(): Promise<CustomerEntity[]> {
    return await this.application.findAll();
  }

  async findOne(id: string): Promise<CustomerEntity> {
    return await this.application.findOne(id);
  }

  async searchCustomer(query: {
    email?: string;
    cpf?: string;
  }): Promise<CustomerEntity> {
    return await this.application.searchCustomer(query);
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<void> {
    return await this.application.update(id, updateCustomerDto);
  }

  async delete(id: string): Promise<void> {
    await this.application.delete(id);
  }
}
