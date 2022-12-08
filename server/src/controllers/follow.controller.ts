import { NextFunction, Request, Response } from 'express';
import { FollowService, IFollowService } from '../services/follow.service';

export interface IFollowController {
  followNewUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  unfollowUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  fetchFollowers(req: Request, res: Response, next: NextFunction): Promise<void>;
  fetchFollowing(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class FollowController implements IFollowController {
  constructor(private followService: IFollowService = new FollowService()) {}

  public followNewUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const toBeFollowedId = parseInt(req.params.toBeFollowedId);
    const followerId = req.user.id;
    try {
      const newFollowing = await this.followService.follow(followerId, toBeFollowedId);
      res.status(201).send(newFollowing);
    } catch (err) {
      next(err);
    }
  };
  public unfollowUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const toBeUnfollowedId = parseInt(req.params.toBeUnfollowedId);
    const followerId = req.user.id;
    try {
      await this.followService.unfollow(followerId, toBeUnfollowedId);
      res.status(204);
    } catch (err) {
      next(err);
    }
  };

  public fetchFollowers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.user.id;
    try {
      const followers = await this.followService.getFollowers(userId);
      res.status(200).send(followers);
    } catch (err) {
      next(err);
    }
  };

  public fetchFollowing = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.user.id;
    try {
      const following = await this.followService.getFollowing(userId);
      res.status(200).send(following);
    } catch (err) {
      next(err);
    }
  };
}
