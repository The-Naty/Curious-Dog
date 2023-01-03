import { Question, User } from '@prisma/client';
import { prisma } from '../database';
import { UnauthorizedError } from '../common/errors';

export interface IQuestionService {
  createQuestion(questionData: { body: string; isAnonymous: boolean; receiverId: number; askerId: number }): Promise<Question>;
  answerQuestion(questionData: { answer: string; questionId: number; receiverId: number }): Promise<Question>;
  getQuestions(limit: number, page: number): Promise<{ questions: Question[]; count: number }>;
  getCurrentUserQuestions(params: {
    receiverId: number;
    asked: string;
    limit: number;
    page: number;
  }): Promise<{ questions: Partial<Question>[]; count: number }>;
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

  public async getQuestions(limit: number, page: number): Promise<{ questions: Question[]; count: number }> {
    const offset = limit * (page - 1);
    const [count, questions] = await Promise.all([prisma.question.count(), prisma.question.findMany({ take: limit, skip: offset })]);

    return { questions: questions.map(this.toDomain), count };
  }

  public async getCurrentUserQuestions(params: {
    receiverId: number;
    asked: string;
    limit: number;
    page: number;
  }): Promise<{ questions: Partial<Question>[]; count: number }> {
    const { limit, page, asked, receiverId } = params;
    const offset = limit * (page - 1);
    let questions;
    let count;
    if (asked === 'true') {
      [count, questions] = await Promise.all([
        prisma.question.count({ where: { OR: [{ receiverId }, { askerId: receiverId }] } }),
        prisma.question.findMany({ where: { OR: [{ receiverId }, { askerId: receiverId }] }, take: limit, skip: offset }),
      ]);
    } else {
      [count, questions] = await Promise.all([
        prisma.question.count({ where: { receiverId: receiverId } }),
        prisma.question.findMany({ where: { receiverId: receiverId }, take: limit, skip: offset }),
      ]);
    }

    return { questions: questions.map(this.toDomain), count };
  }

  private toDomain(question: Question): Question {
    return question.isAnonymous ? { ...question, askerId: null } : question;
  }
}
