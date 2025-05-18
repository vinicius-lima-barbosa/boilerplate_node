import { FastifyInstance } from 'fastify';
import { registerEnv } from './env';
import { swaggerConfig } from './swagger';

export async function configLoader(app: FastifyInstance) {
  await registerEnv(app);
  await swaggerConfig(app);
}
