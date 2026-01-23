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

            const { contrasena: _contrasena, ...userSafe } = user;
            return res.status(200).json(userSafe);
        } catch (error) {
            if (error instanceof Error) {
                switch (error.message) {
                    case "USER_NOT_FOUND":
                        return res.status(404).json({ statusCode: 404, message: "Usuario no encontrado" });
    
                    case "INVALID_CREDENTIALS":
                        return res.status(401).json({ statusCode: 401, message: "Credenciales incorrectas" });
    
                    default:
                        return res.status(500).json({ statusCode: 500, message: "Error interno del servidor" });
                }
            }
        }
    }

    async register(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
            const user = await this.registerUser.execute({nombre: name, correo: email, contrasena: password});

            const { contrasena: _contrasena, ...safeUser } = user;

            return res.status(201).json(safeUser);
        } catch (error) {
            if (error instanceof Error) {
                switch (error.message) {
                    case "EMAIL_ALREADY_EXISTS":
                        return res.status(409).json({ statusCode: 409, message: "El correo ya está registrado" });
    
                    default:
                        return res.status(500).json({ statusCode: 500, message: "Error interno del servidor" });
                }
            }
        }
    }
}
