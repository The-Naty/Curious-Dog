import { NextFunction, Request, Response } from "express";
import AuthService from "../services/auth.service";
import { User } from '@prisma/client';

class AuthController {
  public authService = new AuthService();

  public  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any> => {
    const {username, password, email} = req.body
    return this.authService.registerUser({username: username, password: password, email: email});
  }
}
export default AuthController;
