import { NextFunction, Request, Response } from 'express';
import { QuestionService, IQuestionService } from '../services/question.service';
export interface IQuestionController {
  createQuestion(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class QuestionController implements IQuestionController {
  constructor(private questionService: IQuestionService = new QuestionService()) {}

  public createQuestion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { body, isAnonymous, receiverUsername } = req.body;
    const askerId = req.user.id;
    try {
      await this.questionService.createQuestion({ body, isAnonymous, receiverUsername, askerId });
      res.status(201).send('Question Submitted');
    } catch (err) {
      next(err);
    }
  };
}
