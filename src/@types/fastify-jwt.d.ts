import '@fastify/jwt';

declare module '@fastify/jwt' {
  interface jwt {
    payload: { id: string };
    user: { id: string };
  }
}
