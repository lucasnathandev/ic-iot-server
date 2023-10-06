import { CPF } from 'src/shared/application/lib/CPF';
import { CustomerEntity } from '../../customer.entity';
import { IotBoxEntity } from 'src/iot-box/domain/entities/iot-box.entity';

describe('CustomerEntity unit tests', () => {
  let sut: CustomerEntity;
  it('should have defined properties', () => {
    sut = new CustomerEntity({
      name: 'John Doe',
      age: 35,
      cpf: new CPF().generateRandomCpf('SP'),
      boxes: [],
    });

    expect(sut.props.name).toBeDefined();
    expect(sut.props.age).toBeDefined();
    expect(sut.props.cpf).toBeDefined();
    expect(sut.props.boxes).toBeDefined();
  });

  it('should run gettes and setters correctly', () => {
    const cpf = new CPF().generateRandomCpf('RS');

    sut = new CustomerEntity({
      name: 'Test Name',
      age: 27,
      cpf,
      boxes: [],
    });

    sut.name = 'Changed Name';
    sut.age = 30;

    expect(sut.name).toBe('Changed Name');
    expect(sut.age).toBe(30);
    expect(sut.cpf).toBe(cpf);
    expect(sut.boxes).toStrictEqual([]);
  });

  it('should run methods correctly', () => {
    sut = new CustomerEntity({
      name: 'Jane Doe',
      age: 27,
      cpf: new CPF().generateRandomCpf('RJ'),
      boxes: [],
    });

    const box = new IotBoxEntity({
      battery: 1,
      customerId: sut.id,
      date: new Date(),
      hourTime: '12:00',
      sensors: { gps: { latitude: 10.02, longitude: -20.2 } },
    });

    expect(sut.boxes.length).toBe(0);
    sut.acquireBox(box);
    expect(sut.boxes.length).toBe(1);
    expect(sut.boxes[0]).toStrictEqual(box);
  });
});
