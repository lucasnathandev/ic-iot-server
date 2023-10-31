import { AdminEntity } from 'src/admin/domain/entities/admin.entity';
import { AdminRepositoryMemory } from '../../in-memory-admin.repository';
import { CPF } from 'src/shared/application/lib/CPF';

describe('AdminRepositoryMemory unit tests', () => {
  let sut: AdminRepositoryMemory;
  beforeEach(() => {
    sut = new AdminRepositoryMemory();
  });

  it('should run methods corretly', async () => {
    expect(sut).toBeDefined();

    const admin: AdminEntity = new AdminEntity({
      name: 'Lucas admin',
      cpf: new CPF().generateRandomCpf(),
      email: 'lucasadmin@gmail.com',
      password: 'fakepass',
      age: 27,
    });

    await sut.save(admin);

    const foundByEmail = await sut.findByEmail(admin.email);
    const foundByCPF = await sut.findByCPF(admin.cpf);
    const foundById = await sut.get(admin.id);
    await expect(sut.findByEmail('anyemail')).rejects.toThrow();
    await expect(sut.findByCPF('anycpf')).rejects.toThrow();
    await expect(sut.get('anyid')).rejects.toThrow();
    await expect(
      sut.update('nonexistingid', { password: 'asd' }),
    ).rejects.toThrow();
    expect(foundByEmail).toStrictEqual(admin);
    expect(foundByCPF).toStrictEqual(admin);
    expect(foundById).toStrictEqual(admin);

    await sut.update(admin.id, {
      password: 'newpass',
    });

    expect(await sut.get(admin.id)).not.toContain({ password: 'fakenewpass' });
    expect(await sut.get(admin.id)).toContain({ password: 'newpass' });

    await sut.delete(admin.id);
  });
});
