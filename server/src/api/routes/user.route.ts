import { Router } from 'express';
import { Route } from '../../common/interfaces/routes.interface';
import { validate } from '../../middleware/request-validator.middleware';
import { auth } from '../../middleware/authenticate-token.middleware';
import { uploadProfilePictureReqSchema } from '../../validations/user.validation.schema';
import { upload } from '../../middleware/upload-file.middleware';
import { IUserController, UserController } from '../../controllers/user.controller';

class UserRoute implements Route {
  public path = '/user';
  public router = Router();

  constructor(private userController: IUserController = new UserController()) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/uploadProfilePicture`,
      auth,
      validate(uploadProfilePictureReqSchema),
      upload.single('profilePicture'),
      this.userController.uploadPicture,
    );
  }
}

export { UserRoute };
