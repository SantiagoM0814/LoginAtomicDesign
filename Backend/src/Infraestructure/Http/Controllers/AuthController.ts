import { Request, Response } from "express";
import { LoginUser } from "../../../Application/UseCases/LoginUser";
import { RegisterUser } from "../../../Application/UseCases/RegisterUser";

export class AuthController {
    constructor(
        private readonly loginUser: LoginUser, 
        private readonly registerUser: RegisterUser
    ) {}

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await this.loginUser.execute(email, password);

            const { contrasena, ...userSafe } = user;
            return res.status(200).json(userSafe);
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: "Internal Server Error"
            });
        }
    }

    async register(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
            const user = await this.registerUser.execute({nombre: name, correo: email, contrasena: password});

            const { contrasena, ...safeUser } = user;

            return res.status(201).json(safeUser);
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: (error instanceof Error) ? error.message : 'Error desconocido'
            });
        }
    }
}
