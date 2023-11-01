import { ISensorFields } from 'src/iot-box/domain/entities/interfaces/sensor-fields.interface';
import { CreateIotBoxDto } from './create-iot-box.dto';

export class UpdateIotBoxDto implements Partial<CreateIotBoxDto> {
  name?: string;
  sensors?: ISensorFields;
  battery: number;
  customerId?: string;
}
