import { CustomerEntity } from 'src/customer/domain/entites/customer.entity';
import { CustomerApplicationService } from '../../customer.application-service';
import { CustomerRepositoryMemory } from 'src/customer/infraestructure/repositories/in-memory-customer.repository';
import { CPF } from 'src/shared/application/lib/CPF';
import { IotBoxEntity } from 'src/iot-box/domain/entities/iot-box.entity';
describe('CustomerApplicationService integration tests', () => {
  let sut: CustomerApplicationService;

  it('should run methods correctly', async () => {
    sut = new CustomerApplicationService(new CustomerRepositoryMemory());

    const stubCustomer = new CustomerEntity(
      {
        name: 'lucas',
        age: 20,
        cpf: '12345678909',
        boxes: [],
        email: 'lucas@gmail.com',
        password: 'anypassword',
      },
      'fakeid',
    );
    await sut.create(stubCustomer);

    expect(
      await sut.searchCustomer({ email: stubCustomer.email }),
    ).toStrictEqual(stubCustomer);
    expect(await sut.searchCustomer({ cpf: stubCustomer.cpf })).toStrictEqual(
      stubCustomer,
    );
    expect(await sut.findOne(stubCustomer.id)).toStrictEqual(stubCustomer);
    await sut.update('fakeid', {
      name: 'Jane',
      cpf: new CPF().generateRandomCpf(),
      boxes: [],
      email: 'jane@gmail.com',
      password: 'anypassword',
    });

    const stubCustomerJane = await sut.findOne(stubCustomer.id);

    const stubBox = new IotBoxEntity(
      {
        name: 'Jane Box',
        sensors: {
          gps: {
            latitude: 45,
            longitude: -30,
          },
        },
      },
      'janeboxid',
    );

    expect(stubCustomerJane.name).toBe('Jane');
    expect(stubCustomerJane.id).toBe(stubCustomer.id);
    expect(stubCustomerJane.email).toBe(stubCustomer.email);
    await sut.boxAcquisitionService.registerBoxOwnership(
      stubCustomerJane,
      stubBox,
    );
    let janeBoxes = await sut.getCustomerBoxes(stubCustomerJane.id);
    expect(janeBoxes.length).toBe(1);
    expect(janeBoxes.includes(stubBox)).toBeTruthy();
    sut.boxAcquisitionService.unregisterBoxOwnership(stubCustomerJane, stubBox);
    janeBoxes = await sut.getCustomerBoxes(stubCustomerJane.id);
    expect(janeBoxes).toHaveLength(0);
  });
});
