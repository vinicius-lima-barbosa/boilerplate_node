import { FastifyInstance } from 'fastify';
import RegisterUserDto from '../dtos/registerUserDto';
import { HttpError } from '../../../shared/errors/httpError';
import bcrypt from 'bcrypt';
import LoginDto from '../dtos/loginUserDto';
import { sendEmailVerification } from '../../../shared/middlewares/authMiddleware';

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

    const token = this.app.jwt.sign({ id: user.id }, { expiresIn: '1d' });

    const verificationLink = `${this.app.config.APP_URL}/verify-email?token=${token}`;
    await sendEmailVerification(this.app, user.email, verificationLink);

    return user;
  }

  async verifyEmail(token: string) {
    const decoded = this.app.jwt.verify<{ id: string }>(token);
    if (!decoded?.id) {
      throw new Error('Invalid token');
    }

    const user = await this.app.prisma.user.update({
      where: { id: decoded.id },
      data: { emailVerified: true }
    });

    return {
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerified
    };
  }

  async login(payload: LoginDto) {
    const user = await this.app.prisma.user.findUnique({
      where: { email: payload.email }
    });
    if (!user || !user.emailVerified)
      throw new HttpError(401, 'Invalid credentials');

    const isValid = await bcrypt.compare(payload.password, user.password);
    if (!isValid) throw new HttpError(401, 'Invalid credentials');

    const token = this.app.jwt.sign({ id: user.id }, { expiresIn: '1d' });

    return token;
  }
}
