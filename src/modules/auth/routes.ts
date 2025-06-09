import { FastifyInstance } from 'fastify';
import { AuthController } from './controllers/authController';
import { RegisterUserSchema } from './dtos/registerUserDto';
import { LoginSchema, LogoutSchema } from './schemas/authSchemas';

export class AuthRoutes {
  private controller: AuthController;

  constructor(private app: FastifyInstance) {
    this.controller = new AuthController(this.app);
  }

  public register() {
    this.app.post(
      '/auth/register',
      { schema: RegisterUserSchema },
      this.controller.register
    );
    this.app.get('/auth/verify-email', this.controller.verifyEmail);
    this.app.post(
      '/auth/login',
      { schema: LoginSchema },
      this.controller.login
    );
    this.app.get(
      '/auth/logout',
      { schema: LogoutSchema },
      this.controller.logout
    );
  }
}
