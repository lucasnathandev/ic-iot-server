import { AdminEntity } from 'src/admin/domain/entities/admin.entity';
import { AdminRepository } from 'src/admin/domain/repositories/admin.repository';
import { AdminRepositoryMemory } from 'src/admin/infraestructure/repositories/in-memory-admin.repository';
import { AdminApplicationService } from '../admin.application-service';
import { CPF } from 'src/shared/application/lib/CPF';
describe('AdminApplicationService integration tests', () => {
  let adminRepository: AdminRepository;
  let sut: AdminApplicationService;
  beforeEach(() => {
    adminRepository = new AdminRepositoryMemory();
    sut = new AdminApplicationService(adminRepository);
  });

  it('should run methods corretly', async () => {
    const stubAdmin = new AdminEntity(
      {
        name: 'I am admin',
        age: 35,
        cpf: new CPF().generateRandomCpf(),
        email: 'iamadmin@gmail.com',
        password: 'iamadminpass',
        isActive: true,
      },
      'fakeadminid',
    );

    await sut.createAdmin(stubAdmin);
    expect(await sut.findAdmin(stubAdmin.id)).toStrictEqual(stubAdmin);
    await expect(sut.findAdmin('anyadminid')).rejects.toThrow();
    const allAdminList = await sut.allAdminList();
    const foundAdmin = await sut.findAdmin(stubAdmin.id);
    const foundAdminBySearchEmail = await sut.searchAdmin({
      email: stubAdmin.email,
    });
    const foundAdminBySearchCPF = await sut.searchAdmin({
      cpf: stubAdmin.cpf,
    });
    expect(allAdminList).toHaveLength(1);
    expect(foundAdmin).toStrictEqual(stubAdmin);
    expect(foundAdminBySearchEmail).toStrictEqual(stubAdmin);
    expect(foundAdminBySearchCPF).toStrictEqual(stubAdmin);

    await sut.updateAdmin(stubAdmin.id, { password: '123456' });
    expect(await sut.findAdmin(stubAdmin.id)).toContain({ password: '123456' });
    await sut.deleteAdmin(stubAdmin.id);
    await expect(sut.findAdmin(stubAdmin.id)).rejects.toThrow();
    expect(await sut.allActiveAdminList()).toHaveLength(0);
  });
});
