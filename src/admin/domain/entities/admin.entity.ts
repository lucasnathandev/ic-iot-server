import { Entity } from 'src/shared/domain/entities/entity';
import { AdminProps } from '../interfaces/admin-props';
import { AdminMethods } from '../interfaces/admin-methods';

export class AdminEntity extends Entity<AdminProps> implements AdminMethods {
  public passwordChanged: boolean;
  constructor(props: AdminProps) {
    super(props);
    this.passwordChanged = false;
    this.props.isActive = true;
  }

  get isActive() {
    return this.props.isActive;
  }

  public changePassword(password: string): void {
    this.props.password = password;
    this.passwordChanged = true;
  }
  public unactivateAdmin(): void {
    this.props.isActive = false;
  }
}
