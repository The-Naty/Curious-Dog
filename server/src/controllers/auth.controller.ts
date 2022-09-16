import { NextFunction, Request, Response } from "express";

class AuthController {
  public authService = new AuthService();

  public signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {};
}
export default AuthController;
