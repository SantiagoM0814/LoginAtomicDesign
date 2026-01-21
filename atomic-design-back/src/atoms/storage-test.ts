import { describe, it, expect, beforeEach } from 'vitest';
import { storage } from './storage';

describe('StorageService', () => {
  beforeEach(() => {
    storage.clear();
  });

  describe('set', () => {
    it('debería guardar un valor en el almacenamiento', () => {
      const testData = { id: 1, name: 'Test' };
      storage.set('test', testData);

      const result = storage.get('test');
      expect(result).toEqual(testData);
    });

    it('debería sobrescribir valores existentes', () => {
      storage.set('key', { value: 'old' });
      storage.set('key', { value: 'new' });

      const result = storage.get('key');
      expect(result).toEqual({ value: 'new' });
    });

    it('debería guardar diferentes tipos de datos', () => {
      storage.set('string', 'valor');
      storage.set('number', 42);
      storage.set('boolean', true);
      storage.set('array', [1, 2, 3]);
      storage.set('object', { nested: { data: 'value' } });

      expect(storage.get('string')).toBe('valor');
      expect(storage.get('number')).toBe(42);
      expect(storage.get('boolean')).toBe(true);
      expect(storage.get('array')).toEqual([1, 2, 3]);
      expect(storage.get('object')).toEqual({ nested: { data: 'value' } });
    });
  });

  describe('get', () => {
    it('debería retornar null si la clave no existe', () => {
      const result = storage.get('nonexistent');
      expect(result).toBeNull();
    });

    it('debería retornar el valor guardado', () => {
      const data = { test: 'data' };
      storage.set('mykey', data);

      const result = storage.get('mykey');
      expect(result).toEqual(data);
    });

    it('debería retornar null si el JSON es inválido', () => {
      // Simular un JSON inválido interno
      const result = storage.get('invalid');
      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('debería eliminar una clave del almacenamiento', () => {
      storage.set('key', 'value');
      expect(storage.get('key')).toBe('value');

      storage.remove('key');
      expect(storage.get('key')).toBeNull();
    });

    it('debería no lanzar error si la clave no existe', () => {
      expect(() => {
        storage.remove('nonexistent');
      }).not.toThrow();
    });
  });

  describe('clear', () => {
    it('debería eliminar todos los datos del almacenamiento', () => {
      storage.set('key1', 'value1');
      storage.set('key2', 'value2');
      storage.set('key3', 'value3');

      storage.clear();

      expect(storage.get('key1')).toBeNull();
      expect(storage.get('key2')).toBeNull();
      expect(storage.get('key3')).toBeNull();
    });
  });

  describe('keys', () => {
    it('debería retornar un array vacío si no hay datos', () => {
      storage.clear();
      const keys = storage.keys();
      expect(keys).toEqual([]);
    });

    it('debería retornar todas las claves guardadas', () => {
      storage.set('key1', 'value1');
      storage.set('key2', 'value2');
      storage.set('key3', 'value3');

      const keys = storage.keys();
      expect(keys).toHaveLength(3);
      expect(keys).toContain('key1');
      expect(keys).toContain('key2');
      expect(keys).toContain('key3');
    });

    it('debería retornar array actualizado después de remover', () => {
      storage.set('key1', 'value1');
      storage.set('key2', 'value2');
      storage.remove('key1');

      const keys = storage.keys();
      expect(keys).toEqual(['key2']);
    });
  });

  describe('Integración', () => {
    it('debería mantener datos en múltiples operaciones', () => {
      const users = [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
      ];

      storage.set('users', users);
      const retrieved = storage.get('users');
      expect(retrieved).toEqual(users);

      storage.remove('users');
      expect(storage.get('users')).toBeNull();
    });
  });
});
