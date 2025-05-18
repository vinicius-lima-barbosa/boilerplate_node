import { FastifyInstance } from 'fastify';
import fastifyEnv from '@fastify/env';

export interface EnvSchema {
  NODE_ENV: string;
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
}

const envOptions = {
  confKey: 'config',
  schema: {
    type: 'object',
    required: ['NODE_ENV', 'PORT', 'DATABASE_URL', 'JWT_SECRET'],
    properties: {
      NODE_ENV: { type: 'string' },
      PORT: { type: 'number' },
      DATABASE_URL: { type: 'string' },
      JWT_SECRET: { type: 'string' }
    }
  },
  dotenv: true
};

export const registerEnv = async (app: FastifyInstance) => {
  await app.register(fastifyEnv, envOptions);
};
