import { Question, User } from '@prisma/client';
import { prisma } from '../database';

export interface IQuestionService {
  createQuestion(questionData: { body: string; isAnonymous: boolean; receiverIdString: string; askerId: number }): Promise<string>;
}

export class QuestionService implements IQuestionService {
  public async createQuestion(questionData: { body: string; isAnonymous: boolean; receiverIdString: string; askerId: number }): Promise<string> {
    const { body, isAnonymous, receiverIdString, askerId } = questionData;
    const receiverId = parseInt(receiverIdString);

    const newQuestion = await prisma.question.create({
      data: {
        body,
        isAnonymous,
        askerId,
        receiverId,
      } as Question,
    });

    return newQuestion.body;
  }
}
