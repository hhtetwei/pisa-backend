
import { Request, Response, NextFunction } from 'express';

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err); 

  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err.name === 'QueryFailedError') {
    statusCode = 400;
    message = err.message || 'Database query failed';
  } else if (err.name === 'EntityNotFound') {
    statusCode = 404;
    message = 'Entity not found';
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized';
  } else if (err instanceof SyntaxError && err.message.includes('JSON')) {
    statusCode = 400;
    message = 'Invalid JSON payload';
  } else if (err.message) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });
}
