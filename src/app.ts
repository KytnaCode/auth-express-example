import express from 'express';

function createApp() {
  const app = express();

  app.set('port', process.env.PORT || 3000);

  return app;
}

export default createApp;