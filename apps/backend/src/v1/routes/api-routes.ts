import express, { Express } from 'express';

const router = express.Router();

const getApiRoutes = () => {
  router.use('/health', (req, res) => {
    res.status(200).json({ message: 'V1:Healthy' });
  });
  return router;
};

export const setupApiRoutes = (app: Express): void => {
  app.use('/api/v1', getApiRoutes());
};
