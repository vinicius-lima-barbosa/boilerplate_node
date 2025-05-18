import { FastifyInstance } from 'fastify';
import { userController } from './controllers/userController';

export async function userRoutes(app: FastifyInstance) {
  await userController(app);
}
