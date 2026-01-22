import express from 'express';
import userRouter from './Infraestructure/Http/Routes/UserRoutes';
import authRouter from './Infraestructure/Http/Routes/AuthRoutes';


const app = express();
app.use(express.json());
app.use("/users", userRouter);
app.use("/users", authRouter)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server listening http://localhost:${PORT}`)
});