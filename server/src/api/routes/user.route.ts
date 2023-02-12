import { Router } from 'express';
import { Route } from '../../common/interfaces/routes.interface';
import { IUserController, UserController } from '../../controllers/user.controller';
import { auth } from '../../middleware/authenticate-token.middleware';
import { upload } from '../../middleware/upload-file.middleware';
import { IQuestionController, QuestionController } from '../../controllers/question.controller';

class UserRoute implements Route {
  public path = '/users';
  public router = Router();

  constructor(private userController: IUserController = new UserController(), private questionController: IQuestionController = new QuestionController()) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.put(`${this.path}/profile-picture`, auth, upload.single('profilePicture'), this.userController.uploadPicture);
    this.router.get('/user', auth, this.userController.fetchUser);
    this.router.get(`/user/:userId/stats`, auth, this.userController.fetchUserStats);
    this.router.get(`/user/questions`, auth, this.questionController.fetchCurrentUserQuestions);
    this.router.get(`${this.path}/featured`, auth, this.userController.fetchFeatuedUsers);
  }
}

export { UserRoute };
