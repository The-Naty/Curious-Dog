import { NextFunction, Request, Response } from 'express';
import { QuestionService, IQuestionService } from '../services/question.service';

export interface IQuestionController {
  createQuestion(req: Request, res: Response, next: NextFunction): Promise<void>;
  answerQuestion(req: Request, res: Response, next: NextFunction): Promise<void>;
  fetchAllQuestions(req: Request, res: Response, next: NextFunction): Promise<void>;
  fetchCurrentUserQuestions(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class QuestionController implements IQuestionController {
  constructor(private questionService: IQuestionService = new QuestionService()) {}

  public createQuestion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { body, isAnonymous } = req.body;
    const receiverId = parseInt(req.params.userId);
    const askerId = req.user.id;
    try {
      const question = await this.questionService.createQuestion({ body, isAnonymous, receiverId, askerId });
      res.status(201).send(question);
    } catch (err) {
      next(err);
    }
  };

  public answerQuestion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { answer } = req.body;
    const questionId = parseInt(req.params.questionId);
    const receiverId = req.user.id;

    try {
      const question = await this.questionService.answerQuestion({ answer, questionId, receiverId });
      res.status(200).send(question);
    } catch (err) {
      next(err);
    }
  };

  public fetchAllQuestions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const limit = parseInt(req.query.limit as unknown as string);
    const page = parseInt(req.query.PageParams as unknown as string);

    try {
      const questions = await this.questionService.getQuestions(limit, page);
      res.status(200).send(questions);
    } catch (err) {
      next(err);
    }
  };

  public fetchCurrentUserQuestions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const receiverId = req.user.id;
    const asked = req.query.asked as unknown as string;
    const recived = req.query.recived as unknown as string;
    const page = parseInt(req.query.PageParams as unknown as string);
    const limit = parseInt(req.query.limit as unknown as string);
    const followingRecived = req.query.followingRecived as unknown as string;
    const followingAsked = req.query.followingAsked as unknown as string;

    try {
      const questions = await this.questionService.getCurrentUserQuestions({
        receiverId,
        asked,
        recived,
        limit,
        page,
        followingAsked,
        followingRecived,
      });
      res.status(200).send(questions);
    } catch (err) {
      next(err);
    }
  };
}
