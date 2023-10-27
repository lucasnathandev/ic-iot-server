import { CustomerService } from './../customer/infraestructure/customer.service';
import { AdminService } from './../admin/infraestructure/admin.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AdminService, CustomerService, JwtService],
})
export class AuthModule {}
