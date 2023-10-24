import { AdminEntity } from 'src/admin/domain/entities/admin.entity';
import { AdminRepository } from 'src/admin/domain/repositories/admin.repository';
import { UpdateAdminDto } from '../dto/update-admin.dto';

export class AdminRepositoryMemory implements AdminRepository {
  async findByCPF(cpf: string): Promise<AdminEntity> {
    const found = this.admins.find((admin) => admin.cpf === cpf);
    if (!found) throw new Error(`Cannot find admin by cpf ${cpf}`);
    return found;
  }
  async getAll(): Promise<AdminEntity[]> {
    return this.admins;
  }
  async findByEmail(email: string): Promise<AdminEntity> {
    const found = this.admins.find((admin) => admin.email === email);
    if (!found) throw new Error(`Cannot find admin by email ${email}`);
    return found;
  }
  async get(id: string): Promise<AdminEntity> {
    const found = this.admins.find((admin) => admin.id === id);
    if (!found) throw new Error(`Cannot find admin by id ${id}`);
    return found;
  }

  async save(entity: AdminEntity): Promise<void> {
    this.admins.push(entity);
  }

  async update(id: string, data: UpdateAdminDto): Promise<void> {
    const index = this.admins.findIndex((admin) => admin.id === id);
    if (index === -1) throw new Error(`Cannot find admin by id ${id}`);
    const adminToUpdate = this.admins[index];
    data.password && adminToUpdate.changePassword(data.password);
    data.isActive && adminToUpdate.unactivateAdmin();
    this.admins[index] = adminToUpdate;
  }

  async delete(id: string): Promise<void> {
    const index = this.admins.findIndex((admin) => admin.id === id);
    if (index === -1) throw new Error(`Cannot find admin by id ${id}`);
    this.admins[index].unactivateAdmin();
  }

  private admins: AdminEntity[] = [];
}
