import { FastifyInstance } from 'fastify';
import { UserController } from './controllers/userController';

export class UserRoutes {
  private controller: UserController;

  constructor(private app: FastifyInstance) {
    this.controller = new UserController(this.app);
  }

  public register() {
    this.app.get('/users', this.controller.getUsers);
    this.app.get('/users/:id', this.controller.getUserById);
    this.app.put('/users/:id', this.controller.editUser);
    this.app.delete('/users/:id', this.controller.deleteUser);
  }
}
