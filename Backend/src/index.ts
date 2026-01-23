import express from 'express';
import cors from 'cors';
import userRouter from './Infraestructure/Http/Routes/UserRoutes';
import authRouter from './Infraestructure/Http/Routes/AuthRoutes';


const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/users", authRouter)

const PORT = 3000;

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening http://localhost:${PORT}`)
});