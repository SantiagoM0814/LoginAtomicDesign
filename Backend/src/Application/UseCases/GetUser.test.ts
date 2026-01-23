import { GetUsers } from './GetUsers';
import { IUserRepository } from '../../Domain/Repositories/IUserRepository';
import { User } from '../../Domain/Entities/User';

describe('GetUsers', () => {
  let getUsersUseCase: GetUsers;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    // Crear mock del repositorio
    mockUserRepository = {
      findAll: jest.fn(),
      findByEmail: jest.fn(),
      save: jest.fn()
    };
    
    getUsersUseCase = new GetUsers(mockUserRepository);
  });

  it('Deberia retornar un array (Listas) de usuarios cuando existen usuarios', async () => {

    const mockUsers = [

        new User ('1','user1@example.com', 'Password123!', 'User One', new Date('2026-01-23')),
        new User ('2', 'User2@example.com', 'Password456!', 'User Two', new Date('2026-01-23')),
        new User ('3', 'User3@example.com', 'Password789!', 'User Three', new Date('2026-01-23'))
    ];
    mockUserRepository.findAll.mockResolvedValue(mockUsers);

    const result = await getUsersUseCase.execute();

    expect(result).toEqual(mockUsers);
    expect(result).toHaveLength(3);
    expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);
  })
});