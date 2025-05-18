import { FastifyInstance } from 'fastify';
import { authController } from './controllers/authController';

export async function authRoutes(app: FastifyInstance) {
  await authController(app);
}
