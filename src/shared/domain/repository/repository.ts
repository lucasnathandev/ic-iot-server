export interface Repository<T> {
  get(id: string): Promise<T>;
  save(entity: T): Promise<void>;
  update(id: string, data: T | Partial<T>): Promise<void>;
  delete(id: string): Promise<void>;
}
