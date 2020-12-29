import { Request, Response, NextFunction } from 'express';

const authorize = () => {
  return async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!request.user) {
        throw new Error();
      }

      return next();
    } catch {
      throw new Error('Sem permissão de acesso.');
    }
  };
};

export { authorize };
