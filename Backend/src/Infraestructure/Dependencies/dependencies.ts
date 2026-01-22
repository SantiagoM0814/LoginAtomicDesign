import { GetUsers } from "../../Application/UseCases/GetUser";
import { LoginUser } from "../../Application/UseCases/LoginUser";
import { RegisterUser } from "../../Application/UseCases/RegisterUser";
import { AuthController } from "../Http/Controllers/AuthController";
import { UserController } from "../Http/Controllers/UserController";
import { InMemoryUserRepository } from "../Persistence/inMemoryUserRepository";


const userRepository = new InMemoryUserRepository();
const getUsers = new GetUsers(userRepository);
export const userController = new UserController(getUsers)


const loginUser = new LoginUser(userRepository);
const registerUser = new RegisterUser(userRepository)
export const authController = new AuthController(loginUser, registerUser);