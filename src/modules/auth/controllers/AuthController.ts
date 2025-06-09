import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import RegisterUserDto, { RegisterUserSchema } from '../dtos/registerUserDto';
import { AuthService } from '../services/AuthService';
import LoginUserDto, { LoginUserSchema } from '../dtos/loginUserDto';

export class AuthController {
  private service: AuthService;

  constructor(private readonly app: FastifyInstance) {
    this.service = new AuthService(this.app);
  }

  public register = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const dto = this.app.validate<RegisterUserDto>(
        RegisterUserSchema,
        request.body
      );
      const user = await this.service.register(dto);

      reply.status(200).send({ message: 'Succesfuly registed', user });
    } catch (error) {
      throw error;
    }
  };

  public verifyEmail = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { token } = request.query as { token: string };
      if (!token) {
        reply.status(400).send({ message: 'Token is required' });
      }

      const user = await this.service.verifyEmail(token);

      reply.status(200).send({
        message: 'Email verified successfully',
        user
      });
    } catch (error) {
      throw error;
    }
  };

  public login = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const dto = this.app.validate<LoginUserDto>(
        LoginUserSchema,
        request.body
      );
      const token = await this.service.login(dto);

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
  };

  public logout = async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      reply.clearCookie('token', { path: '/' });
      reply.status(200).send({ message: 'Logout successful' });
    } catch (error) {
      throw error;
    }
  };
}
