import { CustomerEntity } from 'src/customer/domain/entites/customer.entity';
import { CustomerApplicationService } from '../../customer.application-service';
import { CustomerRepositoryMemory } from 'src/customer/infraestructure/repositories/in-memory-customer.repository';

import { IotBoxEntity } from 'src/iot-box/domain/entities/iot-box.entity';
import { IotBoxRepositoryMemory } from 'src/iot-box/infraestructure/repositories/in-memory-iot-box.repository';
describe('CustomerApplicationService integration tests', () => {
  let sut: CustomerApplicationService;

  it('should run methods correctly', async () => {
    const boxRepository = new IotBoxRepositoryMemory();
    sut = new CustomerApplicationService(
      new CustomerRepositoryMemory(),
      boxRepository,
    );

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

    boxRepository.save(stubBox);
    expect(stubCustomerJane.name).toBe('Jane');
    expect(stubCustomerJane.id).toBe(stubCustomer.id);
    expect(stubCustomerJane.email).toBe(stubCustomer.email);

    await sut.acquireBox(stubCustomerJane.id, stubBox.id);
    let janeBoxes = await sut.getCustomerBoxes(stubCustomerJane.id);
    expect(janeBoxes.length).toBe(1);
    expect(janeBoxes.includes(stubBox)).toBeTruthy();

    await sut.devolveBox(stubCustomerJane.id, stubBox.id);
    janeBoxes = await sut.getCustomerBoxes(stubCustomerJane.id);
    expect(janeBoxes).toHaveLength(0);
  });
});
