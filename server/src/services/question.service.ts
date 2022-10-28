import { Question, User } from '@prisma/client';
import { prisma } from '../database';

export interface IQuestionService {
  createQuestion(questionData: { body: string; isAnonymous: boolean; receiverUsername: string; askerId: number }): Promise<void>;
}

export class QuestionService implements IQuestionService {
  public async createQuestion(questionData: { body: string; isAnonymous: boolean; receiverUsername: string; askerId: number }): Promise<void> {
    const { body, isAnonymous, receiverUsername, askerId } = questionData;

    const receiverId = await this.getUserIdByUsername(receiverUsername);
    const newQuestion = await prisma.question.create({
      data: {
        body,
        isAnonymous,
        askerId,
        receiverId,
      } as Question,
    });
  }

  private getUserIdByUsername = async (userName: string): Promise<number> => {
    const user = await prisma.user.findUniqueOrThrow({ where: { username: userName } });
    return user.id;
  };
}
