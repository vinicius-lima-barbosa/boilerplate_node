import { HttpError } from '../errors/httpError';
import { FastifyInstance } from 'fastify';
import { ZodSchema } from 'zod';

export class Validator {
  private app: FastifyInstance;

  constructor(app: FastifyInstance) {
    this.app = app;
  }

  public register() {
    this.app.decorate('validate', <T>(schema: ZodSchema, data: unknown): T => {
      const parsed = schema.safeParse(data);
      if (!parsed.success) {
        const issues = parsed.error.issues.map((i) => i.message).join(', ');
        throw new HttpError(400, `Validation error: ${issues}`);
      }
      return parsed.data as T;
    });
  }
}
