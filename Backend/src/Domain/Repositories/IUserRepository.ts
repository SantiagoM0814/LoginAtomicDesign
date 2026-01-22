export interface IUserRepository {

    save (user: User): Promise<User>;
    
}