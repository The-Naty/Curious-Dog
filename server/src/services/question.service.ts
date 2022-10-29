import { Question, User } from '@prisma/client';
import { prisma } from '../database';

export interface IQuestionService {
  createQuestion(questionData: { body: string; isAnonymous: boolean; receiverId: number; askerId: number }): Promise<Question>;
}

export class QuestionService implements IQuestionService {
  public async createQuestion(questionData: { body: string; isAnonymous: boolean; receiverId: number; askerId: number }): Promise<Question> {
    const { body, isAnonymous, receiverId, askerId } = questionData;

    return await prisma.question.create({
      data: {
        body,
        isAnonymous,
        askerId,
        receiverId,
      } as Question,
    });
  }
}
