import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../database';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies['auth'] || req.headers['authorization']?.split(' ')[1];
    console.log(token);
    if (!token) {
      throw new Error();
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string) as JwtPayload;
    const user = await prisma.user.findUniqueOrThrow({ where: { id: decodedToken.id } });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send('Unauthorized. Invalid Credentials');
  }
};
