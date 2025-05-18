import { HttpError } from '../errors/httpError';
import { FastifyReply, FastifyRequest } from 'fastify';

export const authMiddleware = async (
  request: FastifyRequest,
  _reply: FastifyReply
) => {
  const token = request.cookies.token;
  if (!token) throw new HttpError(401, 'Authentication token missing');

  const payload = await request.jwtVerify<{ id: string }>();
  request.user = { id: payload.id };
};
