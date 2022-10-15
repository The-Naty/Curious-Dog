import { NextFunction, Request, Response } from 'express';
import { AuthService, IAuthService } from '../services/auth.service';
import { UniqueConstraintViolation } from '../common/errors';
export interface IAuthController {
  register(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class AuthController implements IAuthController {
  constructor(private authService: IAuthService = new AuthService()) {}

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password, email } = req.body;
    try {
      const token = await this.authService.registerUserAndSignToken({
        username: username,
        password: password,
        email: email,
      });
      res.status(201).cookie('auth', token, { httpOnly: true }).send(`${username} is successfully registered`);
    } catch (err: any | unknown) {
      if (err?.code === 'P2002') {
        next(new UniqueConstraintViolation(`${err.meta['target']} already registered`));
      } else {
        next(err);
      }
    }
  };
}
