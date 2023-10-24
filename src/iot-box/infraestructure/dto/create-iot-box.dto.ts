import { BatteryStatus } from 'src/iot-box/domain/entities/interfaces/enum.battery-status';
import { IotBoxProps } from 'src/iot-box/domain/entities/interfaces/iot-box-props.interface';
import { ISensorFields } from 'src/iot-box/domain/entities/interfaces/sensor-fields.interface';

export class CreateIotBoxDto implements IotBoxProps {
  name: string;
  sensors: ISensorFields;
}
