import { Router } from "express";
import { AuthController } from "../../controllers/auth.controller";
import { Route } from "../../common/interfaces/routes.interface";
import { IAuthController } from "../../controllers/auth.controller";
import { validate } from "../../middleware/requestValidator";
import * as userValidator from "../../validations/userValidator";

class AuthRoute implements Route {
  public path = "/auth";
  public router = Router();

  constructor(private authController: IAuthController = new AuthController()) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validate(userValidator.createUserValidator),
      this.authController.register
    );
  }
}

export { AuthRoute };
