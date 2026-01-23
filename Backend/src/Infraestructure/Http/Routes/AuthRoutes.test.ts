import request from 'supertest';
import express from 'express';
import authRouter from './AuthRoutes';

// Mock del controller
jest.mock('../../Dependencies/dependencies', () => ({
  authController: {
    login: jest.fn((req, res) =>
      res.status(200).json({ message: 'Login OK' })
    ),
    register: jest.fn((req, res) =>
      res.status(201).json({ message: 'Register OK' })
    )
  }
}));

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

describe('Auth Routes', () => {
  it('POST /auth/login', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@test.com', password: '1234' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Login OK' });
  });

  it('POST /auth/register', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        name: 'Juan',
        email: 'juan@test.com',
        password: '1234'
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Register OK' });
  });
});
