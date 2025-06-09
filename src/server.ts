import { App } from './app';

async function start() {
  const app = new App();
  await app.initialize();
  const port = app.app.config.PORT;
  try {
    await app.app.listen({ port, host: '0.0.0.0' });
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://localhost:${port}`);
  } catch (err) {
    app.app.log.error(err);
    process.exit(1);
  }
}

start();
