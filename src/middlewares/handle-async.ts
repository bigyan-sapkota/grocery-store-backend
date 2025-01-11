import { type RequestHandler, Request, Response, NextFunction } from 'express';

type AsyncRequestHandler<P = unknown, ResBody = unknown, ReqBody = unknown, ReqQuery = unknown> = (
  req: Request<P, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>,
  next: NextFunction
) => Promise<Response<ResBody> | void>;

type HandleAsync = <P = unknown, ResBody = unknown, ReqBody = unknown, ReqQuery = unknown>(
  requestHandler: AsyncRequestHandler<P, ResBody, ReqBody, ReqQuery>
) => RequestHandler<P, ResBody, ReqBody, ReqQuery>;

export const handleAsync: HandleAsync = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      next(err);
    });
  };
};
