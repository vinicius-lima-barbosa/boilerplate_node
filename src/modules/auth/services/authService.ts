import { FastifyInstance } from 'fastify';
import RegisterUserDto from '../dtos/registerUserDto';
import { HttpError } from '../../../shared/errors/httpError';
import bcrypt from 'bcrypt';
import LoginDto from '../dtos/loginUserDto';

export class AuthService {
  constructor(private app: FastifyInstance) {}

  async register(payload: RegisterUserDto) {
    const existing = await this.app.prisma.user.findUnique({
      where: { email: payload.email }
    });
    if (existing) throw new HttpError(409, 'Email already in use');

    const hashed = await bcrypt.hash(payload.password, 10);
    const user = await this.app.prisma.user.create({
      data: { ...payload, password: hashed }
    });

    return user;
  }

  async login(payload: LoginDto) {
    const user = await this.app.prisma.user.findUnique({
      where: { email: payload.email }
    });
    if (!user) throw new HttpError(401, 'Invalid credentials');

    const isValid = await bcrypt.compare(payload.password, user.password);
    if (!isValid) throw new HttpError(401, 'Invalid credentials');

    const token = this.app.jwt.sign({ id: user.id }, { expiresIn: '1d' });

    return token;
  }
}
