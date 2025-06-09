import { FastifyInstance } from 'fastify';
import { registerEnv } from './env';
import { swaggerConfig } from './swagger';
import { registerPrisma } from './prismaClient';

export class ConfigLoader {
  public app: FastifyInstance;

  constructor(app: FastifyInstance) {
    this.app = app;
  }

  async load() {
    await registerEnv(this.app);
    await swaggerConfig(this.app);
    await registerPrisma(this.app, {});
  }
}
