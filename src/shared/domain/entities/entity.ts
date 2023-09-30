export abstract class Entity<Props> {
  public readonly props: Props;
  public readonly id: string;
  constructor(props: Props, id?: string) {
    Object.entries(props).forEach((prop) => (this[prop[0]] = prop[1]));
    this.id =
      id ||
      Array.from({ length: 32 })
        .map(() => String.fromCharCode(Math.floor(Math.random() * 36 + 65)))
        .join();
  }
}
