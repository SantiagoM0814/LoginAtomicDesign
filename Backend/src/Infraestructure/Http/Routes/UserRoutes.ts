import express from 'express';
import { userController } from '../../Dependencies/dependencies';

const userRouter = express.Router();

userRouter.get("/", userController.getAll.bind(userController));

export default userRouter;