import { Request, Response } from "express";
import { GetUsers } from "../../../Application/UseCases/GetUser";

export class UserController {
    constructor(
        private readonly getUsers: GetUsers
    ) {}

    async getAll(req: Request, res: Response) {
        try {
            const users = await this.getUsers.execute();

            return res.status(200).json(users);
        } catch {
            return res.status(500).json({
                message: "Error getting users"
            });
        }
    }
}
