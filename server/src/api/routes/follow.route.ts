import { Router } from 'express';
import { FollowController } from '../../controllers/follow.controller';
import { IFollowController } from '../../controllers/follow.controller';
import { Route } from '../../common/interfaces/routes.interface';
import { auth } from '../../middleware/authenticate-token.middleware';
import { validate } from '../../middleware/request-validator.middleware';
import { followUserReqSchema, unfollowUserReqSchema } from '../../validations/follow.validation.schema';

export class FollowRoute implements Route {
  public router = Router();

  constructor(private followController: IFollowController = new FollowController()) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`/users/:toBeFollowedId/follow`, auth, validate(followUserReqSchema), this.followController.followUser);
    this.router.delete(`/users/:toBeUnfollowedId/follows`, auth, validate(unfollowUserReqSchema), this.followController.unfollowUser);
    this.router.get('/users/following', auth, this.followController.fetchFollowing);
    this.router.get('/users/followers', auth, this.followController.fetchFollowers);
  }
}
