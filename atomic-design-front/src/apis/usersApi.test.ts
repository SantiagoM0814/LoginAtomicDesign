import { describe, expect, it } from 'vitest';
import * as usersApi from './usersApi';

describe('usersApi', () => {
  it('debe importar sin errores', () => {
    expect(usersApi).toBeDefined();
  });
});