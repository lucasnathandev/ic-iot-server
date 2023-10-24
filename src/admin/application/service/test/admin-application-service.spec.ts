import { AdminEntity } from 'src/admin/domain/entities/admin.entity';
import { AdminRepository } from 'src/admin/domain/repositories/admin.repository';
import { AdminRepositoryMemory } from 'src/admin/infraestructure/repositories/in-memory-admin.repository';
import { AdminApplicationService } from '../admin.application-service';
describe('AdminApplicationService integration tests', () => {
  let adminRepository: AdminRepository;
  let sut: AdminApplicationService;
  beforeEach(() => {
    adminRepository = new AdminRepositoryMemory();
    sut = new AdminApplicationService(adminRepository);
  });

  it('should run methods corretly', async () => {
    const stubAdmin = new AdminEntity({
      name: 'I am admin',
      age: 35,
      cpf: '12345678901',
      email: 'iamadmin@gmail.com',
      password: 'iamadminpass',
      isActive: true,
    });

    await sut.createAdmin(stubAdmin);
    expect(await sut.findAdmin(stubAdmin.id)).toStrictEqual(stubAdmin);
    await expect(sut.findAdmin('fakeadminid')).rejects.toThrow();
  });
});
