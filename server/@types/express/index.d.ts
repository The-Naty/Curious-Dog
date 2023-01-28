import { User } from '@prisma/client';
import { userWithInfo } from '../../src/common/interfaces/user-with-data.interface';

declare global {
  namespace Express {
    interface Request {
      user: userWithInfo;
      file?: Express.Multer.File;
    }
  }
}
