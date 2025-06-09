import { EnvSchema } from '@config/env/env';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    config: EnvSchema;
    prisma: PrismaClient;
    validate: <T>(schema: z.ZodSchema, data: unknown) => T;
  }

  interface FastifyRequest {
    user: { id: string };
  }
}
