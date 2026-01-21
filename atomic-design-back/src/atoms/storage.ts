/**
 * Simula un localStorage del servidor usando un Map en memoria
 * En producción, usar una base de datos real
 */
class StorageService {
  private storage: Map<string, string> = new Map();

  set(key: string, value: unknown): void {
    this.storage.set(key, JSON.stringify(value));
  }

  get<T>(key: string): T | null {
    const value = this.storage.get(key);
    if (!value) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }

  remove(key: string): void {
    this.storage.delete(key);
  }

  clear(): void {
    this.storage.clear();
  }

  keys(): string[] {
    return Array.from(this.storage.keys());
  }
}

export const storage = new StorageService();
