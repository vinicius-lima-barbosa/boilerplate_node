import { FastifyError, FastifyInstance } from 'fastify';
import { HttpError } from './httpError';

export class ErrorHandler {
  private app: FastifyInstance;

  constructor(app: FastifyInstance) {
    this.app = app;
  }

  public register() {
    this.app.setErrorHandler((error: FastifyError, _request, reply) => {
      if (error instanceof HttpError) {
        reply.status(error.status).send({ message: error.message });
      } else {
        this.app.log.error(error);
        reply.status(500).send({ message: 'Internal Server Error' });
      }
    });
  }
}
