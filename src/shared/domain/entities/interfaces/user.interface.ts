import { IPerson } from './person.interface';

export interface IUser extends IPerson {
  email: string;
  password?: string;
  isActive?: boolean;
}
