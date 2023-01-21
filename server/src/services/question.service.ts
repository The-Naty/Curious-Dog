import { Question, User } from '@prisma/client';
import { UnauthorizedError } from '../common/errors';
import { prisma } from '../database';

export interface IQuestionService {
  createQuestion(questionData: { body: string; isAnonymous: boolean; receiverId: number; askerId: number }): Promise<Question>;
  answerQuestion(questionData: { answer: string; questionId: number; receiverId: number }): Promise<Question>;
  getQuestions(limit: number, page: number): Promise<{ questions: Question[]; count: number; limit: number }>;
  getCurrentUserQuestions(params: {
    receiverId: number;
    asked: string;
    limit: number;
    page: number;
    followingRecived: string;
    followingAsked: string;
  }): Promise<{
    questions: Partial<Question & { asker: { username: string; email: string; profilePicture: string | null } | null }>[];
    count: number;
    limit: number;
  }>;
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

  public async getQuestions(limit: number, page: number): Promise<{ questions: Question[]; count: number; limit: number }> {
    const offset = limit * (page - 1);
    const [count, questions] = await Promise.all([
      prisma.question.count(),
      prisma.question.findMany({
        take: limit,
        skip: offset,
        include: {
          asker: { select: { username: true, email: true, profilePicture: true } },
          receiver: { select: { username: true, email: true, profilePicture: true } },
        },
        orderBy: { updatedAt: 'desc' },
      }),
    ]);

    return { questions: questions.map(this.toDomain), count, limit };
  }

  public async getCurrentUserQuestions(params: {
    receiverId: number;
    asked: string;
    limit: number;
    page: number;
    followingRecived: string;
    followingAsked: string;
  }): Promise<{
    questions: Partial<Question & { asker: { username: string; email: string; profilePicture: string | null } | null }>[];
    count: number;
    limit: number;
  }> {
    const { limit, page, asked, receiverId, followingRecived, followingAsked } = params;
    console.log(asked, followingAsked, followingRecived);
    const offset = limit * (page - 1);

    const baseWhere = { receiverId };
    const whereAsked = asked === 'true' ? { askerId: receiverId } : {};
    const whereFollowingAsked = followingAsked === 'true' ? { asker: { following: { some: { followerId: { equals: receiverId } } } } } : {};
    const whereFollowingReceived = followingRecived === 'true' ? { receiver: { following: { some: { followerId: { equals: receiverId } } } } } : {};

    const [count, questions] = await Promise.all([
      prisma.question.count({ where: { OR: [baseWhere, whereAsked, whereFollowingAsked, whereFollowingReceived] } }),
      prisma.question.findMany({
        where: { OR: [baseWhere, whereAsked, whereFollowingAsked, whereFollowingReceived] },
        take: limit,
        skip: offset,
        include: { asker: { select: { username: true, email: true, profilePicture: true } } },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return { questions: questions.map(this.toDomain), count, limit };
  }

  private toDomain(
    question: Question & { asker: { username: string; email: string; profilePicture: string | null } | null },
  ): Question & { asker: { username: string; email: string; profilePicture: string | null } | null } {
    return question.isAnonymous ? { ...question, askerId: null, asker: null } : question;
  }
}

// followingAsked
// prisma.question.findMany({
//   where: { asker: { following: { some: { followerId: { equals: receiverId } } } } },
//   take: limit,
//   skip: offset,
//   include: { asker: { select: { username: true, email: true, profilePicture: true } } },
//   orderBy: { createdAt: 'desc' },
// }),

// followingRecived
// prisma.question.findMany({
//   where: { receiver: { following: { some: { followerId: { equals: receiverId } } } } },
//   take: limit,
//   skip: offset,
//   include: { asker: { select: { username: true, email: true, profilePicture: true } } },
//   orderBy: { createdAt: 'desc' },
// }),
