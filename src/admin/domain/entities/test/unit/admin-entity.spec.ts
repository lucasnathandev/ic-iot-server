import { CPF } from 'src/shared/application/lib/CPF';
import { AdminEntity } from '../../admin.entity';

describe('AdminEntity unit tests', () => {
  let sut: AdminEntity;
  it('should run methods corretly', () => {
    const stubProps = {
      name: 'Lucas',
      age: 27,
      cpf: new CPF().generateRandomCpf(),
      email: 'lucas@gmail.com',
      password: 'anypassword',
    };
    sut = new AdminEntity(stubProps);

    expect(sut.passwordChanged).toBeFalsy();
    sut.changePassword('12345');
    expect(sut.passwordChanged).toBeTruthy();
    expect(sut.isActive).toBeTruthy();
    sut.unactivateAdmin();
    expect(sut.isActive).toBeFalsy();

    const { createdAt, updatedAt, ...restAdminData } = sut.getAdminData();
    expect(restAdminData).toStrictEqual({
      id: sut.id,
      ...stubProps,
      role: 'Admin',
    });
  });
});
