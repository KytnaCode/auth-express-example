import express, {Request, Response} from 'express';
import usersRouter from './users/user.routes.js';
import logger from './util/logger.js';
import authRoutes from './auth/auth.routes.js';
import requireAuthMiddleware from './auth/requireAuthMiddleware.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import yaml from 'yaml';

const file = fs.readFileSync('./dist/swagger.yaml', 'utf8');

const specs = yaml.parse(file);

function createApp() {
  const app = express();

  app.set('port', process.env.PORT || 3000);

  app.use(express.json());

  app.use((req, res, next) => {
    logger.http(`${req.method} ${req.url}`);

    next();
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));

  app.all('/api', (req: Request, res: Response) => res.send('Hello World!'));
  app.use('/api/auth', authRoutes);
  app.use('/api/users', requireAuthMiddleware, usersRouter);


  return app;
}

export default createApp;