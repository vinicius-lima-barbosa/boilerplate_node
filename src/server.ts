import { buildApp } from './app';

async function start() {
  const app = await buildApp();
  const port = app.config.PORT;
  try {
    await app.listen({ port, host: '0.0.0.0' });
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://localhost:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
