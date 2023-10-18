export interface Repository<T> {
  get(id: string): Promise<T>;
  save(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
}
