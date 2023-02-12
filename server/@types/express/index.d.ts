import { User } from '@prisma/client';
import { UserWithInfo } from '../../src/common/interfaces/user-with-data.interface';

declare global {
  namespace Express {
    interface Request {
      user: UserWithInfo;
      file?: Express.Multer.File;
    }
  }
}
