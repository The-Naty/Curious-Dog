import { Question, User } from '@prisma/client';
import { prisma } from '../database';
import { InvalidCredentialsError } from '../common/errors';

export interface IQuestionService {
  createQuestion(questionData: { body: string; isAnonymous: boolean; receiverId: number; askerId: number }): Promise<Question>;
  answerQuestion(questionData: { answer: string; questionId: number; receiverId: number }): Promise<Question>;
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

  public async answerQuestion(answerData: { answer: string; questionId: number; receiverId: number }): Promise<Question> {
    const { answer, questionId, receiverId } = answerData;

    const question = await prisma.question.findUniqueOrThrow({ where: { id: questionId } });
    if (question.receiverId !== receiverId) {
      throw new InvalidCredentialsError('User not allowed to answer this');
    }
    return await prisma.question.update({
      where: {
        id: questionId,
      },
      data: {
        answer,
      } as Question,
    });
  }
}
