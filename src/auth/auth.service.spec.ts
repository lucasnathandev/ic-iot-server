import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ICredentials } from 'src/shared/infra/interfaces/credentials.interface';
import { AdminService } from 'src/admin/infra/admin.service';
import { CustomerService } from 'src/customer/infra/customer.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import envConfig from 'src/shared/infra/env.config';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secretOrPrivateKey: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: process.env.JWT_EXP,
          },
        }),
        ConfigModule.forRoot({
          load: [envConfig],
        }),
      ],
      providers: [
        AuthService,
        AdminService,
        CustomerService,
        JwtService,
        ConfigService,
      ],
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

    await expect(service.login(credentials, '192.168.0.1')).rejects.toThrow();
  });
});
