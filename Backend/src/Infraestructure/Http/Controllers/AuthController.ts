export class AuthController {

    constructor (

        private registerUserUseCase: RegisterUserUseCase,
        private loginUserUseCase: LoginUserUseCase
    ) {}
}