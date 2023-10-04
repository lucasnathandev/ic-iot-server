export abstract class Entity<Props> {
  public readonly props: Props;
  public readonly id: string;
  constructor(props: Props, id?: string) {
    this.id =
      id ||
      Array.from({ length: 32 })
        .map(() => String.fromCharCode(Math.floor(Math.random() * 36 + 65)))
        .join();
    this.props = { id: this.id, ...props };
  }
}
