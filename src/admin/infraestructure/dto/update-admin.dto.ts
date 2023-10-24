import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto implements Partial<CreateAdminDto> {
  password?: string;
  isActive?: boolean;
}
