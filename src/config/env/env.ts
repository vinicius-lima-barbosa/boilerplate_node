import { FastifyInstance } from 'fastify';
import fastifyEnv from '@fastify/env';

export interface EnvSchema {
  NODE_ENV: string;
  PORT: number;
  APP_URL: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  SMTP_USER: string;
  SMTP_PASSWORD: string;
}

const envOptions = {
  confKey: 'config',
  schema: {
    type: 'object',
    required: [
      'NODE_ENV',
      'PORT',
      'APP_URL',
      'DATABASE_URL',
      'JWT_SECRET',
      'SMTP_USER',
      'SMTP_PASSWORD'
    ],
    properties: {
      NODE_ENV: { type: 'string' },
      PORT: { type: 'number' },
      APP_URL: { type: 'string' },
      DATABASE_URL: { type: 'string' },
      JWT_SECRET: { type: 'string' },
      SMTP_USER: { type: 'string' },
      SMTP_PASSWORD: { type: 'string' }
    }
  },
  dotenv: true
};

export const registerEnv = async (app: FastifyInstance) => {
  await app.register(fastifyEnv, envOptions);
};
