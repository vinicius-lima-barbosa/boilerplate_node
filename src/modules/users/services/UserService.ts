import { FastifyInstance } from 'fastify';
import EditUserDto from '../dtos/editUserDto';
import { HttpError } from '../../../shared/errors/HttpError';

export class UserService {
  constructor(private app: FastifyInstance) {}

  async listById(userId: string) {
    return this.app.prisma.user.findUnique({ where: { id: userId } });
  }

  async list() {
    return this.app.prisma.user.findMany();
  }

  async editUser(userId: string, payload: EditUserDto) {
    const existing = await this.app.prisma.user.findUnique({
      where: { id: userId }
    });
    if (!existing) throw new HttpError(404, 'This user dont exists');

    const user = await this.app.prisma.user.update({
      where: { id: userId },
      data: payload
    });

    return user;
  }

  async deleteUser(userId: string) {
    await this.app.prisma.user.delete({ where: { id: userId } });
  }
}
