export abstract class Entity<Props> {
  public readonly props: Props;
  constructor(props: Props) {
    this.props = props;
  }
}
