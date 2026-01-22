import express from 'express';
import { authController } from '../../Dependencies/dependencies';

const authRouter = express.Router();

authRouter.post("/login", authController.login.bind(authController));
authRouter.post("/register", authController.register.bind(authController));

export default authRouter;