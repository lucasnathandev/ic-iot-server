import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AdminService } from 'src/admin/infraestructure/admin.service';
import { CustomerService } from 'src/customer/infraestructure/customer.service';
import { JwtService } from '@nestjs/jwt';
import { ICredentials } from 'src/shared/infra/interfaces/credentials.interface';
import { UnauthorizedException } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ThrottlerModule.forRoot()],
      providers: [AuthService, AdminService, CustomerService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login user with correct credentials', async () => {
    const credentials: ICredentials = {
      email: 'lucas@gmail.com',
      password: 'pass',
    };

    const userAuthenticated = await service.login(credentials, '192.168.0.1');
    expect(userAuthenticated).toBeInstanceOf(UnauthorizedException);
  });
});
