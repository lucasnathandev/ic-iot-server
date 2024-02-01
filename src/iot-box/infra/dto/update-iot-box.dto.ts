import { ISensorFields } from 'src/iot-box/domain/entities/interfaces/sensor-fields.interface';
import { CreateIotBoxDto } from './create-iot-box.dto';

export class UpdateIotBoxDto implements Partial<CreateIotBoxDto> {
  battery: number;
  name?: string;
  sensors?: ISensorFields;
  customerId?: string;
}
