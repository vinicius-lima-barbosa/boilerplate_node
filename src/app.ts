import Fastify from 'fastify';
import sensible from 'fastify-sensible';
import jwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import { configLoader } from './config';
import { registerPrisma } from './infra/prismaClient';
import { errorHandler } from './shared/middlewares/errorHandler';
import { validator } from './shared/middlewares/validator';
import { userRoutes } from './modules/users/routes';
import { authRoutes } from './modules/auth/routes';

export async function buildApp() {
  const app = Fastify({ logger: true });

  // plugins
  await configLoader(app);
  app.register(sensible);
  app.register(registerPrisma);
  app.register(fastifyCookie);
  app.register(jwt, {
    secret: app.config.JWT_SECRET,
    cookie: {
      cookieName: 'token',
      signed: false
    }
  });

  // middlewares
  validator(app);
  errorHandler(app);

  // routes
  app.register(userRoutes);
  app.register(authRoutes, { prefix: '/auth' });

  return app;
}
