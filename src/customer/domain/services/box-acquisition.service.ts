import { IotBoxEntity } from 'src/iot-box/domain/entities/iot-box.entity';
import { CustomerEntity } from '../entites/customer.entity';

export class BoxAcquisitionService {
  public registerBoxOwnership(customer: CustomerEntity, box: IotBoxEntity) {
    customer.acquireBox(box);
    box.setBoxOwnerId(customer.id);
    return { customer, box };
  }

  public unregisterBoxOwnership(customer: CustomerEntity, box: IotBoxEntity) {
    customer.releaseBox(box.id);
    box.unbindOwnerCustomer();
    return { customer, box };
  }
}
