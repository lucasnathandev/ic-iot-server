import { CustomerService } from '../customer/infra/customer.service';
import { AdminService } from '../admin/infra/admin.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AdminService,
    CustomerService,
    JwtService,
    ConfigService,
  ],
})
export class AuthModule {}
