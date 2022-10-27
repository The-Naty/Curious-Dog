import { Question, User } from '@prisma/client';
import { prisma } from '../database';

export interface IQuestionService {
  createQuestion(questionData: { body: string; isAnonymous: boolean; receiverUsername: string }): Promise<void>;
}

export class QuestionService implements IQuestionService {
  public async createQuestion(questionData: { body: string; isAnonymous: boolean; receiverUsername: string }): Promise<void> {
    const { body, isAnonymous, receiverUsername } = questionData;

    const receiverId = await this.getUserIdByUsername(receiverUsername);
    try {
      const newQuestion = await prisma.question.create({
        data: {
          body,
          isAnonymous,
          receiverId,
        } as Question,
      });
    } catch (err) {
      console.error('catch block', err);
    }
  }

  private getUserIdByUsername = async (userName: string): Promise<number> => {
    const user = await prisma.user.findUniqueOrThrow({ where: { username: userName } });
    return user.id;
  };
}
