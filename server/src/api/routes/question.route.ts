import { Router } from 'express';
import { QuestionController } from '../../controllers/question.controller';
import { IQuestionController } from '../../controllers/question.controller';
import { Route } from '../../common/interfaces/routes.interface';
import { auth } from '../../middleware/authenticate-token.middleware';
import { validate } from '../../middleware/request-validator.middleware';
import { createQuestionReqSchema } from '../../validations/question.validation.schema';

export class QuestionRoute implements Route {
  public path = '/question';
  public router = Router();

  constructor(private questionController: IQuestionController = new QuestionController()) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, auth, validate(createQuestionReqSchema), this.questionController.createQuestion);
  }
}
