import { GetUsers } from '../UseCases/GetUsers';
import { IUserRepository } from '../../Domain/Repositories/IUserRepository';

describe ('GetUsers', () => {

    let getUsersUseCase: GetUsers;
    let mockUserRepository: jest.Mocked<IUserRepository>;

    beforeEach(() => {

        mockUserRepository = {

            findAll: jest.fn(),
            findByEmail: jest.fn(),
            save: jest.fn()
        };
    })
})