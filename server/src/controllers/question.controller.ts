import { NextFunction, Request, Response } from 'express';
import { QuestionService, IQuestionService } from '../services/question.service';
export interface IQuestionController {
  createQuestion(req: Request, res: Response, next: NextFunction): void;
}

export class QuestionController implements IQuestionController {
  constructor(private questionService: IQuestionService = new QuestionService()) {}

  public createQuestion = (req: Request, res: Response, next: NextFunction): void => {
    const { body, isAnonymous, receiverUsername } = req.body;
    try {
      this.questionService.createQuestion({ body, isAnonymous, receiverUsername });
      res.status(201).send('Question Submitted');
    } catch (err) {
      next(err);
    }
  };
}
