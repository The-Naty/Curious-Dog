import { Request, Response, NextFunction } from 'express';
import Boom, { isBoom } from '@hapi/boom';
import { NotFoundError } from '@prisma/client/runtime';
import { EmailVerificationError, InvalidCredentialsError } from '../common/errors';

const mapError = (error: Error & { code?: string; meta?: Record<string, unknown> }) => {
  if (error instanceof NotFoundError) {
    return Boom.notFound(error.message);
  }

  if (error instanceof EmailVerificationError || error instanceof InvalidCredentialsError) {
    return Boom.unauthorized(error.message);
  }

  if (error.code === 'P2002') {
    return Boom.conflict(`${error.meta!.target} already exists`);
  }

  return error;
};

export const errorMiddleware = async (error: Boom.Boom | Error, _req: Request, res: Response, _next: NextFunction) => {
  const mappedError = mapError(error);
  const statusCode = isBoom(mappedError) ? mappedError.output.statusCode : 500;
  const errorMessage: string = mappedError.message ?? 'Something went wrong';

  return res.status(statusCode).send(errorMessage);
};
