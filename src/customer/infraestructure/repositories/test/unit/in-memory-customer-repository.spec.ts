import { CustomerEntity } from 'src/customer/domain/entites/customer.entity';
import { CustomerRepositoryMemory } from '../../in-memory-customer.repository';
import { CPF } from 'src/shared/application/lib/CPF';

describe('CustomerRepositoryMemory unit tests', () => {
  it('shoud run methods correctly', async () => {
    const sut = new CustomerRepositoryMemory();

    const stubCustomer = new CustomerEntity(
      {
        name: 'John',
        age: 39,
        cpf: new CPF().generateRandomCpf(),
        boxes: [],
        email: 'john@gmail.com',
      },
      'johnid',
    );

    expect(await sut.save(stubCustomer));
    expect(await sut.findByEmail(stubCustomer.email)).toStrictEqual(
      stubCustomer,
    );
    expect(await sut.findByCpf(stubCustomer.cpf)).toStrictEqual(stubCustomer);
    expect(await sut.get(stubCustomer.id)).toStrictEqual(stubCustomer);
    await sut.update(stubCustomer.id, { age: 30 });

    expect(await sut.get(stubCustomer.id)).toContain({ age: 30 });
    await sut.delete(stubCustomer.id);
    expect((await sut.getCustomers()).includes(stubCustomer)).toBeFalsy();
  });
});
