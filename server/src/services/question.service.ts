import { Question, User } from '@prisma/client';
import { prisma } from '../database';
import { UnauthorizedError } from '../common/errors';

export interface IQuestionService {
  createQuestion(questionData: { body: string; isAnonymous: boolean; receiverId: number; askerId: number }): Promise<Question>;
  answerQuestion(questionData: { answer: string; questionId: number; receiverId: number }): Promise<Question>;
  getQuestions(limit: number, page: number): Promise<{}>;
  gethCurrentUserQuestions(receiverId: number, asked: string): Promise<Partial<Question>[]>;
}

export class QuestionService implements IQuestionService {
  public async createQuestion(questionData: { body: string; isAnonymous: boolean; receiverId: number; askerId: number }): Promise<Question> {
    const { body, isAnonymous, receiverId, askerId } = questionData;

    return prisma.question.create({
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
      throw new UnauthorizedError('User not allowed to answer this');
    }
    return prisma.question.update({
      where: {
        id: questionId,
      },
      data: {
        answer,
      } as Question,
    });
  }

  public async getQuestions(limit: number, page: number): Promise<{}> {
    let offset = limit * (page - 1);
    let totalQuestions = await prisma.question.count();
    const questions = await prisma.question.findMany({ take: limit, skip: offset });

    return { limit, page, totalQuestions, questions: questions.map(this.toDomain) };
  }

  public async gethCurrentUserQuestions(receiverId: number, asked: string): Promise<Partial<Question>[]> {
    let questions;
    if (asked === 'true') {
      questions = await prisma.question.findMany({ where: { OR: [{ receiverId }, { askerId: receiverId }] } });
    } else {
      questions = await prisma.question.findMany({ where: { receiverId: receiverId } });
    }

    return questions.map(this.toDomain);
  }

  private toDomain(question: Question): Question {
    return question.isAnonymous ? { ...question, askerId: null } : question;
  }
}
