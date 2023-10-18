import { CPF } from 'src/shared/application/lib/CPF';
import { CustomerEntity } from '../../customer.entity';
import { IotBoxEntity } from 'src/iot-box/domain/entities/iot-box.entity';

describe('CustomerEntity unit tests', () => {
  let sut: CustomerEntity;

  it('should run methods correctly', () => {
    sut = new CustomerEntity({
      name: 'Jane Doe',
      age: 27,
      cpf: new CPF().generateRandomCpf('RJ'),
      boxes: [],
    });

    const box = new IotBoxEntity({
      name: 'Iot Box 1',
      battery: 1,
      customerId: sut.id,
      sensors: { gps: { latitude: 10.02, longitude: -20.2 } },
    });

    expect(sut.boxes.length).toBe(0);
    sut.acquireBox(box);
    expect(sut.boxes.length).toBe(1);
    expect(sut.boxes[0]).toStrictEqual(box);
  });
});
