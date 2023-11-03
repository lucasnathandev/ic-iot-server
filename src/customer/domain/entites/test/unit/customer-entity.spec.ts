import { CPF } from 'src/shared/application/lib/CPF';
import { CustomerEntity } from '../../customer.entity';
import { IotBoxEntity } from 'src/iot-box/domain/entities/iot-box.entity';

describe('CustomerEntity unit tests', () => {
  let sut: CustomerEntity;

  it('should run methods correctly', () => {
    const stubCustomerProps = {
      name: 'Jane Doe',
      age: 27,
      cpf: new CPF().generateRandomCpf('RJ'),
      boxes: [],
      email: 'jane@gmail.com',
      password: 'anypassword',
    };
    sut = new CustomerEntity(stubCustomerProps);

    const stubBoxProps = {
      name: 'Iot Box 1',
      customerId: sut.id,
      sensors: { gps: { latitude: 10.02, longitude: -20.2 } },
    };
    const box = new IotBoxEntity(stubBoxProps, 'fakeboxid');

    expect(sut.boxes.length).toBe(0);

    sut.acquireBox(box);
    expect(sut.boxes.length).toBe(1);
    expect(sut.boxes[0]).toStrictEqual(box);

    sut.releaseBox(box.id);
    expect(sut.boxes.includes(box)).toBeFalsy();

    const { createdAt, updatedAt, ...customerData } = sut.getCustomerData();
    const { password: _, ...customerRest } = stubCustomerProps;
    const expected = { id: sut.id, ...customerRest };
    expect(customerData).toStrictEqual(expected);
  });
});
