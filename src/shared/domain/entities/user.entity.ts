import { Entity } from './entity';
import { IUser } from './interfaces/user.interface';

export abstract class UserEntity<T extends IUser> extends Entity<IUser> {
  protected props: T;
  constructor(props: T, id?: string) {
    super(props, id);
    this.props = props;
  }
}
