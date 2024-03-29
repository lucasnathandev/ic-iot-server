import { CustomerEntity } from 'src/customer/domain/entites/customer.entity';
import { IGPS } from 'src/iot-box/domain/entities/interfaces/gps.interface';
import { IotBoxEntity } from 'src/iot-box/domain/entities/iot-box.entity';
import { CPF } from 'src/shared/application/lib/CPF';
import { BoxAcquisitionService } from '../../box-acquisition.service';

describe('BoxAcquisitionService unit tests', () => {
  let sut: BoxAcquisitionService;

  beforeEach(() => {
    sut = new BoxAcquisitionService();
  });

  it('should run methods correctly', () => {
    const stubGps: IGPS = { latitude: 22.345, longitude: 123.9485 };

    const customer = new CustomerEntity(
      {
        name: 'Lucas',
        cpf: new CPF().generateRandomCpf(),
        password: '123',
        age: 34,
        boxes: [],
        email: 'lucas@email.com',
      },
      'fakeid',
    );

    const box = new IotBoxEntity({
      name: 'Lucas first box',
      sensors: { gps: stubGps },
    });

    sut.registerBoxOwnership(customer, box);

    expect(box.customerId).toBe('fakeid');
    expect(customer.boxes.includes(box)).toBeTruthy();

    sut.unregisterBoxOwnership(customer, box);
    expect(box.customerId).toBeNull();
    expect(customer.boxes.includes(box)).toBeFalsy();
  });
});
