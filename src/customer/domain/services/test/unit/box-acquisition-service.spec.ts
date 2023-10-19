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
      { name: 'Lucas', cpf: new CPF().generateRandomCpf(), age: 34, boxes: [] },
      'fakeid',
    );

    const box = new IotBoxEntity({
      battery: 1,
      name: 'Lucas first box',
      sensors: { gps: stubGps },
    });

    sut.registerBoxOwnership(customer, box);
  });
});
