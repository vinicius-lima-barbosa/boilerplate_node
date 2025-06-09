import Fastify, { FastifyInstance } from 'fastify';
import sensible from 'fastify-sensible';
import jwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import { ConfigLoader } from './config';
import { ErrorHandler } from './shared/middlewares/errorHandler';
import { Validator } from './shared/middlewares/validator';
import { UserRoutes } from './modules/users/routes';
import { AuthRoutes } from './modules/auth/routes';

export class App {
  public app: FastifyInstance;

  constructor() {
    this.app = Fastify({ logger: true });
  }

  public async initialize() {
    // Load Config, Environment variables and Prisma Client
    const configLoader = new ConfigLoader(this.app);
    await configLoader.load();

    //Register Plugins
    this.app.register(sensible);
    this.app.register(fastifyCookie);
    this.app.register(jwt, {
      secret: this.app.config.JWT_SECRET,
      cookie: {
        cookieName: 'token',
        signed: false
      }
    });

    // Register Middlwares
    const validatorMiddleware = new Validator(this.app);
    validatorMiddleware.register();

    // Register Erro Handlers
    const errorHandlerMiddleware = new ErrorHandler(this.app);
    errorHandlerMiddleware.register();

    // Register Routes
    const authRoutes = new AuthRoutes(this.app);
    authRoutes.register();

    const userRoutes = new UserRoutes(this.app);
    userRoutes.register();
  }

  public async close() {
    await this.app.close();
  }
}
