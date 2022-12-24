import { NextFunction, Request, Response } from 'express';
import { FileService, IFileService } from '../services/file.service';
import { UserService, IUserService } from '../services/user.service';
export interface IUserController {
  uploadPicture(req: Request, res: Response, next: NextFunction): Promise<void>;
  fetchUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class UserController implements IUserController {
  constructor(private fileService: IFileService = new FileService(), private userService: IUserService = new UserService()) {}
  public uploadPicture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const picUrl = await this.fileService.uploadFile(req.file as Express.Multer.File);
      const user = await this.userService.updateUser(req.user, { profilePicture: picUrl });
      res.status(200).json({ username: user.username, email: user.email, profilePicture: user.profilePicture });
    } catch (err) {
      next(err);
    }
  };

  public fetchUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = parseInt(req.params.userId);
    try {
      const user = await this.userService.getUser(userId);
      if (user) {
        res.status(200).json({ username: user.username, email: user.email, profilePicture: user.profilePicture });
      }
      res.status(200).send('user data not avialble');
    } catch (err) {
      next(err);
    }
  };
}
