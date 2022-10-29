import { NextFunction, Request, Response } from 'express';
import { QuestionService, IQuestionService } from '../services/question.service';

export interface IQuestionController {
  createQuestion(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class QuestionController implements IQuestionController {
  constructor(private questionService: IQuestionService = new QuestionService()) {}

  public createQuestion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { body, isAnonymous } = req.body;
    const receiverIdString = req.params.userId;
    const askerId = req.user.id;
    try {
      const questionBody = await this.questionService.createQuestion({ body, isAnonymous, receiverIdString, askerId });
      res.status(201).send(questionBody);
    } catch (err) {
      next(err);
    }
  };
}
