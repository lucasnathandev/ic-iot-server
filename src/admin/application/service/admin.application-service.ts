import { AdminEntity } from 'src/admin/domain/entities/admin.entity';
import { AdminRepository } from 'src/admin/domain/repositories/admin.repository';
import { UpdateAdminDto } from 'src/admin/infraestructure/dto/update-admin.dto';
import { CPF } from 'src/shared/application/lib/CPF';

export class AdminApplicationService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async allAdminList(): Promise<AdminEntity[]> {
    return await this.adminRepository.getAll();
  }

  async allActiveAdminList(): Promise<AdminEntity[]> {
    return await this.adminRepository.getAllActive();
  }

  async findAdmin(id: string): Promise<AdminEntity> {
    return await this.adminRepository.get(id);
  }

  async searchAdmin(query: {
    email?: string;
    cpf?: string;
  }): Promise<AdminEntity> {
    if (query.email) return await this.adminRepository.findByEmail(query.email);
    if (query.cpf) return await this.adminRepository.findByCPF(query.cpf);
  }

  async createAdmin(admin: AdminEntity): Promise<void> {
    const isValidCpf = new CPF(admin.cpf).validateCpf();
    if (!isValidCpf) throw new Error('Invalid CPF');

    await this.adminRepository.save(admin);
  }

  async updateAdmin(id: string, updateAdmin: UpdateAdminDto): Promise<void> {
    return await this.adminRepository.update(id, updateAdmin);
  }

  async deleteAdmin(id: string): Promise<void> {
    return await this.adminRepository.delete(id);
  }
}
