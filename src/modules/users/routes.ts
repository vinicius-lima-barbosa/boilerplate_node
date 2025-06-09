import { FastifyInstance } from 'fastify';
import { UserController } from './controllers/userController';
import { AuthMiddleware } from '@shared/middlewares/authMiddleware';
import {
  DeleteUserSchema,
  EditUserByIdSchema,
  ListUserByIdSchema,
  UsersListSchema
} from './schemas/userSchemas';

export class UserRoutes {
  private controller: UserController;
  private middleware: AuthMiddleware;

  constructor(private app: FastifyInstance) {
    this.controller = new UserController(this.app);
    this.middleware = new AuthMiddleware(this.app);
  }

  public register() {
    this.app.get(
      '/users',
      { preHandler: this.middleware.handle, schema: UsersListSchema },
      this.controller.getUsers
    );
    this.app.get(
      '/users/:id',
      { preHandler: this.middleware.handle, schema: ListUserByIdSchema },
      this.controller.getUserById
    );
    this.app.put(
      '/users/:id',
      { preHandler: this.middleware.handle, schema: EditUserByIdSchema },
      this.controller.editUser
    );
    this.app.delete(
      '/users/:id',
      { preHandler: this.middleware.handle, schema: DeleteUserSchema },
      this.controller.deleteUser
    );
  }
}
