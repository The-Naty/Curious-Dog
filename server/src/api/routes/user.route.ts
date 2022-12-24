import { Router } from 'express';
import { Route } from '../../common/interfaces/routes.interface';
import { IUserController, UserController } from '../../controllers/user.controller';
import { auth } from '../../middleware/authenticate-token.middleware';
import { upload } from '../../middleware/upload-file.middleware';

class UserRoute implements Route {
  public path = '/user';
  public router = Router();

  constructor(private userController: IUserController = new UserController()) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.put(`${this.path}/profile-picture`, auth, upload.single('profilePicture'), this.userController.uploadPicture);
    this.router.get(`${this.path}/:userId`, this.userController.fetchUser);
  }
}

export { UserRoute };
