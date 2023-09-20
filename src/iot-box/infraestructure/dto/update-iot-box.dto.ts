import { PartialType } from '@nestjs/mapped-types';
import { CreateIotBoxDto } from './create-iot-box.dto';

export class UpdateIotBoxDto extends PartialType(CreateIotBoxDto) {
  id: number;
}
