import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerEntity } from '../domain/entites/customer.entity';
import { CustomerApplicationService } from '../application/service/customer.application-service';
import { CustomerRepository } from '../domain/repositories/customer.repository';
import bcrypt from 'bcrypt';
import userDatabase from 'src/shared/infra/data/user-database';
import { IotBoxRepository } from 'src/iot-box/domain/repositories/iot-box.repository';
import iotBoxDatabase from 'src/shared/infra/data/iot-box-database';

@Injectable()
export class CustomerService {
  private readonly application: CustomerApplicationService;
  private readonly customerRepository: CustomerRepository;
  private readonly iotBoxRepository: IotBoxRepository;
  constructor() {
    this.customerRepository = userDatabase.customerRepository;
    this.iotBoxRepository = iotBoxDatabase.iotBoxRepository;
    this.application = new CustomerApplicationService(
      this.customerRepository,
      this.iotBoxRepository,
    );
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<void> {
    const salt = await bcrypt.genSalt(12);
    const password = await bcrypt.hash(createCustomerDto.password, salt);
    const customer = new CustomerEntity(
      { ...createCustomerDto, password },
      uuid(),
    );
    await this.application.create(customer);
  }

  async findAll(): Promise<any | any[]> {
    const customers = await this.application.findAll();
    return this.getDataFromCustomer(customers);
  }

  async findOne(id: string): Promise<any> {
    const customer = await this.application.findOne(id);
    return this.getDataFromCustomer(customer);
  }

  async getCustomerBoxes(id: string): Promise<any[]> {
    const customerBoxes = await this.application.getCustomerBoxes(id);
    return customerBoxes.map((iotBox) => iotBox.getIotBoxData());
  }

  async acquireBox(id: string, iotBoxId: string): Promise<void> {
    return await this.application.acquireBox(id, iotBoxId);
  }

  async devolveBox(id: string, iotBoxId: string): Promise<void> {
    return await this.application.devolveBox(id, iotBoxId);
  }

  async searchCustomer(query: { email?: string; cpf?: string }): Promise<any> {
    const customer = await this.application.searchCustomer(query);
    return this.getDataFromCustomer(customer);
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<void> {
    if (updateCustomerDto.password) {
      const salt = await bcrypt.genSalt(12);
      const password = await bcrypt.hash(updateCustomerDto.password, salt);
      return await this.application.update(id, {
        ...updateCustomerDto,
        password,
      });
    }
    return await this.application.update(id, updateCustomerDto);
  }

  async delete(id: string): Promise<void> {
    await this.application.delete(id);
  }

  private getDataFromCustomer(arg: CustomerEntity | CustomerEntity[]) {
    if (arg instanceof Array) return arg.map((o) => o.getCustomerData());
    return arg.getCustomerData();
  }
}
