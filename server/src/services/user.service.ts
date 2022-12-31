import { User } from '@prisma/client';
import { prisma } from '../database';

export interface IUserService {
  updateUser(user: User, updatedData: Partial<User>): Promise<User>;
  getUser(userId: number): Promise<User | null>;
}

export class UserService implements IUserService {
  public async updateUser(user: User, updatedData: Partial<User>): Promise<User> {
    return prisma.user.update({ where: { id: user.id }, data: { ...updatedData } });
  }

  public async getUser(userId: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id: userId } });
  }
}
