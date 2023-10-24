export interface Repository<T> {
  getAll(): Promise<T[]>;
  get(id: string): Promise<T>;
  save(entity: T): Promise<void>;
  update(id: string, data: Partial<T>): Promise<void>;
  delete(id: string): Promise<void>;
}
