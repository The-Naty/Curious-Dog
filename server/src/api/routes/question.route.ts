import { Router } from 'express';
import { QuestionController } from '../../controllers/question.controller';
import { IQuestionController } from '../../controllers/question.controller';
import { Route } from '../../common/interfaces/routes.interface';

export class QuestionRoute implements Route {
  public path = '/question';
  public router = Router();

  constructor(private questionController: IQuestionController = new QuestionController()) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, this.questionController.createQuestion);
  }
}
