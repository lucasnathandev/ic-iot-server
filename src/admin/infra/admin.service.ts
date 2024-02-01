import uuid from 'src/shared/infra/lib/uuid';
import { Injectable, Logger } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminApplicationService } from '../application/service/admin.application-service';

import { AdminRepository } from '../domain/repositories/admin.repository';
import { AdminEntity } from '../domain/entities/admin.entity';
import bcrypt from 'bcrypt';
import userDatabase from 'src/shared/infra/data/user-database';

@Injectable()
export class AdminService {
  private readonly application: AdminApplicationService;
  private readonly adminRepository: AdminRepository;
  constructor() {
    this.adminRepository = userDatabase.adminRepository;
    this.application = new AdminApplicationService(this.adminRepository);
  }

  private readonly logger: Logger = new Logger(AdminService.name);

  async create(createAdminDto: CreateAdminDto) {
    this.logger.log('Aqui');

    const salt = await bcrypt.genSalt(12);
    const password = await bcrypt.hash(createAdminDto.password, salt);
    const admin = new AdminEntity({ ...createAdminDto, password }, uuid());
    this.logger.log('Indo pra criar admin');

    await this.application.createAdmin(admin);
    this.logger.log('Admin created');
  }

  async findAllActive(): Promise<any> {
    const activeAdmins = await this.application.allActiveAdminList();

    return this.getDataFromAdmin(activeAdmins);
  }

  async findAll(): Promise<any | any[]> {
    const adminList = await this.application.allAdminList();
    return this.getDataFromAdmin(adminList);
  }

  async findOne(id: string) {
    const admin = await this.application.findAdmin(id);
    return this.getDataFromAdmin(admin);
  }

  async searchAdmin(query: { email?: string; cpf?: string }) {
    const admin = await this.application.searchAdmin(query);
    return this.getDataFromAdmin(admin);
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const salt = await bcrypt.genSalt(12);
    this.logger.log('Salt');
    const password = await bcrypt.hash(updateAdminDto.password, salt);
    this.logger.log('Password');
    await this.application.updateAdmin(id, { ...updateAdminDto, password });
    this.logger.log('Admin updated');
  }

  async delete(id: string) {
    await this.application.deleteAdmin(id);
    this.logger.log('Admin deleted');
  }

  private getDataFromAdmin(arg: AdminEntity | AdminEntity[]) {
    if (arg instanceof Array) {
      return arg.map((o) => o.getAdminData());
    }
    return arg.getAdminData();
  }
}
