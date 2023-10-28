import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminService } from 'src/admin/infraestructure/admin.service';
import { CustomerService } from 'src/customer/infraestructure/customer.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ThrottlerModule.forRoot()],
      controllers: [AuthController],
      providers: [
        AuthService,
        AdminService,
        CustomerService,
        JwtService,
        ConfigService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
