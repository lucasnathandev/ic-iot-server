import { IUser as AdminProps } from 'src/shared/domain/entities/interfaces/user.interface';

import { AdminMethods } from '../interfaces/admin-methods';
import { UserEntity } from 'src/shared/domain/entities/user.entity';

export class AdminEntity
  extends UserEntity<AdminProps>
  implements AdminMethods
{
  public passwordChanged: boolean;
  private _role: string;
  constructor(props: AdminProps, id?: string) {
    super(props, id);
    this.passwordChanged = false;
    this._role = 'Admin';
    this.props.isActive = true;
  }

  get name() {
    return this.props.name;
  }

  get age() {
    return this.props.age;
  }

  get role() {
    return this._role;
  }

  get cpf() {
    return this.props.cpf;
  }

  get isActive() {
    return this.props.isActive;
  }

  get email() {
    return this.props.email;
  }

  public changePassword(password: string): void {
    this.props.password = password;
    this.passwordChanged = true;
    this.updatedAt = new Date();
  }

  public unactivateAdmin(): void {
    this.props.isActive = false;
    this.updatedAt = new Date();
  }

  getAdminData() {
    return {
      id: this.id,
      ...this.props,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
