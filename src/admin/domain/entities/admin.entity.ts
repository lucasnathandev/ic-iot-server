import { IUser as AdminProps } from 'src/shared/domain/entities/interfaces/user.interface';
import { Entity } from 'src/shared/domain/entities/entity';

import { AdminMethods } from '../interfaces/admin-methods';

export class AdminEntity extends Entity<AdminProps> implements AdminMethods {
  public passwordChanged: boolean;
  private _role: string;
  constructor(props: AdminProps, id?: string) {
    super(props, id);
    this.passwordChanged = false;
    this._role = 'Admin';
    this.props.isActive = true;
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

  get password() {
    return this.props.password;
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
}
