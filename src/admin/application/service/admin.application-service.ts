import { AdminEntity } from 'src/admin/domain/entities/admin.entity';
import { AdminRepository } from 'src/admin/domain/repositories/admin.repository';

export class AdminApplicationService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async findAdmin(id: string): Promise<AdminEntity> {
    return await this.adminRepository.get(id);
  }

  async createAdmin(admin: AdminEntity) {
    return await this.adminRepository.save(admin);
  }
}
