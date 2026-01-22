/**
 * Almacenamiento en memoria simple
 * En producción, esto sería reemplazado por una base de datos real
 */
class StorageAdapter {
  private data: Map<string, unknown> = new Map();

  set<T>(key: string, value: T): void {
    this.data.set(key, value);
  }

  get<T>(key: string): T | undefined {
    return this.data.get(key) as T | undefined;
  }

  remove(key: string): void {
    this.data.delete(key);
  }

  clear(): void {
    this.data.clear();
  }

  has(key: string): boolean {
    return this.data.has(key);
  }
}

export const storage = new StorageAdapter();
