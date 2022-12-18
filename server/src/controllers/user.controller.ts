import { NextFunction, Request, Response } from 'express';
import FileService from '../services/file.service';
import { UserService } from '../services/user.service';
export interface IUserController {
  uploadPicture(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class UserController implements IUserController {
  constructor(private fileService: FileService = new FileService(), private userService: UserService = new UserService()) {}

  public uploadPicture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const picUrl = await this.fileService.uploadFile(req.file as Express.Multer.File);
      const user = await this.userService.updateUser(req.user, { profilePicture: picUrl });
      res.status(200).json({ username: user.username, email: user.email, profile_picture: user.profilePicture });
    } catch (err) {
      next(err);
    }
  };
}
