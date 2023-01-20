import { User } from '@prisma/client';
import { prisma } from '../database';

export interface IUserService {
  updateUser(user: User, updatedData: Partial<User>): Promise<User>;
  getUser(userId: number): Promise<User | null>;
  getFeaturedUsers(): Promise<Partial<User>[]>;
}

export class UserService implements IUserService {
  public async updateUser(user: User, updatedData: Partial<User>): Promise<User> {
    return prisma.user.update({ where: { id: user.id }, data: { ...updatedData } });
  }

  public async getUser(userId: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id: userId } });
  }

  public async getFeaturedUsers(): Promise<Partial<User>[]> {
    return prisma.user.findMany({
      select: { username: true, email: true, profilePicture: true, _count: { select: { receivedQuestions: true } } },
      orderBy: { receivedQuestions: { _count: 'desc' } },
      take: 8,
    });
  }
}
