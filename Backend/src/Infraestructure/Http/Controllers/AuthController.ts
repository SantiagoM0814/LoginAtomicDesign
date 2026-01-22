import { Request, Response } from "express";
import { RegisterUserUseCase } from "../../../Application/UseCases/RegisterUserUseCase";
import { LoginUserUseCase } from "../../../Application/UseCases/LoginUserUseCase";

export class AuthController {

    constructor (

        private registerUserUseCase: RegisterUserUseCase,
        private loginUserUseCase: LoginUserUseCase
    ) {}

    register = async (req: Request, res: Response) = {

        const result = await this.registerUserUseCase.execute(req.body);
        res.json(result);
    }
}