export class RegisterUserUseCase {

    constructor (

        private userRepository: IUserRepository,
        private authService: AuthService
    ) {}

    
}