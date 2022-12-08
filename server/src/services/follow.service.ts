import { Follows } from '@prisma/client';
import { prisma } from '../database';

export interface IFollowService {
  follow(followerId: number, followingId: number): Promise<Follows>;
  unfollow(followerId: number, followingId: number): Promise<Follows>;
  getFollowers(userId: number): Promise<Follows[]>;
  getFollowing(userId: number): Promise<Follows[]>;
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

  public getFollowers = async (userId: number): Promise<Follows[]> => {
    return prisma.follows.findMany({ where: { followingId: userId } });
  };

  public getFollowing = async (userId: number): Promise<Follows[]> => {
    return prisma.follows.findMany({ where: { followerId: userId } });
  };
}
