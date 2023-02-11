import { NotFoundError } from '@prisma/client/runtime';
import { NextFunction, Request, Response } from 'express';
import { FileService, IFileService } from '../services/file.service';
import { IUserService, UserService } from '../services/user.service';

export interface IUserController {
  uploadPicture(req: Request, res: Response, next: NextFunction): Promise<void>;
  fetchUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  fetchFeatuedUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
  fetchUserStats(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class UserController implements IUserController {
  constructor(private fileService: IFileService = new FileService(), private userService: IUserService = new UserService()) {}
  public uploadPicture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const picUrl = await this.fileService.uploadFile(req.file as Express.Multer.File);
      const user = await this.userService.updateUser(req.user.id, { profilePicture: picUrl });
      res.status(200).json({ username: user.username, email: user.email, profilePicture: user.profilePicture });
    } catch (err) {
      next(err);
    }
  };

  public fetchUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { user } = req;

    if (!user) {
      throw NotFoundError;
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      followers: user.followers,
      following: user.following,
    });
  };

  public fetchFeatuedUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const featuredUsers = await this.userService.getFeaturedUsers();
    res.status(200).json(featuredUsers);
  };

  public fetchUserStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.params.userId;
    try {
      const data = await this.userService.getUserStats(parseInt(userId as unknown as string));
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
}
