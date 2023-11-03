import { CustomerService } from '../customer/infra/customer.service';
import { AdminService } from '../admin/infra/admin.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXP,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AdminService, CustomerService, ConfigService],
})
export class AuthModule {}
