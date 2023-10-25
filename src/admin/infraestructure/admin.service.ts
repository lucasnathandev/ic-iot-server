import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminApplicationService } from '../application/service/admin.application-service';
import { AdminRepositoryMemory } from './repositories/in-memory-admin.repository';
import { AdminRepository } from '../domain/repositories/admin.repository';
import { AdminEntity } from '../domain/entities/admin.entity';

@Injectable()
export class AdminService {
  private readonly application: AdminApplicationService;
  private readonly adminRepository: AdminRepository;
  constructor() {
    this.adminRepository = new AdminRepositoryMemory();
    this.application = new AdminApplicationService(this.adminRepository);
  }

  async create(createAdminDto: CreateAdminDto) {
    const admin = new AdminEntity(createAdminDto, uuid());
    return this.application.createAdmin(admin);
  }

  async findAllActive(): Promise<AdminEntity[]> {
    return await this.application.allActiveAdminList();
  }

  async findAll(): Promise<AdminEntity[]> {
    return await this.application.allAdminList();
  }

  async findOne(id: string) {
    return await this.application.findAdmin(id);
  }

  async searchAdmin(query: { email?: string; cpf?: string }) {
    return await this.application.searchAdmin(query);
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    await this.application.updateAdmin(id, updateAdminDto);
  }

  async delete(id: string) {
    return await this.application.deleteAdmin(id);
  }
}
