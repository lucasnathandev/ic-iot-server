import { IUser } from 'src/shared/domain/entities/interfaces/user.interface';

export class CreateAdminDto implements IUser {
  email: string;
  password: string;
  isActive?: boolean;
  name: string;
  cpf: string;
  age: number;
}
