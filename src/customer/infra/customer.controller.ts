import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('create')
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customerService.create(createCustomerDto);
  }

  @Post('acquire/:customerId/box/:boxId')
  async acquireBox(
    @Param('customerId') id: string,
    @Param('boxId') iotBoxId: string,
  ) {
    return await this.customerService.acquireBox(id, iotBoxId);
  }

  @Patch('acquire/:customerId/box/:boxId')
  async devolveBox(
    @Param('customerId') id: string,
    @Param('boxId') iotBoxId: string,
  ) {
    return await this.customerService.devolveBox(id, iotBoxId);
  }

  @Get()
  async findAll(@Query('email') email?: string, @Query('cpf') cpf?: string) {
    if (email) return this.customerService.searchCustomer({ email });
    if (cpf) return this.customerService.searchCustomer({ cpf });
    return await this.customerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.customerService.findOne(id);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return await this.customerService.update(id, updateCustomerDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.customerService.delete(id);
  }
}
