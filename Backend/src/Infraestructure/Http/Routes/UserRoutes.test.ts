import request from 'supertest';
import express from 'express';
import userRouter from './UserRoutes';

// mock del controller
jest.mock('../../Dependencies/dependencies', () => ({
  userController: {
    getAll: jest.fn((req, res) =>
      res.status(200).json([
        { id: 1, name: 'Juan' },
        { id: 2, name: 'Ana' }
      ])
    )
  }
}));

describe('UserRoutes', () => {
  const app = express();

  beforeAll(() => {
    app.use(express.json());
    app.use('/users', userRouter);
  });

  it('GET /users devuelve la lista de usuarios', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].name).toBe('Juan');
  });
});
