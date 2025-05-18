import { FastifyInstance } from 'fastify';
import RegisterUserDto, { RegisterUserSchema } from '../dtos/registerUserDto';
import { AuthService } from '../services/authService';
import LoginUserDto, { LoginUserSchema } from '../dtos/loginUserDto';
import {
  LoginSchema,
  LogoutSchema,
  RegisterSchema
} from '../schemas/authSchemas';

export async function authController(app: FastifyInstance) {
  const service = new AuthService(app);

  app.post('/register', { schema: RegisterSchema }, async (request, reply) => {
    try {
      const dto = app.validate<RegisterUserDto>(
        RegisterUserSchema,
        request.body
      );
      const user = await service.register(dto);

      reply.status(200).send({ message: 'Succesfuly registed', user });
    } catch (error) {
      throw error;
    }
  });

  app.post('/login', { schema: LoginSchema }, async (request, reply) => {
    try {
      const dto = app.validate<LoginUserDto>(LoginUserSchema, request.body);
      const token = await service.login(dto);

      reply.setCookie('token', token, {
        path: '/',
        secure: false,
        httpOnly: true,
        sameSite: true,
        maxAge: 60 * 60 * 24
      });

      reply.status(200).send({
        message: 'Succesfuly Login',
        token
      });
    } catch (error) {
      throw error;
    }
  });

  app.post('/logout', { schema: LogoutSchema }, async (_request, reply) => {
    try {
      reply.clearCookie('token', { path: '/' });
      reply.status(200).send({ message: 'Logout successful' });
    } catch (error) {
      throw error;
    }
  });
}
