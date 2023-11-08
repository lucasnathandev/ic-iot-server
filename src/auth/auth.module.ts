import { CustomerService } from '../customer/infra/customer.service';
import { AdminService } from '../admin/infra/admin.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AdminService,
    CustomerService,
    ConfigService,
    JwtService,
  ],
})
export class AuthModule {}
