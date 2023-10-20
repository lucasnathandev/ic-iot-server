import { CustomerEntity } from 'src/customer/domain/entites/customer.entity';
import { CustomerApplicationService } from '../../customer.application-service';
import { CustomerRepositoryMemory } from 'src/customer/infraestructure/repositories/in-memory-customer.repository';
import { CPF } from 'src/shared/application/lib/CPF';
describe('CustomerApplicationService integration tests', () => {
  let sut: CustomerApplicationService;

  it('should run methods correctly', async () => {
    sut = new CustomerApplicationService(new CustomerRepositoryMemory());

    const stubCustomer = new CustomerEntity(
      {
        name: 'lucas',
        age: 20,
        cpf: '12345678901',
        boxes: [],
        email: 'lucas@gmail.com',
      },
      'fakeid',
    );
    await sut.create(stubCustomer);

    expect(await sut.findByEmail(stubCustomer.email)).toStrictEqual(
      stubCustomer,
    );
    expect(await sut.findByCpf(stubCustomer.cpf)).toStrictEqual(stubCustomer);
    expect(await sut.findById(stubCustomer.id)).toStrictEqual(stubCustomer);
    await sut.update(
      new CustomerEntity(
        {
          name: 'Jane',
          age: 30,
          cpf: new CPF().generateRandomCpf(),
          boxes: [],
          email: 'jane@gmail.com',
        },
        'fakeid',
      ),
    );

    const stubCustomerJane = await sut.findById(stubCustomer.id);

    expect(stubCustomerJane.age).toBe(30);
    expect(stubCustomerJane.id).toBe(stubCustomer.id);
    expect(stubCustomerJane.email).toBe(stubCustomer.email);
  });
});
