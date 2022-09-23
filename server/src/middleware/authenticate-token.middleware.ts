import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { prisma } from '../database';
import { RequestWithUserPayload } from '../common/interfaces/requestWithUserPayload.interface';

export const auth = async (req: RequestWithUserPayload, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies['auth'];
    if (!token) {
      throw new Error();
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string) as JwtPayload;
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: parseInt(decodedToken.id) },
    });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send('Unauthorized. Invalid Credentials');
  }
};
