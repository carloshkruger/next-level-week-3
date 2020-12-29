import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import authConfig from '../config/auth';
import User from '../models/User';

interface TokenPayload {
  userId: number;
}

const authenticate = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new Error();
    }

    const [, token] = authHeader.split(' ');
    const decoded = verify(token, authConfig.privateKey);

    const { userId } = decoded as TokenPayload;

    const user = await getRepository(User).findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error();
    }

    request.user = {
      id: userId,
    };

    return next();
  } catch {
    return next();
  }
};

export { authenticate };
