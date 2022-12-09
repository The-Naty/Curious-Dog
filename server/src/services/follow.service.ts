import { Follows, User } from '@prisma/client';
import { prisma } from '../database';

export interface IFollowService {
  follow(followerId: number, followingId: number): Promise<Follows>;
  unfollow(followerId: number, followingId: number): Promise<Follows>;
  getFollowers(userId: number, limit: number, page: number): Promise<{ count: Number; followed_by: Follows[] }>;
  getFollowing(userId: number, limit: number, page: number): Promise<{ count: Number; following: Follows[] }>;
}

export class FollowService implements IFollowService {
  public follow(followerId: number, followingId: number): Promise<Follows> {
    return prisma.follows.create({
      data: {
        followerId,
        followingId,
      },
    });
  }

  public unfollow(followerId: number, followingId: number): Promise<Follows> {
    return prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
  }

  public getFollowers = async (userId: number, limit: number, page: number): Promise<{ count: Number; followed_by: Follows[] }> => {
    const offset = limit * (page - 1);
    const [count, followed_by] = await Promise.all([
      prisma.follows.count({ where: { followingId: userId } }),
      prisma.follows.findMany({ take: limit, skip: offset, where: { followingId: userId }, include: { follower: true } }),
    ]);

    return { count, followed_by };
  };

  public getFollowing = async (userId: number, limit: number, page: number): Promise<{ count: Number; following: Follows[] }> => {
    const offset = limit * (page - 1);
    const [count, following] = await Promise.all([
      prisma.follows.count({ where: { followerId: userId } }),
      prisma.follows.findMany({ take: limit, skip: offset, where: { followerId: userId }, include: { folllowing: true } }),
    ]);

    return { count, following };
  };
}
