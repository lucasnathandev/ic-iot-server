import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ICredentials } from './interfaces/credentials.interface';
import { AdminService } from 'src/admin/infraestructure/admin.service';
import { CustomerService } from 'src/customer/infraestructure/customer.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    private adminService: AdminService,
    private customerService: CustomerService,
    private jwtService: JwtService,
  ) {}

  async signIn() {
    const user = Promise.all(
      this.customerService.findOne(username),
      this.adminService.findByEmail(),
    );

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  authenticateUser(credentials: ICredentials): {};
}
