import { FastifyInstance } from 'fastify';
import { AuthController } from './controllers/authController';

export class AuthRoutes {
  private controller: AuthController;

  constructor(private app: FastifyInstance) {
    this.controller = new AuthController(this.app);
  }

  public register() {
    this.app.post('/auth/register', this.controller.register);
    this.app.get('/auth/verify-email', this.controller.verifyEmail);
    this.app.post('/auth/login', this.controller.login);
    this.app.get('/auth/logout', this.controller.logout);
  }
}
