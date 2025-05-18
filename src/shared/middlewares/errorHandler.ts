import { FastifyError, FastifyInstance } from 'fastify';
import { HttpError } from '../errors/httpError';

export const errorHandler = (app: FastifyInstance) => {
  app.setErrorHandler((error: FastifyError, _request, reply) => {
    if (error instanceof HttpError) {
      reply.status(error.status).send({ message: error.message });
    } else {
      app.log.error(error);
      reply.status(500).send({ message: 'Internal Server Error' });
    }
  });
};
