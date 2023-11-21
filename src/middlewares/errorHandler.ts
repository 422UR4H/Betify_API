import { NextFunction, Request, Response } from 'express';
import customErrors from '@/errors/customErrors';
import { CustomError } from '@/protocols/customError.protocols';

export default function errorHandler(err: CustomError, _req: Request, res: Response, _next: NextFunction) {
  if (!!err.status) return res.status(err.status).send(err.message);
  res.status(customErrors.internalServerError().status).send(customErrors.internalServerError().message);
}
