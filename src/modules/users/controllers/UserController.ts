import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from '../services/UserService';
import EditUserDto, { EditUserSchema } from '../dtos/editUserDto';

export class UserController {
  private service: UserService;

  constructor(private readonly app: FastifyInstance) {
    this.service = new UserService(this.app);
  }

  public getUsers = async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      const users = await this.service.list();
      reply.status(200).send(users);
    } catch (error) {
      throw error;
    }
  };

  public getUserById = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string };
      const user = await this.service.listById(id);
      reply.status(200).send(user);
    } catch (error) {
      throw error;
    }
  };

  public editUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string };
      const dto = this.app.validate<EditUserDto>(EditUserSchema, request.body);
      const user = await this.service.editUser(id, dto);
      reply.status(200).send(user);
    } catch (error) {
      throw error;
    }
  };

  public deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string };
      await this.service.deleteUser(id);
      reply.status(200).send({ message: 'User deleted' });
    } catch (error) {
      throw error;
    }
  };
}
