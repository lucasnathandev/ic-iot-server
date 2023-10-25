import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto implements Partial<CreateAdminDto> {
  isActive?: boolean;
  password?: string;
}
