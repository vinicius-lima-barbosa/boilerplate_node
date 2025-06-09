import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

const prisma = new PrismaClient();

export const registerPrisma = fp(async (app: FastifyInstance) => {
  await app.register(async () => {
    await prisma.$connect();
    app.decorate('prisma', prisma);
    app.addHook('onClose', async () => {
      await app.prisma.$disconnect();
    });
  });
});
