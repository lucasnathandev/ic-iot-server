import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ICredentials } from 'src/shared/infra/interfaces/credentials.interface';
import bcrypt from 'bcrypt';
import { AdminService } from 'src/admin/infraestructure/admin.service';
import { CustomerService } from 'src/customer/infraestructure/customer.service';
import { JwtService } from '@nestjs/jwt';
import { CustomerEntity } from 'src/customer/domain/entites/customer.entity';
import { AdminEntity } from 'src/admin/domain/entities/admin.entity';
import { UserEntity } from 'src/shared/domain/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly customerService: CustomerService,
    private readonly jwtService: JwtService,
  ) {}

  async login(credentials: ICredentials, ip: string) {
    try {
      const validUser: UserEntity<any> | any =
        this.validateCredentials(credentials);
      const isAdmin = validUser instanceof AdminEntity;

      const token = await this.jwtService.signAsync(
        {
          id: validUser.id,
          role: isAdmin ? validUser.role : undefined,
          ip,
        },
        { secret: process.env.JWT_SECRET },
      );

      return { token };
    } catch (error) {
      console.log(error);

      return error;
    }
  }

  private async findUser(
    email: string,
  ): Promise<CustomerEntity | AdminEntity | any> {
    try {
      const user = await this.adminService.searchAdmin({ email });
      return user;
    } catch {
      try {
        const user = await this.customerService.searchCustomer({ email });
        return user;
      } catch (error) {
        return { error };
      }
    }
  }

  private async validateCredentials(credentials: ICredentials) {
    try {
      const { email, password } = credentials;

      const foundUser = await this.findUser(email);

      if (foundUser.error)
        throw new UnauthorizedException('Invalid credentials');

      const isValidPassword = await bcrypt.compare(
        password,
        foundUser.password,
      );

      if (!isValidPassword)
        throw new UnauthorizedException('Invalid credentials');

      return foundUser;
    } catch (error) {
      return error;
    }
  }
}
