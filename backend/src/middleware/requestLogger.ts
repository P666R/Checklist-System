import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('Incoming request', {
    method: req.method,
    path: req.path,
    params: req.params,
    query: req.query,
    body: req.body,
  });
  next();
};
