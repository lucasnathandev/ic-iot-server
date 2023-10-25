import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ICredentials } from './interfaces/credentials.interface';
import { AdminService } from 'src/admin/infraestructure/admin.service';
import { CustomerService } from 'src/customer/infraestructure/customer.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  authenticateUser(credentials: ICredentials) {
    return credentials;
  }
}
