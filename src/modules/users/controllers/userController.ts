import { FastifyInstance } from 'fastify';
import { UserService } from '../services/userService';
import EditUserDto, { EditUserSchema } from '../dtos/editUserDto';
import { authMiddleware } from '../../../shared/middlewares/authMiddleware';
import {
  DeleteUserSchema,
  EditUserByIdSchema,
  ListUserByIdSchema,
  UsersListSchema
} from '../schemas/userSchemas';

export async function userController(app: FastifyInstance) {
  const service = new UserService(app);

  app.get(
    '/users',
    {
      preHandler: [authMiddleware],
      schema: UsersListSchema
    },
    async (_request, reply) => {
      try {
        const users = await service.list();
        reply.send(users);
      } catch (error) {
        throw error;
      }
    }
  );

  app.get(
    '/users/:id',
    {
      preHandler: [authMiddleware],
      schema: ListUserByIdSchema
    },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        const user = await service.listById(id);
        reply.status(200).send(user);
      } catch (error) {
        throw error;
      }
    }
  );

  app.put(
    '/users/:id',
    {
      preHandler: [authMiddleware],
      schema: EditUserByIdSchema
    },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        const dto = app.validate<EditUserDto>(EditUserSchema, request.body);
        const user = await service.editUser(id, dto);
        reply.status(200).send(user);
      } catch (error) {
        throw error;
      }
    }
  );

  app.delete(
    '/users/:id',
    {
      preHandler: [authMiddleware],
      schema: DeleteUserSchema
    },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        await service.deleteUser(id);
        reply.status(200).send({ message: 'User deleted' });
      } catch (error) {
        throw error;
      }
    }
  );
}
