import { CPF } from 'src/shared/application/lib/CPF';
import { AdminEntity } from '../../admin.entity';

describe('AdminEntity unit tests', () => {
  let sut: AdminEntity;
  it('should run methods corretly', () => {
    sut = new AdminEntity({
      name: 'Lucas',
      age: 27,
      cpf: new CPF().generateRandomCpf(),
      boxes: [],
      email: 'lucas@gmail.com',
      role: 'Admin',
    });

    expect(sut.passwordChanged).toBeFalsy();
    sut.changePassword('12345');
    expect(sut.passwordChanged).toBeTruthy();
    expect(sut.isActive).toBeTruthy();
    sut.unactivateAdmin();
    expect(sut.isActive).toBeFalsy();
  });
});
