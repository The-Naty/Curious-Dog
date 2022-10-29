import { Question, User } from '@prisma/client';
import { prisma } from '../database';

export interface IQuestionService {
  createQuestion(questionData: { body: string; isAnonymous: boolean; receiverIdString: string; askerId: number }): Promise<void>;
}

export class QuestionService implements IQuestionService {
  public async createQuestion(questionData: { body: string; isAnonymous: boolean; receiverIdString: string; askerId: number }): Promise<void> {
    const { body, isAnonymous, receiverIdString, askerId } = questionData;
    const receiverId = parseInt(receiverIdString);

    await prisma.question.create({
      data: {
        body,
        isAnonymous,
        askerId,
        receiverId,
      } as Question,
    });
  }
}
