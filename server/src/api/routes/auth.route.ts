import { Router } from "express";
import AuthController from "../../controllers/auth.controller";
import Route from "../../common/interfaces/routes.interface";

class AuthRoute implements Route {
  public path = "/auth";
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/signup`, this.authController.signUp);
  }
}

export default AuthRoute;
