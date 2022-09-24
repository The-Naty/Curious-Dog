import { Router } from 'express';
import { IndexController } from '../../controllers/index.controller';
import { IIndexController } from '../../controllers/index.controller';
import { Route } from '../../common/interfaces/routes.interface';

export class IndexRoute implements Route {
  public path = '/';
  public router = Router();

  constructor(private indexController: IIndexController = new IndexController()) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
  }
}
