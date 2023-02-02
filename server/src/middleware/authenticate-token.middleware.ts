import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../database';
import Boom from '@hapi/boom';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies['auth'] || req.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw Boom.unauthorized('authintication token is missing');
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string) as JwtPayload;
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: decodedToken.id },
      select: {
        id: true,
        email: true,
        password: true,
        username: true,
        profilePicture: true,
        createdAt: true,
        updatedAt: true,
        followers: true,
        following: true,
      },
    });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send('Unauthorized. Invalid Credentials');
  }
};
